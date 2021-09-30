import React from 'react'
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { SlugStr } from '../consts/Selector';
import COLORS from './../consts/Colors';

const WIDTH = Dimensions.get('window').width/2 -30 ;
export default function Product(props:any) {
    const {item,type, onTap} = props;
    let Top;
    switch (type) {
        case 'HOT':
            Top= (
                <View style={[styles.topTitle,{ backgroundColor:'#00DD00'}]}>
                    <Text style={{color:'white'}}>NEW</Text>
                </View>
            )
            break;
        case 'NEW':
            Top= (
                <View style={[styles.topTitle,{ backgroundColor:'#EB2A3E'}]}>
                    <Text style={{color:'white'}}>HOT</Text>
                </View>
            )
            break;
        default:
            Top= (
                <View style={{display:'none'}}>
                    <Text style={{color:'white'}}>NEW</Text>
                </View>
            )
        break;
    }

    return (
        <View style={styles.container}>
            {Top}
            <TouchableOpacity onPress={onTap}>   
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{uri: item.img}} />
                </View>
                <Text style={styles.txtTitle}>{SlugStr(item.name,30)}</Text>
                <View style={{ flex:1,flexDirection:'column',alignItems:'flex-start',marginTop:10}}>
                    <Text style={{textDecorationLine: 'line-through',color:'gray',fontSize:19}}>100.000đ</Text>
                    <Text style={{marginBottom:10,color:'#bd3e3e',fontSize:22}}>{item.price}đ</Text>
                </View>
                
            </TouchableOpacity>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        height: 240,
        backgroundColor:'white',
        width: WIDTH,     
        borderRadius:10,
        marginBottom:20,
        padding: 15
    },
    topTitle:{
        position:'absolute',
        top:0,
        right:0,
        zIndex:2,
        paddingLeft:8,
        paddingRight:8,
        paddingTop:5,
        paddingBottom:5,
        borderTopRightRadius:15
    },
    imgContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    img:{
        height:100,
        width:150,
        borderRadius:5
    },
    txtTitle:{
        fontWeight:'bold',
        fontSize:16,
        marginTop:10,
        color: COLORS.primary
    },
    priceContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5,
        marginBottom:5
    },
    txtPrice:{
        fontSize:19,
        fontWeight:'bold'
    },
    btnAddContainer:{
        position: 'absolute',
        height: 35,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor:COLORS.primary,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    btnAddTitle:{
        fontSize:14,
        color:'white',
        fontWeight:'bold'
    }
});