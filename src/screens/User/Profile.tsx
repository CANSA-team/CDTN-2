import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '../../utils/useNavigation';
import axios from 'axios';
import { cansa } from '../../consts/Selector';
import { State, UserModel, UserStage } from '../../redux';
import { useSelector } from 'react-redux';

export default function Profile(props: any) {
    const { navigate } = useNavigation();
    const { navigation } = props;
    const { getParam } = navigation;
    const [isLoadingChangePassword, setIsLoadingChangePassword] = useState<boolean>(true);
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { userInfor }: { userInfor: UserModel } = userState;

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <HeaderTitle title={'Thông tin'} />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <MaterialIcons name="arrow-back" size={35} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('EditProfile')}>
                            <Feather name="edit" color="white" size={35} />
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
                        }} >
                    </Avatar>
                </View>

                <View style={styles.viewTxt}>
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtTitle}>User full name: {userInfor.user_real_name}</Text>
                    </View>

                    <View style={styles.txtContainer}>
                        <Text style={styles.txtTitle}>User nick name: {userInfor.user_name}</Text>
                    </View>

                    <View style={styles.txtContainer}>
                        <Text style={styles.txtTitle}>User phone: {userInfor.user_phone}</Text>
                    </View>

                    <View style={styles.txtContainer}>
                        <Text style={styles.txtTitle}>User birthday: {moment.utc(userInfor.user_birthday).format('DD/MM/YYYY')}</Text>
                    </View>

                    <View style={styles.resetPassContainer}>
                        {
                            isLoadingChangePassword &&
                            <TouchableOpacity style={styles.touchReset}
                                onPress={() => {
                                    setIsLoadingChangePassword(false);
                                    let email = getParam('email');
                                    axios.get(`${cansa[1]}/api/user/forgot/password/${email}`).then((res) => {
                                        Alert.alert('Thông Báo', res.data.message);
                                        navigate('OTPscreen', { email: email })
                                    })
                                }}>
                                <Text style={{ fontSize: 20, color: '#555' }}>Đổi mật khẩu</Text>
                                <MaterialIcons name="arrow-right-alt" size={35} color="#555" />
                            </TouchableOpacity>
                        }

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