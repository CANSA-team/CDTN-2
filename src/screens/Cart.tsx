import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import CartCard from '../components/CartCard';
import { Button } from 'react-native-elements';
import COLORS from '../consts/Colors';
import { SafeAreaView } from 'react-navigation';
import HeaderTitle from '../components/HeaderTitle';
import { useNavigation } from '../utils/useNavigation';

export default function Cart() {
    const { navigate } = useNavigation();
    const onTapCheckout = () => {    
        navigate('Checkout')
    }
    const carts =[1]

    if (carts.length !== 0) {
        return (
            <SafeAreaView style={styles.container}>             
                <HeaderTitle title={'CART'} />
               
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
                            onPress={onTapCheckout}
                            title="CHECK OUT"
                            buttonStyle={styles.btnCheckOut}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )    
    }else{
        return (
            <SafeAreaView style={[styles.container]}> 
               <HeaderTitle title={'CART'} />
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:400,height:400}} source={require('../images/cart_empty.png')} />
                    <Text style={{fontSize:18,color:'gray'}}>Hiện tại chưa có sản phẩm trong giỏ hàng</Text>         
                </View>
            </SafeAreaView>
        )   
    }

    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    bill:{
        flexDirection:'column',
        margin:10,
        backgroundColor:'#E5E5E5',
        padding:15,
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4, 
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