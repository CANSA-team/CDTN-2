import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import COLORS from '../consts/Colors';
import { SlugStr} from './../consts/Selector';

export default function ProductOrdered() {
    return (
        <View style={styles.container}>
            <View style={{flex:1}}>
                <Image style={styles.img} source={{uri:'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg'}} />
            </View>
            <View style={styles.productContainer}>
                <View style={styles.productDetal}>
                    <Text style={styles.productName}>{SlugStr('TIIID TIIID TIIID TIIID TIIID TIIID TIIID TIIID TIIID TIIID TIIID TIIID',60)}</Text>
                </View>
                <Text style={{color:'#222',fontSize:18,fontWeight:'bold'}}>Trạng thái :</Text>
                <View style={styles.statusPending}>   
                    <Text style={styles.txtStatus}>Đang xử lí</Text>  
                </View>
            </View> 
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        padding:15,
        backgroundColor:'#fff',
        marginTop:3,
        borderRadius:10,
        marginHorizontal:10,
        marginVertical:2
    },
    img: {
        flex:1,
        borderRadius:15,
        borderColor:COLORS.primary,
        borderWidth:1
    },
    productContainer:{
        flex:2,
        flexDirection:'column',
        marginLeft:10
    },
    productDetal:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:3
    },
    productName:{
        fontSize:20,
        fontWeight:'bold',
        color: COLORS.primary
    },
    statusPending:{      
        marginTop:8,
        backgroundColor:'#42EB53',
        padding: 8,
        borderRadius:10
    },
    txtStatus:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    }
});