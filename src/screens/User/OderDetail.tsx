import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import COLORS from '../../consts/Colors';
import { SafeAreaView } from 'react-navigation';
import HeaderTitle from '../../components/HeaderTitle';
import { useNavigation } from '../..//utils/useNavigation';
import { CartItemModel, CartModel, State } from '../../redux';
import axios from 'axios';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import CartCard from '../../components/CartCard';
import OderCard from '../../components/OderCard';


let check = true;

export default function OderDetail(props: any) {
    const { navigate } = useNavigation();
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    const oder = getParam('oder');

    let sub_price = 0;
    let ship = 20000;
    let total_price = 0;

    for (const item of oder.product_oder) {
        sub_price += (item.product.product_price * (100 - item.product.product_sale) / 100) * item.product_quantity;
    }

    total_price = sub_price + ship;

    const OderStatus = [
        <View style={styles.statusDes}>
            <Text style={styles.txtStatus}>Đã hủy</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đang xử lí</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đã nhận</Text>
        </View>
    ]

    return (
        <SafeAreaView style={styles.container}>
            <HeaderTitle title={`Mã đơn hàng: ${oder.oder_id}`} />
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, marginBottom: 10 }}>
                        <ScrollView>
                            {
                                oder.product_oder.map((cart: any, index: number) => {
                                    console.log(oder);
                                    return (
                                        < View key={index} >
                                            <OderCard qty={cart.product_quantity} product={cart.product} />
                                        </View>)
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.bill}>
                        <Text style={styles.txtTotal}>Totals</Text>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={[styles.priceTitle, { fontSize: 23 }]}>Sub total :</Text>
                            <Text style={[styles.priceTitle, { fontSize: 23 }]}>{sub_price}đ</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 5 }}>
                            <Text style={[styles.priceTitle, { fontSize: 23 }]}>Ship total :</Text>
                            <Text style={[styles.priceTitle, { fontSize: 23 }]}>{ship}đ</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={[styles.priceTitle, { fontSize: 25 }]}>Total Price :</Text>
                            <Text style={[styles.priceTitle, { fontSize: 25 }]}>{total_price}đ</Text>
                        </View>
                    </View>
                    {
                        OderStatus[oder.status]
                    }
                </ScrollView>
            </View >

        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bill: {
        flexDirection: 'column',
        margin: 10,
        backgroundColor: '#E5E5E5',
        padding: 15,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
    },
    priceTitle: {
        fontWeight: '600',
        color: '#111'
    },
    statusPending: {
        marginTop: 8,
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 10
    },
    statusDes: {
        marginTop: 8,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 10
    },
    txtStatus: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    statusAccept: {
        marginTop: 8,
        backgroundColor: '#42EB53',
        padding: 8,
        borderRadius: 10
    },
    txtTotal: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    btnCheckOut: {
        marginTop: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        padding: 10
    }
});
