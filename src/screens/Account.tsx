import React, { useEffect } from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '../utils/useNavigation';
import HeaderTitle from '../components/HeaderTitle';
import { State, UserModel, UserStage } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin, getUserInfo, logout } from '../redux/actions/userActions';

export default function Account() {
    const { navigate } = useNavigation();
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { check, userInfor, status }: { check: boolean, userInfor: UserModel, status: string } = userState;
    const dispatch = useDispatch();

    const onTapProfile = () => {
        navigate('Profile', { email: userInfor.user_email })
    }
    const onTapOrdered = () => {
        navigate('Ordered')
    }
    useEffect(() => {
        if (status === "Faild" || status === "") {
            dispatch(checkLogin())
        }
    }, [status])

    useEffect(() => {
        if (check) {
            dispatch(getUserInfo());
        } else {
            navigate('loginStack')
        }
    }, [check])

    const btnLogout = () => {
        dispatch(logout())
    }


    return (
        <SafeAreaView style={styles.container}>
            <HeaderTitle title={'Tài khoản'} />
                <View style={styles.accountContainer}>
                    <View>
                        {
                            userInfor.user_email ? 
                            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: userInfor.user_avatar_image ? userInfor.user_avatar_image : 'https://103.207.38.200:333/api/image/photo/1764/e4611a028c71342a5b083d2cbf59c494' }} />
                            :
                            <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: userInfor.user_avatar_image }} />
                        }
                    </View>
                    <View style={styles.actionAccount}>
                        <Text style={styles.nameUser}>{userInfor.user_real_name}</Text>
                        <Text style={[styles.nameUserNickName, { color: 'black' }]}>@{userInfor.user_name}</Text>
                        <Text style={{ fontSize: 18, color: 'gray' }}>{userInfor.user_email}</Text>
                    </View>
                </View>
            <View style={styles.viewNav}>

                <View style={styles.viewAction}>
                    <TouchableOpacity onPress={onTapProfile} style={styles.actionTouch}>
                        <Text style={styles.actionTitle}>Tài khoản của tôi</Text>
                        <SimpleLineIcons name="arrow-right" size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.viewAction}>
                    <TouchableOpacity onPress={onTapOrdered} style={styles.actionTouch}>
                        <Text style={styles.actionTitle}>Đơn hàng của tôi</Text>
                        <SimpleLineIcons name="arrow-right" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewAction}>
                    <TouchableOpacity onPress={() => { navigate('ListChat') }} style={styles.actionTouch}>
                        <Text style={styles.actionTitle}>Liên hệ</Text>
                        <SimpleLineIcons name="arrow-right" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewAction}>
                    <TouchableOpacity style={styles.actionTouch}
                        onPress={() => btnLogout()}>
                        <Text style={{ fontSize: 20, color: 'red' }}>Đăng xuất</Text>
                        <MaterialIcons name="exit-to-app" size={35} color='#ec2525' />
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    container_login: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#33FF99'
    },
    accountContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    actionAccount: {
        flex: 1,
        marginLeft: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'flex-start'
    },
    nameUser: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    nameUserNickName: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    viewAction: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    actionTouch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionTitle: {
        fontSize: 20,
        color: '#333'
    },
    viewNav: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }
});