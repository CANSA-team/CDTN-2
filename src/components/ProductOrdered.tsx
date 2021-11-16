import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import COLORS from '../consts/Colors';
import { useNavigation } from '../utils/useNavigation';
import { SlugStr } from './../consts/Selector';

export default function ProductOrdered(props: any) {
    const oder = props.oder;
    const { navigate } = useNavigation();

    const OderStatus = [
        <View style={styles.statusDes}>
            <Text style={styles.txtStatus}>Đã hủy</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đang xử lí</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đang xử lí</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đang xử lí</Text>
        </View>,
        <View style={styles.statusAccept}>
            <Text style={styles.txtStatus}>Đã nhận</Text>
        </View>
    ]

    const onTap = () => {
        navigate('OderDetail', { oder: oder })
    }

    return (
        <View style={styles.container}>
            {
                (oder.status == 1) &&
                <TouchableOpacity onPress={() => props.onTap(oder.oder_id)}>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginHorizontal: 10,
                        marginBottom: 5
                    }}>
                        <Text style={{ color: 'red', fontSize: 16 }}> Hủy đơn hàng </Text>
                    </View>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => onTap()}>
                <View style={styles.productContainer}>
                    <View style={styles.productDetal}>
                        <Text style={styles.productName}>Mã đơn hàng: {SlugStr(oder.oder_id, 60)}</Text>
                    </View>
                    <View style={styles.productDetal}>
                        <Text style={styles.productName}>Ngày đặt hàng: {moment.utc(oder.oder_date).format('DD/MM/YYYY')}</Text>
                    </View>
                    <Text style={{ color: 'gray', fontSize: 18 }}>Trạng thái :</Text>
                    {
                        OderStatus[oder.status]
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 3,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 2
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
        marginBottom: 3
    },
    productName: {
        fontSize: 20,
        fontWeight:'700',
        color: '#333'
    },
    statusPending: {
        marginTop: 8,
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 10
    },
    statusDes: {
        marginTop: 8,
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 10
    },
    statusAccept: {
        marginTop: 8,
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 10
    },
    txtStatus: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});