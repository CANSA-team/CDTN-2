import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import COLORS from '../../consts/Colors';
import { SafeAreaView } from 'react-navigation';
import HeaderTitle from '../../components/HeaderTitle';
import { OderModel, OderState, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import OderCard from '../../components/OderCard';
import { updateOderItem } from '../../redux/actions/oderActions';
import { vnd } from '../../consts/Selector';



export default function oderDetail(props: any) {
    const { navigation } = props;
    const { getParam } = navigation;
    const [_oder, setOder] = useState(getParam('oder'));
    const [check, setCheck] = useState(false)
    const dispatch = useDispatch();
    const orderState: OderState = useSelector((state: State) => state.oderReducer);
    const { oder }: { oder: OderModel } = orderState;
    let sub_price = 0;
    let ship = 20000;
    let total_price = 0;

    useEffect(() => {
        if (oder && check) {
            setOder(oder);
            setCheck(false);
        }
    }, [orderState])

    if (_oder) for (const item of _oder.product_oder) {
        sub_price += (item.product.product_price * (100 - item.product.product_sale) / 100) * item.product_quantity;
    }

    total_price = sub_price + ship;

    const oderStatus = [
        <View style={styles.statusDes}>
            <Text style={styles.txtStatus}>Đã hủy</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đang xử lí</Text>
        </View>,
        <View style={styles.statusAccept}>
            <Text style={styles.txtStatus}>Đã nhận</Text>
        </View>
    ]
    const changeStatus = (product_id: number) => {

        Alert.alert(
            "Thông báo",
            "Hủy đơn hàng ?",
            [
                { text: "Cancel" },
                { text: "Yes", onPress: () => { setCheck(true); dispatch(updateOderItem(product_id, _oder.oder_id)) } },
            ]
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <HeaderTitle title={`Mã đơn hàng: ${_oder.oder_id}`} />
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, marginBottom: 10 }}>
                        <ScrollView>
                            {
                                _oder && _oder.product_oder.map((cart: any, index: number) => {
                                    return (
                                        < View key={index} >
                                            <OderCard qty={cart.product_quantity} product={cart.product} oderStatus={cart.status} status={_oder.status} onTap={changeStatus} />
                                        </View>)
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.bill}>
                        <Text style={styles.txtTotal}>Totals</Text>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={[styles.priceTitle, { fontSize: 23 }]}>Sub total :</Text>
                            <Text style={[styles.priceTitle, { fontSize: 23 }]}>{vnd(sub_price)}đ</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 5 }}>
                            <Text style={[styles.priceTitle, { fontSize: 23 }]}>Ship total :</Text>
                            <Text style={[styles.priceTitle, { fontSize: 23 }]}>{vnd(ship)}đ</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={[styles.priceTitle, { fontSize: 25 }]}>Total Price :</Text>
                            <Text style={[styles.priceTitle, { fontSize: 25 }]}>{vnd(total_price)}đ</Text>
                        </View>
                    </View>
                    {
                        oderStatus[_oder.status]
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
        borderRadius: 10,
        margin: 10
    },
    statusDes: {
        marginTop: 8,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 10,
        margin: 10
    },
    statusAccept: {
        marginTop: 8,
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 10,
        margin: 10
    },
    txtStatus: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
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
