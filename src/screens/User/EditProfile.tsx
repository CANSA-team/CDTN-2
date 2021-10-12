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

let user_temp = {
    "id": 1,
    "phone": "0968241064",
    "name": "anh",
    "birthday": "1999-09-28T17:00:00.000Z"
}

export default function EditProfile(props: any) {
    const { navigate } = useNavigation();
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    const userProdfile = getParam('userProfile');
    const avatar = getParam('avatar');
    const [date, setDate] = useState(new Date(userProdfile.birthday));
    const [show, setShow] = useState(false);
    const [name, setName] = useState(userProdfile.name);
    const [nickName, setNickName] = useState(userProdfile.user_name);
    const [phone, setPhone] = useState(userProdfile.phone);
    const [image, setImage] = useState(avatar);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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

    // const setUser = () => {
    //     user_temp = {
    //         "id": 1,
    //         "phone": phone,
    //         "name": name,
    //         "birthday": moment.utc(date).format('YYYY-MM-DD'),
    //     };

    // }
    let getImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
console.log(userProdfile.user_avatar);

    const save = () => {
        // console.log(date, name, phone)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        };
        var data = new FormData();
        data.append('file',
            {
                uri: image,
                name: 'userProfile.jpg',
                type: 'image/jpg'
            });

        axios.post(`${cansa[0]}/api/image/update/${userProdfile.user_avatar}/e4611a028c71342a5b083d2cbf59c494`, data, config).then((resp) => {
            const avatar_user = resp.data.data.image_id;
            const link = `/api/user/update/profile/${name}/${phone}/${moment.utc(date).format('YYYY-MM-DD')}`;
            axios.get(`${cansa[1]}${link}`).then((res) => {
                const link = `/api/user/update/user/${userProdfile.user_key}/${nickName}/${avatar_user}/${userProdfile.user_status}`;
                console.log(link);
                axios.get(`${cansa[1]}${link}`).then((res) => {
                    console.log(res.data.status);
                    Alert.alert(
                        "Thông báo!",
                        res.data.message,
                        [
                            { text: "OK" }
                        ]
                    );
                })
                console.log(res.data.message);
            })
        })
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
                            uri: image,
                        }}
                        onPress={getImg}
                    >
                        <Accessory></Accessory>
                    </Avatar>
                </View>

                <View style={styles.viewTxt}>
                    <Input
                        value={name}
                        label="Họ và Tên"
                        onChangeText={setName}
                    />

                    <Input
                        value={nickName}
                        label="Nick Name"
                        onChangeText={setNickName}
                    />

                    <Input
                        value={phone}
                        keyboardType='numeric'
                        label="Số điện thoại"
                        onChangeText={setPhone}
                    />
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtTitle}>User birthday: {moment.utc(date).format('DD/MM/YYYY')}</Text>
                        <Button onPress={showDatepicker} title={
                            <FontAwesomeIcon icon={faCalendarAlt} />
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
                    <TouchableOpacity onPress={() => {
                        save();
                    }}>
                        <Text style={styles.btnBuy}>Lưu</Text>
                    </TouchableOpacity>
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
        margin: 15,
        marginHorizontal: 10
    },
    txtTitle: {
        fontSize: 20,
        color: '#111'
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