import React from 'react'
import { Text, TouchableOpacity,StyleSheet, Image } from 'react-native';
import COLORS from '../consts/Colors';

export default function Category(props:any) {
    
    const { item,index,catergoryIndex,onTap } = props;

    return (
        <TouchableOpacity
            style={[{flexDirection:'column',justifyContent:'center',alignItems:'center'}, catergoryIndex === index && styles.catSelected,]}
            activeOpacity={0.8}
            onPress={onTap}>
            <Image style={{height:50,width:50,borderRadius:15}} source={{uri:item.img}} />
            <Text
            style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
            ]}>
            {item.name}
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