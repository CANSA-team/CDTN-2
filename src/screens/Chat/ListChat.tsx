import React, { useState, useEffect } from 'react'
import { Text, FlatList, TouchableOpacity, View, StyleSheet, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { useNavigation } from '../../utils/useNavigation';
import HeaderTitle from '../../components/HeaderTitle';
import axios from 'axios';
import io from "socket.io-client";
import { Avatar, Badge, withBadge, Icon } from 'react-native-elements';
import { chatSever } from '../../consts/Selector'
import { State, UserModel, UserStage, ChatStage } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { chat } from '../../redux/actions/chatActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function Chat(props: any) {
    const { navigation } = props;
    const [dataAll, setDataAll] = useState<any[]>([])
    const { navigate } = useNavigation();
    const socket = io(chatSever);
    const [isLoadingChat, setIsLoadingChat]: any = useState(true)
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { userInfor }: { check: boolean, userInfor: UserModel, status: string } = userState;
    const chatState: ChatStage = useSelector((state: State) => state.chatReducer);
    const { isChat }: { isChat?: boolean } = chatState;
    const myID = 'user_' + userInfor.user_id;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isChat) {
            socket.emit('roomList', myID)
            socket.on("roomList", async function (data) {
                let tempData: any = [];
                if (data.length !== 1) {
                    await Promise.all(data.map(async (element: any) => {
                        socket.emit('onlineStatus', element[0].user_to)
                        let id = '_' + Math.random().toString(36).substr(2, 16)
                        let id_shop = (myID != element[0].user_to) ? element[0].user_to : element[0].user_from
                        let a = await axios.get(`https://103.207.38.200/api/shop/info/${id_shop.split('shop_')[1]}/1/e4611a028c71342a5b083d2cbf59c494`)
                        tempData.push({
                            id: id,
                            title: a.data.data.shop_name,
                            img: a.data.data.shop_avatar,
                            id_user: (myID != element[0].user_to) ? element[0].user_to : element[0].user_from,
                            newStatusMess: (element[0].isWatched == 1) ? false : true,
                            statusOnline: false,
                            CreateDate: element[0].CreateDate,
                            text: element[0].message,
                        })
                    }));
                } else {
                    socket.emit('onlineStatus', data[0].user_to)
                    tempData.push({
                        id: '_' + Math.random().toString(36).substr(2, 16),
                        title: 'hoanganh22k',
                        id_user: (myID != data[0].user_to) ? data[0].user_to : data[0].user_from,
                        newStatusMess: (data[0].isWatched == 1) ? false : true,
                        statusOnline: false,
                        CreateDate: data[0].CreateDate,
                        text: data[0].message,
                    })
                }

                let temp = tempData.sort((a: any, b: any) => new Date(b.CreateDate).getTime() - new Date(a.CreateDate).getTime())
                setDataAll(temp)
            });
            dispatch(chat(false))


        }
    }, [isChat])


    useEffect(() => {

        let temp: any = []
        socket.on("thread", function (data) {
            if (data.user_to == myID) {
                socket.emit('roomList', myID)
            }
        });

        socket.emit('roomList', myID)
        socket.on("roomList", async function (data) {
            let tempData: any = [];
            if (data.length !== 1) {
                await Promise.all(data.map(async (element: any) => {
                    socket.emit('onlineStatus', element[0].user_to)
                    let id = '_' + Math.random().toString(36).substr(2, 16)
                    let id_shop = (myID != element[0].user_to) ? element[0].user_to : element[0].user_from
                    let a = await axios.get(`https://103.207.38.200/api/shop/info/${id_shop.split('shop_')[1]}/1/e4611a028c71342a5b083d2cbf59c494`)
                    tempData.push({
                        id: id,
                        title: a.data.data.shop_name,
                        img: a.data.data.shop_avatar,
                        id_user: (myID != element[0].user_to) ? element[0].user_to : element[0].user_from,
                        newStatusMess: (element[0].isWatched == 1) ? false : true,
                        statusOnline: false,
                        CreateDate: element[0].CreateDate,
                        text: element[0].message,
                    })
                }));
            } else {
                socket.emit('onlineStatus', data[0].user_to)
                let id_shop = (myID != data[0].user_to) ? data[0].user_to : data[0].user_from
                let a = await axios.get(`https://103.207.38.200/api/shop/info/${id_shop.split('shop_')[1]}/1/e4611a028c71342a5b083d2cbf59c494`)
                tempData.push({
                    id: '_' + Math.random().toString(36).substr(2, 16),
                    title: a.data.data.shop_name,
                    img: a.data.data.shop_avatar,
                    id_user: (myID != data[0].user_to) ? data[0].user_to : data[0].user_from,
                    newStatusMess: (data[0].isWatched == 1) ? false : true,
                    statusOnline: false,
                    CreateDate: data[0].CreateDate,
                    text: data[0].message,
                })
            }

            let temp = tempData.sort((a: any, b: any) => new Date(b.CreateDate).getTime() - new Date(a.CreateDate).getTime())
            setDataAll(temp)
            setIsLoadingChat(false)
        });
    }, [])


    const onRefeshing = () => {
        setIsLoadingChat(true)
        socket.emit('roomList', myID)
        socket.on("roomList", async function (data) {
            let tempData: any = [];
            if (data.length !== 1) {
                await Promise.all(data.map(async (element: any) => {
                    socket.emit('onlineStatus', element[0].user_to)
                    let id = '_' + Math.random().toString(36).substr(2, 16)
                    let id_shop = (myID != element[0].user_to) ? element[0].user_to : element[0].user_from
                    let a = await axios.get(`https://103.207.38.200/api/shop/info/${id_shop.split('shop_')[1]}/1/e4611a028c71342a5b083d2cbf59c494`)
                    tempData.push({
                        id: id,
                        title: a.data.data.shop_name,
                        img: a.data.data.shop_avatar,
                        id_user: (myID != element[0].user_to) ? element[0].user_to : element[0].user_from,
                        newStatusMess: (element[0].isWatched == 1) ? false : true,
                        statusOnline: false,
                        CreateDate: element[0].CreateDate,
                        text: element[0].message,
                    })
                }));
            } else {
                socket.emit('onlineStatus', data[0].user_to)
                let id_shop = (myID != data[0].user_to) ? data[0].user_to : data[0].user_from
                let a = await axios.get(`https://103.207.38.200/api/shop/info/${id_shop.split('shop_')[1]}/1/e4611a028c71342a5b083d2cbf59c494`)
                tempData.push({
                    id: '_' + Math.random().toString(36).substr(2, 16),
                    title: a.data.data.shop_name,
                    img: a.data.data.shop_avatar,
                    id_user: (myID != data[0].user_to) ? data[0].user_to : data[0].user_from,
                    newStatusMess: (data[0].isWatched == 1) ? false : true,
                    statusOnline: false,
                    CreateDate: data[0].CreateDate,
                    text: data[0].message,
                })
            }

            let temp = tempData.sort((a: any, b: any) => new Date(b.CreateDate).getTime() - new Date(a.CreateDate).getTime())
            setDataAll(temp)
            setIsLoadingChat(false)
        });
    }
    const BadgedIcon = withBadge(1)(Icon)

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { navigate('Chat', { id_user: item.id_user, user_name: item.title }) }}>
                <View style={styles.row}>
                    <Avatar
                        rounded
                        source={{
                            uri: item.img,
                        }}
                        size="large"
                    />
                    {item.statusOnline ? (<Badge
                        status="success"
                        value={' '}
                        containerStyle={{ position: 'absolute', top: 57, left: 55, zIndex: 999, }}
                    />) : (<View></View>)}

                    <View style={{
                        flexDirection: "column",
                    }}>
                        <Text style={[styles.col, { fontSize: 15, fontWeight: item.newStatusMess ? 'bold' : 'normal' }]}>{item.title}</Text>
                        <Text style={[styles.col, { fontSize: 15, fontWeight: item.newStatusMess ? 'bold' : 'normal' }]}>{item.text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <HeaderTitle title={'Li??n h???'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>
            {
                dataAll.length ?
                <FlatList
                    data={dataAll}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoadingChat}
                            onRefresh={() => { onRefeshing() }}
                        />
                    }
                />
                :
                <View></View>
            }
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
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
    tinyLogo: {
        width: 50,
        height: 50,
    },
    item: {
        paddingTop: 10,
        marginVertical: 8,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    col: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 10,
    }
});
