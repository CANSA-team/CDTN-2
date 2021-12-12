import moment from 'moment';
import React, { useRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import COLORS from '../consts/Colors';
import { useNavigation } from '../utils/useNavigation';
import { SlugStr } from './../consts/Selector';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function ProductOrdered(props: any) {
    const oder = props.oder;
    const { navigate } = useNavigation();
    const swipeableRef = useRef<any>(null);

    const OderStatus = [
        <View style={styles.statusDes}>
            <Text style={styles.txtStatus}>Đã hủy</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đã đặt hàng</Text>
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
        swipeableRef.current.close();
        navigate('OderDetail', { oder: oder })
    }

    const boxRenderRight = () => {
        return (
            <>
                <TouchableOpacity onPress={() => props.onTap(oder.oder_id)} style={{ marginVertical: 2, marginTop: 3, width: 100, backgroundColor: '#f53a4c', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Hủy đơn hàng</Text>
                </TouchableOpacity>
            </>
        )
    }


    const boxRenderLeft = () => {
        return (
            <>
                <TouchableOpacity onPress={onTap} style={{ marginVertical: 2, marginTop: 3, width: 105, backgroundColor: '#ffc106', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Thông tin đơn hàng</Text>
                </TouchableOpacity>
            </>
        )
    }

    return (oder.status == 1) ?
        <Swipeable ref={swipeableRef} friction={2} overshootLeft={false} overshootRight={false} renderLeftActions={boxRenderLeft} renderRightActions={boxRenderRight}>
            <View style={styles.container}>
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
        </Swipeable>
        :
        <Swipeable ref={swipeableRef} friction={2} overshootLeft={false} overshootRight={false} renderLeftActions={boxRenderLeft}>
            <View style={styles.container}>
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
        </Swipeable>

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 3,
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
        fontWeight: '700',
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