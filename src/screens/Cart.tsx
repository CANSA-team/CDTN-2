import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CartCard from '../components/CartCard';
import { Button } from 'react-native-elements';
import COLORS from '../consts/Colors';
import { SafeAreaView } from 'react-navigation';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';


export default function Cart(props:any) {
    const {navigation,route} = props;
    return (
        <SafeAreaView style={styles.container}> 
            <View style={{paddingTop:40,paddingBottom:20,backgroundColor:COLORS.primary}}>             
                <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',color:'white',letterSpacing:5}}>CART</Text>                    
            </View>
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                <View style={{flex:1,marginBottom:10}}>
                    <CartCard />
                   
                </View>
               
                <View style={{flexDirection:'column',margin:5,backgroundColor:'#E5E5E5',padding:15,borderRadius:15}}>
                    <Text style={{fontSize:28,fontWeight:'bold',textAlign:'left'}}>Totals</Text>
                    <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                        <Text style={{fontSize:24,fontWeight:'600',color:'#111'}}>Sub total :</Text>
                        <Text style={{fontSize:24,fontWeight:'600',color:'#111'}}>200.000đ</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:'space-between',borderBottomColor:'gray',borderBottomWidth:1,paddingBottom:5}}>
                        <Text style={{fontSize:24,fontWeight:'600',color:'#111'}}>Ship total :</Text>
                        <Text style={{fontSize:24,fontWeight:'600',color:'#111'}}>20.000đ</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                        <Text style={{fontSize:26,fontWeight:'bold',color:'#111'}}>Total Price :</Text>
                        <Text style={{fontSize:26,fontWeight:'bold',color:'#111'}}>220.000đ</Text>
                    </View>
                    <Button
                        title="CHECK OUT"
                        buttonStyle={{marginTop:20,backgroundColor:COLORS.primary,borderRadius:15,padding:10}}
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
});