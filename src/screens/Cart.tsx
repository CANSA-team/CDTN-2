import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CartCard from '../components/CartCard';
import { Button } from 'react-native-elements';
import COLORS from '../consts/Colors';
import { SafeAreaView } from 'react-navigation';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';


export default function Cart() {
    return (
        <SafeAreaView style={styles.container}> 
            <View style={{paddingTop:35,paddingBottom:15,backgroundColor:COLORS.primary}}>             
                <Text style={styles.txtTitleTop}>CART</Text>                    
            </View>
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                <View style={{flex:1,marginBottom:10}}>
                    <CartCard />
                   
                </View>
               
                <View style={styles.bill}>
                    <Text style={styles.txtTotal}>Totals</Text>
                    <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                        <Text style={[styles.priceTitle,{fontSize:23}]}>Sub total :</Text>
                        <Text style={[styles.priceTitle,{fontSize:23}]}>200.000đ</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:'space-between',borderBottomColor:'gray',borderBottomWidth:1,paddingBottom:5}}>
                        <Text style={[styles.priceTitle,{fontSize:23}]}>Ship total :</Text>
                        <Text style={[styles.priceTitle,{fontSize:23}]}>20.000đ</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                        <Text style={[styles.priceTitle,{fontSize:25}]}>Total Price :</Text>
                        <Text style={[styles.priceTitle,{fontSize:25}]}>220.000đ</Text>
                    </View>
                    <Button
                        title="CHECK OUT"
                        buttonStyle={styles.btnCheckOut}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    bill:{
        flexDirection:'column',
        margin:5,
        backgroundColor:'#E5E5E5',
        padding:15,
        borderRadius:15
    },
    txtTitleTop:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        letterSpacing:5
    },
    priceTitle:{
        fontWeight:'600',
        color:'#111'
    },
    txtTotal:{
        fontSize:28,
        fontWeight:'bold',
        textAlign:'left'
    },
    btnCheckOut:{
        marginTop:20,
        backgroundColor:COLORS.primary,
        borderRadius:15,
        padding:10
    }
});