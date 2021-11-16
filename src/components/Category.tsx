import React from 'react'
import { Text, TouchableOpacity,StyleSheet, Image } from 'react-native';
import COLORS from '../consts/Colors';
import { CategoryModel } from '../redux';

export default function Category(props:any) {
    const { index,catergoryIndex,onTap,type } = props;
    const item:CategoryModel = props.item;
    return (
        <TouchableOpacity
            
            style={
                type === "cat" ?
                [{flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:25}, catergoryIndex === index && styles.catSelected]
                :
                [{flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:0}, catergoryIndex === index && styles.catSelected]
            }
            activeOpacity={0.8}
            onPress={onTap}>
            <Image style={{height:50,width:50,borderRadius:15}} source={{uri:item.category_image}} />
            <Text
            style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
            ]}
            >
            {item.category_name}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    categoryText:{
        fontSize: 16,
        color: '#574a4a',
        textAlign:'center',
        maxWidth:150
    },
    categoryTextSelected: {
        color: COLORS.primary,
        paddingBottom: 5,
    },
    catSelected:{
        borderBottomWidth: 2,
        borderColor: COLORS.primary,
    }
});