import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Text, Alert } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import ProductOrdered from '../../components/ProductOrdered';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { OderItemModel, OderModel, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOder, updateOder } from '../../redux/actions/oderActions';
import { getUserInfo } from '../../redux/actions/userActions';
import RNPickerSelect from 'react-native-picker-select';

let check = true;

export default function Ordered(props: any) {
    const { navigation, route } = props;
    const orderState = useSelector((state: State) => state.oderReducer);
    const { oderList, oder } = orderState;
    const userState = useSelector((state: State) => state.userReducer);
    const { userInfor } = userState;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let [_oderList, setOderList] = useState<Array<any>>();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    useEffect(() => {
        if (oderList) {
            setOderList(oderList);
        }
    }, [orderState]);

    useEffect(() => {
        if (userInfor) {
            dispatch(getAllOder(userInfor.user_id));
        }
    }, [oder]);

    if (check) {
        if (userInfor) {
            if (!oderList) {
                dispatch(getAllOder(userInfor.user_id));
                check = true;
            }
            check = false;
        } else {
            check = true;
        }
    } else {
        check = true;
    }


    const filterStatus = (data: number) => {
        if (oderList) {
            if (data != -1) {
                let __oderList = oderList.filter((item: any) => item.status === data);
                setOderList(__oderList);
            } else {
                setOderList(oderList);
            }
        }
    }

    const changeStatus = (oder_id: number,) => {

        Alert.alert(
            "Thông báo",
            "Hủy đơn hàng ?",
            [
                { text: "Cancel" },
                { text: "Yes", onPress: () => { dispatch(updateOder(userInfor.user_id, oder_id)) } },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <HeaderTitle title="Đơn hàng" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10, backgroundColor: 'white' }}>
                <RNPickerSelect
                    placeholder={{ label: "Filter", value: -1 }}
                    style={{ ...pickerSelectStyles, placeholder: { color: '#555' } }}
                    onValueChange={(data) => filterStatus(data)}
                    items={[
                        { label: 'Đang sử lý', value: 1 },
                        { label: 'Đã nhận', value: 2 },
                        { label: 'Đã hủy', value: 0 },
                    ]}
                />
            </View>
            {
                !_oderList ?
                    (<View style={styles.container}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) :
                    (
                        <ScrollView style={{ flex: 1, marginTop: 5 }} showsVerticalScrollIndicator={false}>
                            {
                                _oderList && _oderList.map((oder: OderModel, index: number) => {
                                    return (
                                        <View key={index}>
                                            <ProductOrdered oder={oder} onTap={changeStatus} />
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 33,
        left: 5,
        right: 0,
        zIndex: 2
    },

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 20,

    },
    inputAndroid: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 20
    },

});