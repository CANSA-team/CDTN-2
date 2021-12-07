import React, { useState, useEffect } from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from './../consts/Colors';
import { SlugStr, vnd } from './../consts/Selector';
import { ProductModel, State } from '../redux';
import { useSelector } from 'react-redux';

export default function CartCard(props: any) {
    const {isLoad} = props
    let [qty, setNumber] = useState<number>(1);
    const product:ProductModel = props.product;
    const cartState = useSelector((state: State) => state.cartReducer);

    useEffect(() => {
        setNumber(Number(props.qty));
    },[]);

    useEffect(() => {
    },[cartState])

    const onTap_btn = (value: number) => {
        setNumber(value);
        props.onTap(product.product_id, value);
    }

    return (
        product ?
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Image style={styles.img} source={{ uri: product.product_avatar }} />
            </View>
            <View style={styles.productContainer}>
                <View style={styles.productDetal}>
                    <Text style={styles.productName}>{ product && SlugStr( product.product_title, 20)}</Text>
                    <TouchableOpacity style={styles.iconDelete} onPress={() => {
                        onTap_btn(0);
                    }}>
                        <MaterialIcons name="delete" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 16, color: '#222' }}>{SlugStr(product && product.product_description, 62)}</Text>
                {
                    isLoad ?  
                    <View style={styles.productPrice}>
                    <TouchableOpacity
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 30,
                                height: 30,
                            }}
                            onPress={() => {
                                onTap_btn(Number(qty) - 1);
                            }}
                        >
                        <Text>-</Text>
                    </TouchableOpacity>

                    <Text style={{marginHorizontal:10,fontSize:14}}>{qty}</Text>

                    <TouchableOpacity
                        style={{
                            borderColor: 'black',
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 30,
                            height: 30,
                            marginRight:20
                        }}
                        onPress={() => {
                            onTap_btn(Number(qty) + 1);
                        }}>
                        <Text>+</Text>
                    </TouchableOpacity>
                        <Text style={{ color: '#222', fontSize: 20, fontWeight: 'bold' }}>{vnd((product.product_price * (100 - product.product_sale) / 100) * qty)}đ</Text>
                    </View>
                    :
                    <View style={styles.productPrice}>
                    <TouchableOpacity
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 30,
                                height: 30,
                            }}
                        >
                        <Text>-</Text>
                    </TouchableOpacity>

                    <Text style={{marginHorizontal:10,fontSize:14}}>{qty}</Text>

                    <TouchableOpacity
                        style={{
                            borderColor: 'black',
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 30,
                            height: 30,
                            marginRight:20
                        }}
                       >
                        <Text>+</Text>
                    </TouchableOpacity>
                        <Text style={{ color: '#222', fontSize: 20, fontWeight: 'bold' }}>{vnd((product.product_price * (100 - product.product_sale) / 100) * qty)}đ</Text>
                    </View>
                }
               
            </View>
        </View>
        :
        <View></View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 3,
        borderRadius: 10,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1
    },
    img: {
        flex: 1,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 1
    },
    productContainer: {
        flex: 2,
        flexDirection: 'column',
        marginLeft: 10
    },
    productDetal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111'
    },
    iconDelete: {
        backgroundColor: COLORS.primary,
        padding: 5,
        borderRadius: 8
    },
    productPrice: {
        flexDirection: 'row',
        
        alignItems: 'center',
        marginTop: 8
    }
});