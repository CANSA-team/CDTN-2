import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet,Image } from 'react-native';
import { useNavigation } from '../utils/useNavigation';
import COLORS from './../consts/Colors';

export default function Lauding() {
    const { navigate } = useNavigation();

    useEffect(()=>{
        setTimeout(() =>{
            navigate('homeStack')
        }, 1000)
    });

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'column'}}>
                <Text style={{fontWeight:'bold',fontSize:35}}>Welcome to .</Text>
                <Text style={{fontWeight:'bold',fontSize:50,color:COLORS.primary}}>CANSA SHOP</Text>
            </View>         
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    deliveryIcon:{
        width: 120,
        height:120,
    },
    titleContainer:{
        marginTop:20,
    },
    title:{  
        fontSize: 40,
        fontWeight: '700',
        color: '#7D7D7D'
    }
});
