import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import NumericInput from 'react-native-numeric-input';
import COLORS from './../consts/Colors';
import { SlugStr } from './../consts/Selector';

export default function CartCard() {
    const[num,setNum]= useState(1);
    return (
        <View style={{flex:1,flexDirection:'row',padding:15,backgroundColor:'#fff',marginTop:3,borderRadius:10,borderBottomColor:COLORS.primary,borderBottomWidth:1}}>
            <View style={{flex:1}}>
                <Image style={{flex:1,borderRadius:15,borderColor:COLORS.primary,borderWidth:1}} source={{uri:'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg'}} />
            </View>
            <View style={{flex:2,flexDirection:'column',marginLeft:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                    <Text style={{fontSize:22,fontWeight:'bold',color:'#111'}}>{SlugStr('Title Title Title Title',22)}</Text>
                    <TouchableOpacity style={{backgroundColor:COLORS.primary,padding:5,borderRadius:8}}>
                        <MaterialIcons name="delete" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize:16,color:'#222'}}>{SlugStr('Lorem ipsum dolor sit amet consecr adipisicing elit. adipisicing elit Lorem ipsum dolor sit amet consecr adipisicing elit. adipisicing elit',62)}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>   
                    <NumericInput inputStyle={{backgroundColor:'white'}} rightButtonBackgroundColor='#fff' leftButtonBackgroundColor='#fff' initValue={num} editable={false} totalWidth={100}  totalHeight={35}  minValue={1} type='plus-minus' onChange={value => setNum(value)} />
                    <Text style={{color:'#222',fontSize:20,fontWeight:'bold'}}>200.000đ</Text>  
                </View>
            </View> 
        </View>
    )
}
