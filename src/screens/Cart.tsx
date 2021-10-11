import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import CartCard from '../components/CartCard';
import { Button } from 'react-native-elements';
import COLORS from '../consts/Colors';
import { SafeAreaView } from 'react-navigation';
import HeaderTitle from '../components/HeaderTitle';
import { useNavigation } from '../utils/useNavigation';
import { CartItemModel, CartModel, State } from '../redux';
import axios from 'axios';
import { cansa } from '../consts/Selector';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateCart } from '../redux/actions/cartActions';


let check = true;

const Cart = (props: any) => {
    const { navigate } = useNavigation();
    const { navigation, route } = props;
    const cartState = useSelector((state: State) => state.cartReducer);
    const { cart } = cartState;
    let [cartItem,setCartItem] = useState([]);
    const dispatch = useDispatch();

    const onTapCheckout = () => {
        navigate('Checkout')
    }

    if(check){
        dispatch(getCart());
        check = false;
    }else{
        check = true;
    }

    const onTap = (id: number, qty: number) => {
        dispatch(updateCart(id,qty));
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                cart ?
                    (
                        <View style={styles.container}>
                            <HeaderTitle title={'Giỏ Hàng'} />

                            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                <View style={{ flex: 1, marginBottom: 10 }}>
                                    <ScrollView>
                                        {
                                            cart && cart.cart && cart.cart.map((cart: CartItemModel, index: number) => {
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
                                        <Text style={[styles.priceTitle, { fontSize: 23 }]}>{cart && cart.sub_price}đ</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 5 }}>
                                        <Text style={[styles.priceTitle, { fontSize: 23 }]}>Ship total :</Text>
                                        <Text style={[styles.priceTitle, { fontSize: 23 }]}>{cart && cart.ship}đ</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                        <Text style={[styles.priceTitle, { fontSize: 25 }]}>Total Price :</Text>
                                        <Text style={[styles.priceTitle, { fontSize: 25 }]}>{cart && cart.total_price}đ</Text>
                                    </View>
                                    <Button
                                        onPress={onTapCheckout}
                                        title="CHECK OUT"
                                        buttonStyle={styles.btnCheckOut}
                                    />
                                </View>
                            </ScrollView>
                        </View >
                    )
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