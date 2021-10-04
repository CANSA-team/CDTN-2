import React from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import COLORS from '../consts/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '../utils/useNavigation';
import HeaderTitle from '../components/HeaderTitle';

export default function Account() {
    const { navigate } = useNavigation();
    const onTapProfile = () => {    
        navigate('Profile')
    }
    const onTapOrdered = () => {    
        navigate('Ordered')
    }
    return (
       <SafeAreaView style={styles.container}>
            <HeaderTitle title={'ACCOUNT'} />

           <View style={styles.accountContainer}>
                <View>
                    <Image style={{width:100,height:100,borderRadius:50}} source={{uri:'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg'}} /> 
                </View>
                <View style={styles.actionAccount}>
                    <Text style={styles.nameUser}>Hoang Anh</Text>
                    <Text style={[styles.nameUser,{color:'black'}]}>Pham</Text>
                    <Text style={{fontSize:18,color:'gray'}}>hoanganh@gmail.com</Text>
                </View>
            </View>

            <View style={styles.viewNav}>
               
                <View style={styles.viewAction}>
                    <TouchableOpacity onPress={onTapProfile} style={styles.actionTouch}>
                        <Text style={styles.actionTitle}>Tài khoản của tôi</Text>
                        <SimpleLineIcons name="arrow-right" size={20} color="#333"/>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.viewAction}>
                    <TouchableOpacity onPress={onTapOrdered} style={styles.actionTouch}>
                        <Text style={styles.actionTitle}>Đơn hàng của tôi</Text>
                        <SimpleLineIcons name="arrow-right" size={20} color="#333"/>
                    </TouchableOpacity>
                </View>
               
                <View style={styles.viewAction}>
                    <TouchableOpacity style={styles.actionTouch}>
                        <Text style={{fontSize:20,color:'red'}}>Logout</Text>
                        <MaterialIcons name="exit-to-app" size={35} color='#ec2525'/>
                    </TouchableOpacity>
                </View>
                
                
            </View>
       </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#E5E5E5'
    },
    accountContainer:{
        flexDirection:'row',
        backgroundColor:'#fff',
        padding:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    actionAccount:{
        marginLeft:20,
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'flex-start'
    },
    nameUser:{
        fontSize:24,
        fontWeight:'bold'
    },
    viewAction:{
        padding:15,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    actionTouch:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    actionTitle:{
        fontSize:20,
        color:'#333'
    },
    viewNav:{
        backgroundColor:'white',
        paddingHorizontal:10,    
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