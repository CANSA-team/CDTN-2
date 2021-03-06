import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { Button, Text, Input, Avatar, Accessory } from 'react-native-elements';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '../../utils/useNavigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../components/HeaderTitle';
import * as ImagePicker from 'expo-image-picker';
import { saveImage, updateImage } from '../../consts/Selector';
import COLORS from '../../consts/Colors';
import { ImageId, State, UserModel, UserStage } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, getUserInfo, updateUserProfileDefault } from '../../redux/actions/userActions';


export default function EditProfile(props: any) {
    const { navigate } = useNavigation();
    const { navigation } = props;
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { userInfor, updateUser }: { userInfor: UserModel, updateUser: number } = userState;
    const [date, setDate] = useState(new Date(userInfor.user_birthday));
    const [show, setShow] = useState(false);
    const [name, setName] = useState(userInfor.user_real_name);
    const [phone, setPhone] = useState(userInfor.user_phone);
    const [nameErr, setNameErr] = useState<boolean>(true);
    const [phoneErr, setPhoneErr] = useState<boolean>(true);
    const [image, setImage] = useState(userInfor.user_avatar_image);
    const [avatar, setavatar] = useState<number | undefined>(undefined);
    const [checkSave, setcheckSave] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onChange = (event: any, selectedDate: any) => {
        let currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(new Date(Number(currentDate) + 86400000));
    };

    useEffect(() => {
        if (userInfor) {
            setName(userInfor.user_real_name);
            setPhone(userInfor.user_phone);
            setDate(new Date(Number(new Date(userInfor.user_birthday)) + 86400000));
            setavatar(Number(userInfor.user_avatar));
            setImage(userInfor.user_avatar_image);
        }
    }, [userInfor])

    useEffect(() => {
        if (updateUser && checkSave) {
            dispatch(getUserInfo());
            setcheckSave(false);
            navigate('Profile')
        }
    }, [updateUser])

    useEffect(() => {
        if (avatar && checkSave) {
            dispatch(updateUserProfile(name, phone, date, avatar));
        }
    }, [avatar])


    let getImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const save = () => {
        if (/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone) && name && date && image) {
            if (!userInfor.user_avatar) {
                //them hinh
                let _avatar: ImageId = { id: 0 };
                const avatar_img = {
                    uri: image,
                    name: 'userProfile.jpg',
                    type: 'image/jpg'
                }
                const saveAvt: Promise<void> = saveImage(avatar_img, _avatar);

                Promise.all([saveAvt]).then(() => {
                    dispatch(updateUserProfile(name, phone, date, _avatar.id));
                    setcheckSave(true);
                })
            }
            else {
                //sua hinh
                let _avatar: ImageId = { id: Number(userInfor.user_avatar) };
                let saveAvt: Promise<void>;
                if (image !== userInfor.user_avatar_image) {
                    const avatar_img = {
                        uri: image,
                        name: 'userProfile.jpg',
                        type: 'image/jpg'
                    }
                    saveAvt = updateImage(avatar_img, Number(userInfor.user_avatar), _avatar);
                } else {
                    saveAvt = new Promise((resolve, reject) => resolve());
                }
                Promise.all([saveAvt]).then(() => {
                    dispatch(updateUserProfileDefault(false));
                    setcheckSave(true);
                    dispatch(updateUserProfile(name, phone, date, _avatar.id));
                })
            }
        }
        else {
            setNameErr(name == '' && name == null);
            setPhoneErr(/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone));
            Alert.alert('Th??ng b??o', 'C??c tr?????ng nh???p kh??ng ????ng ?????nh d???ng, y??u c???u nh???p l???i!', [
                { text: "OK" }
            ])

        }
    }

    let datePick = Number(date) - 86400000;

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <HeaderTitle title={'C???p nh???t'} />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <MaterialIcons name="arrow-back" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewAvatar}>
                    <Avatar
                        containerStyle={{ marginBottom: 20, borderWidth: 1 }}
                        rounded
                        size={200}
                        source={{
                            uri: image,
                        }}

                    >
                        <Accessory onPress={getImg}
                            style={{
                                borderWidth: 2,
                                borderColor: "#444",
                                backgroundColor: COLORS.primary
                            }} size={50}></Accessory>
                    </Avatar>
                </View>

                <View style={styles.viewTxt}>
                    <Input
                        value={name}
                        label="H??? v?? T??n"
                        onChangeText={setName}
                    />
                    {!nameErr ? <Text style={styles.statusDes}>H??? v?? t??n kh??ng ???????c ????? tr???ng</Text> : <></>}
                    <Input
                        value={phone}
                        keyboardType='numeric'
                        label="S??? ??i???n tho???i"
                        onChangeText={setPhone}
                    />
                    {!phoneErr ? <Text style={styles.statusDes}>S??? ??i???n tho???i kh??ng ???????c ????? tr???ng v?? ????ng ?????nh d???ng</Text> : <></>}
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtTitle}>Ng??y sinh: {moment.utc(date).format('DD/MM/YYYY')}</Text>
                        <Button onPress={() => setShow(true)}
                            buttonStyle={{
                                backgroundColor: COLORS.primary,
                            }}
                            title={
                                <FontAwesomeIcon color="white" size={20} icon={faCalendarAlt} />
                            } >
                        </Button>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date(datePick)}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, marginBottom: 8 }}>
                        <TouchableOpacity onPress={() => {
                            save();
                        }}>
                            <Text style={styles.btnBuy}>L??u</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    statusDes: {
        paddingBottom: 5,
        marginBottom: 3,
        marginHorizontal: 10,
        color: '#dc3545',
    },
    viewAvatar: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginHorizontal: 5
    },
    btnBuy: {
        backgroundColor: '#00FF7F',
        padding: 7,
        width: 150,
        borderRadius: 20,
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
        color: '#222'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 33,
        left: 5,
        right: 0,
        zIndex: 2
    },
    viewTxt: {
        paddingTop: 5,
        marginTop: 3,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginHorizontal: 5
    },
    txtContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    txtTitle: {
        fontSize: 20,
        color: '#111',
        marginRight: 20,
    },
    resetPassContainer: {
        borderTopColor: '#ddd',
        borderTopWidth: 2,
        margin: 10,
        marginHorizontal: 10
    },
    touchReset: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }

});