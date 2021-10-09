import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import CartCard from '../components/CartCard';
import { Button } from 'react-native-elements';
import COLORS from '../consts/Colors';
import { SafeAreaView } from 'react-navigation';
import HeaderTitle from '../components/HeaderTitle';
import { useNavigation } from '../utils/useNavigation';
import { CartItemModel, CartModel } from '../redux';
import axios from 'axios';
import { cansa } from '../consts/Selector';
import { withNavigationFocus } from 'react-navigation';

class _cart {
    cart?: CartModel;
    constructor() { }
}

let check = false;

const Cart = (props: any) => {
    const { navigate } = useNavigation();
    let [cart, setCart] = useState<_cart>(new _cart());
    const { navigation, route } = props;
    const onTapCheckout = () => {
        navigate('Checkout')
    }

    const getCart = async () => {
        await axios.get(`${cansa[1]}/api/cart/all/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
            const data: CartModel = response.data.data;
            let temp_cart = new _cart();
            temp_cart.cart = data;
            cart = temp_cart;
        })
    }

    if (navigation.isFocused && !check) {
        (async () => {
            const _getCart: Promise<any> = getCart();
            await Promise.all([_getCart]).then(() => {
                setCart(cart);
                check = true;
            })
        })()
    }else {
        check = false;
    }

    const onTap = async (id: number, qty: number) => {
        await axios.get(`${cansa[1]}/api/cart/update/${id}/${qty}/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
            const data: CartModel = response.data.data;
            let temp_cart = new _cart();
            if(data){
                temp_cart.cart = data;
            }
            setCart(temp_cart);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                cart.cart ?
                    (<View style={styles.container}>
                        <HeaderTitle title={'giỏ hàng'} />

                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View style={{ flex: 1, marginBottom: 10 }}>
                                <ScrollView>
                                    {
                                        cart.cart.cart && cart.cart.cart.map((cart: CartItemModel, index: number) => {
                                            return (
                                                < View key={index} >
                                                    <CartCard qty={cart.qty} product={cart.product} onTap={onTap} />
                                                </View>)
                                        })
                                    }
                                </ScrollView>
                            </View>
                            <View style={styles.bill}>
                                <Text style={styles.txtTotal}>Totals</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text style={[styles.priceTitle, { fontSize: 23 }]}>Sub total :</Text>
                                    <Text style={[styles.priceTitle, { fontSize: 23 }]}>{cart.cart && cart.cart.price}đ</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 5 }}>
                                    <Text style={[styles.priceTitle, { fontSize: 23 }]}>Ship total :</Text>
                                    <Text style={[styles.priceTitle, { fontSize: 23 }]}>20.000đ</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text style={[styles.priceTitle, { fontSize: 25 }]}>Total Price :</Text>
                                    <Text style={[styles.priceTitle, { fontSize: 25 }]}>220.000đ</Text>
                                </View>
                                <Button
                                    onPress={onTapCheckout}
                                    title="CHECK OUT"
                                    buttonStyle={styles.btnCheckOut}
                                />
                            </View>
                        </ScrollView>
                    </View >)
                    :
                    (
                        <SafeAreaView style={[styles.container]}>
                            <HeaderTitle title={'giỏ hàng'} />
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ width: 400, height: 400 }} source={require('../images/cart_empty.png')} />
                                <Text style={{ fontSize: 18, color: 'gray' }}>Hiện tại chưa có sản phẩm trong giỏ hàng</Text>
                            </View>
                        </SafeAreaView>
                    )

            }
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

export default withNavigationFocus(Cart);