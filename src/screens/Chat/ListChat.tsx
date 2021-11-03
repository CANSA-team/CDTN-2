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
    const [data, setData] = useState([])


    useEffect(() => {
        let tempData = [];
        (async () => {
            await axios.get(`http://192.168.1.93:3002/api/chat/getChatList/1/`)
                .then(async res => {
                   let i = 1;
                   let temNum = Object.keys(res.data.data).length;
                    res.data.data.forEach(element => {
                        axios.get(`https://103.207.38.200:443/api/user/get/user/by/${element.user_to}`)
                            .then(res1 => {
                                tempData.push({
                                    id: '_' + Math.random().toString(36).substr(2, 16),
                                    title: res1.data.data.user_name,
                                    id_user: element.user_to,
                                    newStatusMess: false,
                                    statusOnline: true,
                                    text: 'oke',
                                })
                                i++;
                                if(temNum == i){
                                    let temp = tempData.sort(function (x, y) {
                                        return (x === y) ? 0 : x ? -1 : 1;
                                    })
                                    setData(temp)
                                }
                            })
                            .catch(error => console.log(error));
                    });
                    
                })
                .catch(error => console.log(error));
                

        })();
        
    }, [])
    const BadgedIcon = withBadge(1)(Icon)

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item}>
                <View style={styles.row}>
                    <Avatar
                        rounded
                        source={{
                            uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                        }}
                        size="large"
                    />
                    <Badge
                        status="success"
                        value={' '}
                        containerStyle={{ position: 'absolute', top: 57, left: item.statusOnline ? 55 : -9999, zIndex: 999, }}
                    />
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
                keyExtractor={(item) => item.id}
                extraData={data}
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
