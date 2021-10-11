import moment from 'moment';
import React, { useState } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import COLORS from '../consts/Colors';
import { useNavigation } from '../utils/useNavigation';
import { SlugStr } from './../consts/Selector';

export default function ProductOrdered(props: any) {
    const [oder, setOder] = useState(props.oder);
    const { navigate } = useNavigation();

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

    const onTap = ()=>{
        console.log("tap")
        navigate('OderDetail', { oder:oder })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>onTap()}>
                <View style={styles.productContainer}>
                    <View style={styles.productDetal}>
                        <Text style={styles.productName}>Mã đơn hàng: {SlugStr(oder.oder_id, 60)}</Text>
                    </View>
                    <View style={styles.productDetal}>
                        <Text style={styles.productName}>Ngày đặt hàng: {moment.utc(oder.oder_date).format('DD/MM/YYYY')}</Text>
                    </View>
                    <Text style={{ color: '#222', fontSize: 18, fontWeight: 'bold' }}>Trạng thái :</Text>
                    {/* <Text style={styles.txtStatus}>Đang xử lí</Text>  */}
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
        flexDirection: 'row',
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
        fontWeight: 'bold',
        color: COLORS.primary
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
    statusAccept: {
        marginTop: 8,
        backgroundColor: '#42EB53',
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