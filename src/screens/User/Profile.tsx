import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Accessory, Avatar, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import COLORS from '../../consts/Colors';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '../../utils/useNavigation';

let user_temp = {
    "id": 1,
    "phone": "0968241064",
    "name": "anh",
    "birthday": "1999-09-28T17:00:00.000Z"
}

export default function Profile(props:any) {
    const { navigate } = useNavigation();
   
    const {navigation,route} = props;

    const [image, setImage] = useState('https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg');  

    function changDate(dateObj: Date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "Sep", "October", "November", "December"];
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = month + '\n' + day + ',' + year;
        return output;
    }

    return (
        <View style={styles.container}>
            <View>
                <HeaderTitle title={'PROFILE'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={35} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigate('EditProfile')}>
                        <Feather name="edit" color="white" size={35}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.viewAvatar}>
                <Avatar
                    containerStyle={{marginBottom:20}}
                    rounded
                    size={200}
                    source={{
                        uri: image,
                    }} >   
                </Avatar>
            </View>  
            
            <View style={styles.viewTxt}>      
                <View style={styles.txtContainer}>
                    <Text style={styles.txtTitle}>User name: {user_temp.name}</Text>
                </View>

                <View style={styles.txtContainer}>
                    <Text style={styles.txtTitle}>User phone: {user_temp.phone}</Text>
                </View>

                <View style={styles.txtContainer}>
                    <Text style={styles.txtTitle}>User birthday: { moment.utc(user_temp.birthday).format('DD/MM/YYYY')}</Text>
                </View>

                <View style={styles.resetPassContainer}>
                    <TouchableOpacity style={styles.touchReset}>
                        <Text style={{fontSize:20,color:'#555'}}>Đổi mật khẩu</Text>
                        <MaterialIcons name="arrow-right-alt" size={35} color="#555"/>
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
    viewAvatar:{
        backgroundColor:'#fff',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:20,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginHorizontal:5
    },
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 5,
        position: 'absolute',
        top: 33,
        left: 5,
        right: 0,
        zIndex:2
    },
    viewTxt:{
        marginTop:3,
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginHorizontal:5
    },
    txtContainer:{
        flexDirection:'row',
        margin:15,
        marginHorizontal:10
    },
    txtTitle:{
        fontSize:20,
        color:'#111'
    },
    resetPassContainer:{
        borderTopColor:'#ddd',
        borderTopWidth:2,
        margin:10,
        marginHorizontal:10
    },
    touchReset:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10
    }
    
});