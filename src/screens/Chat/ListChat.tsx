import React, { useState, useEffect } from 'react'
import { Text, FlatList, TouchableOpacity, View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import COLORS from '../../consts/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '../../utils/useNavigation';
import HeaderTitle from '../../components/HeaderTitle';
import axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat';
import io from "socket.io-client";
import { Avatar, Badge, withBadge, Icon } from 'react-native-elements';
import { cansa } from '../../consts/Selector'

export default function Chat(props: any) {
    const [data, setData]: any = useState([])
    const [dataStatus, setDataStatus]: any = useState([])
    const { navigate } = useNavigation();
    const socket = io("http://192.168.1.93:3002");
    const myID = 1;

    useEffect(() => {
        let temp:any = []
        socket.on("thread", function (data) {
            if (data.user_to == myID) {
                socket.emit('roomList', myID)
            }
        });
        socket.emit('roomList', myID)
        socket.on("roomList", function (data) {
            let tempData: any = [];
            data.forEach((element: any) => {
                
                socket.emit('onlineStatus', element[0].user_to)
                tempData.push({
                    id: '_' + Math.random().toString(36).substr(2, 16),
                    title: 'hoanganh22k',
                    id_user: (myID != element[0].user_to)?element[0].user_to:element[0].user_from,
                    newStatusMess: (element[0].isWatched == 1)?false:true,
                    statusOnline: false,
                    CreateDate:element[0].CreateDate,
                    text: element[0].message,
                })
            });
            let temp = tempData.sort((a:any, b:any) => new Date(b.CreateDate).getTime() - new Date(a.CreateDate).getTime())
            setData(temp)
        });
        
    }, [])

    const BadgedIcon = withBadge(1)(Icon)

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { navigate('Chat', { id_user: item.id_user }) }}>
                <View style={styles.row}>
                    <Avatar
                        rounded
                        source={{
                            uri: 'https://randomuser.me/api/portraits/men/41.jpg',
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
            <HeaderTitle title={'List Chat'} />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
            />
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
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
