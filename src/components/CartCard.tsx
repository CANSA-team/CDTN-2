import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import NumericInput from 'react-native-numeric-input';
import COLORS from './../consts/Colors';
import { SlugStr } from './../consts/Selector';

export default function CartCard() {
    const[number,setNumber]= useState(1);
    
    return (
        <View style={styles.container}>
            <View style={{flex:1}}>
                <Image style={styles.img} source={{uri:'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg'}} />
            </View>
            <View style={styles.productContainer}>
                <View style={styles.productDetal}>
                    <Text style={styles.productName}>{SlugStr('Title Title Title Title',22)}</Text>
                    <TouchableOpacity style={styles.iconDelete}>
                        <MaterialIcons name="delete" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize:16,color:'#222'}}>{SlugStr('Lorem ipsum dolor sit amet consecr adipisicing elit. adipisicing elit Lorem ipsum dolor sit amet consecr adipisicing elit. adipisicing elit',62)}</Text>
                <View style={styles.productPrice}>   
                    <NumericInput inputStyle={{backgroundColor:'white'}} rightButtonBackgroundColor='#fff' leftButtonBackgroundColor='#fff' initValue={number} editable={false} totalWidth={100}  totalHeight={35}  minValue={1} type='plus-minus' onChange={value => setNumber(value)} />
                    <Text style={{color:'#222',fontSize:20,fontWeight:'bold'}}>200.000đ</Text>  
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
        borderBottomColor:COLORS.primary,
        borderBottomWidth:1
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
        marginBottom:8
    },
    productName:{
        fontSize:22,
        fontWeight:'bold',
        color:'#111'
    },
    iconDelete:{
        backgroundColor:COLORS.primary,
        padding:5,
        borderRadius:8
    },
    productPrice:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:8
    }
});