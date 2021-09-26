import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet,Image } from 'react-native';
import { useNavigation } from '../utils/useNavigation';

export default function Lauding() {
    const { navigate } = useNavigation();

    useEffect(()=>{
        setTimeout(() =>{
            navigate('homeStack')
        }, 1000)
    });

    return (
        <View style={styles.container}>
            <Image source={require('../images/loading_icon.png')} style={styles.deliveryIcon} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Waiting ...</Text>
                <Text></Text>
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
        marginTop:30,
    },
    title:{  
        fontSize: 40,
        fontWeight: '700',
        color: '#7D7D7D'
    }
});
