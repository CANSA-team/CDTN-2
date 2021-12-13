import React, { useState, useEffect } from 'react'
import HeaderTitle from '../components/HeaderTitle'
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-elements';
import COLORS from '../consts/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '../utils/useNavigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CartModel, CartState, State, UserModel, UserStage } from '../redux';
import { getUserInfo } from '../redux/actions/userActions';
import { addOder } from '../redux/actions/oderActions';
import { vnd } from '../consts/Selector';
import { getCart } from '../redux/actions/cartActions';

let check = false;

interface Data {
    code: number,
    name: string
}

export default function Checkout(props: any) {
    let temp = [
        {
            value: {
                code: 0,
                name: " "
            },
            label: " "
        }
    ]
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { userInfor }: { userInfor: UserModel } = userState;
    const dispatch = useDispatch();

    const [thanhPho, setThanhPho] = useState(temp);
    const [quanHuyen, setQuanHuyen] = useState(temp);
    const [phuongXa, setPhuongXa] = useState(temp);
    const oderState = useSelector((state: State) => state.oderReducer);
    const { status } = oderState;

    const cartState: CartState = useSelector((state: State) => state.cartReducer);
    const { cart }: { cart: CartModel } = cartState;

    const [_thanhPho, _setThanhPho] = useState<Data>({} as Data);
    const [_quanHuyen, _setQuanHuyen] = useState<Data>({} as Data);
    const [_phuongXa, _setPhuongXa] = useState<Data>({} as Data);
    const [_soNha, _setSoNha] = useState('');
    const [_sdt, _setsdt] = useState('');

    const { navigation } = props;
    const { navigate } = useNavigation();

    const onTapCheckoutSuccess = () => {
        check = true;
        if (userInfor) {
            if (_quanHuyen && _thanhPho && _soNha && /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(_sdt)) {
                let diaChi = `${_soNha},${_phuongXa && _phuongXa.name + ','}${_quanHuyen.name},${_thanhPho.name}`;
                let user_id = userInfor.user_id;
                dispatch(addOder(diaChi, _sdt, user_id));
            }
            else {
                Alert.alert(
                    "Thông báo!",
                    "Điền đầy đủ thông tin!",
                    [
                        { text: "OK" }
                    ]
                );
            }
        } else {
            Alert.alert(
                "Thông báo!",
                "Chưa đăng nhập!",
                [
                    { text: "OK" }
                ]
            );
        }
    }

    useEffect(() => {
        if (status && check) {
            Alert.alert(
                "Thông báo!",
                status,
                [
                    { text: "OK", onPress: () => { navigate('CheckoutSuccess'); dispatch(getCart()); check = false; } }
                ]
            );
        }
    }, [oderState]);

    useEffect(() => {
        (async function () {
            await axios.get<any>('https://api.mysupership.vn/v1/partner/areas/province')
                .then((response: any) => {
                    let { results } = response.data;

                    let tempArr = results.map((item: any) => {
                        return { label: item.name, value: item };
                    });
                    setThanhPho(tempArr);
                })
        })();
        dispatch(getUserInfo());
    }, [])


    return (
        <SafeAreaView style={styles.container}>

            <HeaderTitle title={'Thông tin'} />
            <View style={{ position: 'absolute', left: 5, top: 35 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.viewTotal}>
                    <Text style={styles.txtTitle}>Tỉnh/Thành phố :</Text>
                    <View style={styles.viewPicker}>
                        <RNPickerSelect
                            placeholder={{ label: "Tỉnh/Thành phố", value: { code: 0, name: " " } }}
                            style={{ ...pickerSelectStyles, placeholder: { color: '#acabab' } }}
                            onValueChange={(data: any) => {
                                data &&
                                    axios.get('https://api.mysupership.vn/v1/partner/areas/district?province=' + data.code).then((response: any) => {

                                        let { results } = response.data;

                                        let tempArr = results.map((item: any) => {
                                            return { label: item.name, value: item };
                                        });

                                        setQuanHuyen(tempArr)

                                        _setThanhPho(data);
                                    })
                            }}
                            items={thanhPho}
                        />
                    </View>
                </View>

                <View style={styles.viewTotal}>
                    <Text style={styles.txtTitle}>Quận/Huyện :</Text>
                    <View style={styles.viewPicker}>
                        <RNPickerSelect
                            placeholder={{ label: "Quận/Huyện", value: { code: 0, name: " " } }}
                            style={{ ...pickerSelectStyles, placeholder: { color: '#acabab' } }}
                            onValueChange={(data) => {
                                data &&
                                    axios.get('https://api.mysupership.vn/v1/partner/areas/commune?district=' + data.code).then((response: any) => {

                                        let { results } = response.data;

                                        let tempArr = results.map((item: any) => {
                                            return { label: item.name, value: item };
                                        });

                                        setPhuongXa(tempArr);

                                        _setQuanHuyen(data);
                                    })

                            }}
                            items={quanHuyen}
                        />
                    </View>
                </View>

                <View style={styles.viewTotal}>
                    <Text style={styles.txtTitle}>Phường/Xã :</Text>

                    <View style={styles.viewPicker}>
                        <RNPickerSelect
                            placeholder={{ label: "Phường/Xã", value: { code: 0, name: " " } }}
                            style={{ ...pickerSelectStyles, placeholder: { color: '#acabab' } }}
                            onValueChange={(data) =>
                                data && _setPhuongXa(data)
                            }
                            items={phuongXa}
                        />
                    </View>
                </View>

                <View style={styles.viewTotal}>
                    <Text style={styles.txtTitle}>Thôn/Xóm/Số nhà :</Text>
                    <View style={styles.textAreaContainer} >
                        <TextInput

                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Thôn/Xóm/Số nhà"
                            placeholderTextColor="#acabab"
                            numberOfLines={10}
                            maxLength={255}
                            multiline={true}
                            onChangeText={(text) => {
                                _setSoNha(text);
                            }}
                        />
                    </View>

                    <Text style={styles.txtTitle}>Số điện thoại :</Text>
                    <View style={styles.textAreaContainer} >
                        <TextInput

                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Số điện thoại"
                            placeholderTextColor="#acabab"
                            numberOfLines={10}
                            maxLength={255}
                            multiline={true}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                _setsdt(text);
                            }}
                        />
                    </View>
                </View>

            </ScrollView>

            <View style={[styles.viewTotal, styles.method]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text style={styles.txtPay}>Phương thức thanh toán : </Text>
                    <Text style={styles.txtPrice}>Tiền mặt</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.txtPay}>Tổng tiền : </Text>
                    <Text style={styles.txtPrice}>{vnd(cart.total_price)}đ</Text>
                </View>
            </View>
            <View style={styles.viewTotal}>
                <Button
                    onPress={onTapCheckoutSuccess}
                    title="TIẾP TỤC"
                    buttonStyle={styles.btnContinute}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    txtTitle: {
        fontSize: 18,
        color: 'black',
        marginBottom: 5
    },
    txtPay: {
        fontSize: 19,
        color: '#222'
    },
    method: {
        backgroundColor: '#E5E5E5',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    txtPrice: {
        fontSize: 20,
        color: '#222',
        fontWeight: 'bold'
    },
    viewPicker: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray'
    },
    viewTotal: {
        marginHorizontal: 20,
        margin: 10,
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 10
    },
    textArea: {
        height: 60,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        lineHeight: 30,
        textAlignVertical: "top",
        padding: 10,
        fontSize: 16
    },
    btnContinute: {
        marginTop: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 10
    }
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 25
    },
    inputAndroid: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 25
    },
});
