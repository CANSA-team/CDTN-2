import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet,Image } from 'react-native';
import { State, getProducts } from '../redux';
import { useNavigation } from '../utils/useNavigation';
import COLORS from '../consts/Colors';
import { connect} from 'react-redux';

interface LandingProps{
    getProducts:Function
}

export const _Landing: React.FC<LandingProps> = (props) => {
    const { navigate } = useNavigation();
    useEffect(()=>{
        props.getProducts();
        setTimeout(() =>{  
            navigate('homeStack')
        }, 1000)
    });

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'column'}}>
                <Text style={{fontWeight:'bold',fontSize:30}}>Welcome to</Text>
                <Text style={{fontWeight:'bold',fontSize:45,color:COLORS.primary}}>CANSA SHOP</Text>
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

const mapToStateProps = (state: State) => ({
})

const Landing = connect(mapToStateProps, { getProducts })(_Landing);

export default Landing;