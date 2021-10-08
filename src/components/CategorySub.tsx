import React from 'react'
import { Image, Text, TouchableOpacity,StyleSheet } from 'react-native'
import { CategoryModel } from '../redux';
import COLORS from './../consts/Colors';

export default function CategorySub(props:any) {
    const item:CategoryModel = props.item;
    return (
        <TouchableOpacity
            style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}
            activeOpacity={0.8}
            >
            <Image style={{height:50,width:50,borderRadius:15}} source={{uri:item.category_image}} />
            <Text style={{color:'#222'}}> 
                {item.category_name}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    categoryText:{
        fontSize: 16,
        color: '#574a4a',
        fontWeight: 'bold',
        textAlign:'center'
    }
});