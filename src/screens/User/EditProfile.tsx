import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Button, Text, Input, Avatar, Accessory } from 'react-native-elements';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '../../utils/useNavigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import HeaderTitle from '../../components/HeaderTitle';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { cansa } from '../../consts/Selector';
import { margin, marginBottom } from 'styled-system';
import COLORS from '../../consts/Colors';
import { State, UserModel, UserStage } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, updateUserProfile } from '../../redux/actions/userActions';



export default function EditProfile(props: any) {
    const { navigate } = useNavigation();
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    const userProdfile = getParam('userProfile');
    // const avatar = getParam('avatar');
    const [date, setDate] = useState(new Date(userProdfile.birthday));
    const [show, setShow] = useState(false);
    // const [name, setName] = useState(userProdfile.name);
    const [nickName, setNickName] = useState(userProdfile.user_name);
    // const [phone, setPhone] = useState(userProdfile.phone);
    // const [image, setImage] = useState(avatar);
    const [image, setimage] = useState<string>("/3.3.jpg");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { userInfor, updateUser }: { userInfor: UserModel, updateUser: number } = userState;
    const [name, setname] = useState<string>("");
    const [phone, setphone] = useState<string>("");
    const [birthday, setbirthday] = useState<Date>(new Date());
    const [avatar, setavatar] = useState<number | undefined>(undefined);
    const [checkSave, setcheckSave] = useState<boolean>(false);
    const dispatch = useDispatch();



    useEffect(() => {
    }, [])

    const onChange = (event: any, selectedDate: Date) => {
        selectedDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(selectedDate);
    };

    const showMode = (currentMode: any) => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
        setDate(date);
    };

    // let getImg = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [3, 3],
    //         quality: 1,
    //     });

    //     if (!result.cancelled) {
    //         setImage(result.uri);
    //     }
    // };
    useEffect(() => {
        if (userInfor) {
            setname(userInfor.user_real_name);
            setphone(userInfor.user_phone);
            setbirthday(userInfor.user_birthday);
            setavatar(Number(userInfor.user_avatar));
            setimage(userInfor.user_avatar_image);
        }
    }, [userInfor])

    useEffect(() => {
        console.log(updateUser)
        if (checkSave) {
            dispatch(getUserInfo());
            setcheckSave(false);
            navigate('Profile');
        }
    }, [updateUser]);

    useEffect(() => {
        if (avatar && checkSave) {
            dispatch(updateUserProfile(name, phone, birthday, avatar));
        }
    }, [avatar])

    const save = () => {

    }



    const getImage = (e: any) => {
        setFile(e.target.files[0]);
        var file = e.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e: any) {
            reader.result && setimage(reader.result.toString());
        };
    }


    
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <HeaderTitle title={'EDIT PROFILE'} />
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewAvatar}>
                    <Avatar
                        containerStyle={{ marginBottom: 20 }}
                        rounded
                        size={200}
                        source={{
                            uri: userInfor.user_avatar_image,
                        }}
                        onPress={(e: any) => getImage(e)}
                    >
                        <Accessory style={{
                            borderWidth: 2,
                            borderColor: "#444",
                            backgroundColor: COLORS.primary
                        }} size={50}></Accessory>
                    </Avatar>
                </View>

                <View style={styles.viewTxt}>
                    <Input
                        value={name}
                        label="Họ và Tên"
                        value={userInfor.user_real_name}
                        onChangeText={(e: any) => setname(e.target.value)}
                    />

                    <Input
                        value={phone}
                        keyboardType='numeric'
                        label="Số điện thoại"
                        value={userInfor.user_phone}
                        onChangeText={(e: any) => setphone(e.target.value)}
                    />
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtTitle}>Ngày sinh: {moment.utc(userInfor.user_birthday).format('DD/MM/YYYY')}</Text>
                        <Button onPress={showDatepicker}
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
                                value={date}
                                mode={'date'}
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, marginBottom: 8 }}>
                        <TouchableOpacity onPress={() => {
                            save();
                        }}>
                            <Text style={styles.btnBuy}>Lưu</Text>
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