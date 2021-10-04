import React, { useState } from 'react'
import HeaderTitle from '../components/HeaderTitle'
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-elements';
import COLORS from '../consts/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '../utils/useNavigation';

export default function Checkout(props:any) {
    const [data, setData] = useState();
    const {navigation,route} = props;
    const { navigate } = useNavigation();
    const onTapCheckoutSuccess = () => {    
        navigate('CheckoutSuccess')
    }
    return (
        <SafeAreaView style={styles.container}>

            <HeaderTitle title={'ORDER'} />
            <View style={{position:'absolute',left:5,top:35}}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={()=>navigation.goBack()}/>
                </TouchableOpacity>
            </View>

            <View style={styles.viewTotal}>
                <Text style={styles.txtTitle}>Tỉnh/Thành phố :</Text>
                <View style={styles.viewPicker}>          
                    <RNPickerSelect
                        placeholder={{ label: "Tỉnh/Thành phố", value: null }}
                        style={{...pickerSelectStyles,placeholder:{color:'#acabab'}}}
                        onValueChange={(data) => setData(data)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                    />
                </View>
            </View>

            <View style={styles.viewTotal}>
                <Text style={styles.txtTitle}>Quận/Huyện :</Text>
                <View style={styles.viewPicker}>          
                    <RNPickerSelect
                        placeholder={{ label: "Quận/Huyện", value: null }}
                        style={{...pickerSelectStyles,placeholder:{color:'#acabab'}}}
                        onValueChange={(data) => setData(data)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                    />
                </View>
            </View>

            <View style={styles.viewTotal}>
                <Text style={styles.txtTitle}>Phường/Xã :</Text>
                <View style={styles.viewPicker}>          
                    <RNPickerSelect
                        placeholder={{ label: "Phường/Xã", value: null }}
                        style={{...pickerSelectStyles,placeholder:{color:'#acabab'}}}
                        onValueChange={(data) => setData(data)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
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
                    />
                </View>
            </View>

            <View style={[styles.viewTotal,styles.method]}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15}}>
                    <Text style={styles.txtPay}>Phương thức thanh toán : </Text>
                    <Text style={styles.txtPrice}>Tiền mặt</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.txtPay}>Tổng tiền : </Text>
                    <Text style={styles.txtPrice}>1.000.000đ</Text>
                </View>
            </View>

            <View style={styles.viewTotal}>
                <Button
                    onPress={onTapCheckoutSuccess}
                    title="CONTINUTE"
                    buttonStyle={styles.btnContinute}
                />
            </View>
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
    },
    txtTitle:{
        fontSize:18,
        color:'black',
        marginBottom:5
    },
    txtPay:{
        fontSize:19,
        color:'#222'
    },
    method:{
        backgroundColor:'#E5E5E5',
        paddingVertical:20,
        paddingHorizontal:10,
        borderRadius:10
    },
    txtPrice:{
        fontSize:20,
        color:'#222',
        fontWeight:'bold'
    },
    viewPicker:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth: 1,
        borderColor: 'gray'
    },
    viewTotal:{
        marginHorizontal:20,
        margin: 10,  
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4, 
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        borderRadius:10
    },
    textArea: {
    height: 60,
    justifyContent: "flex-start",
    alignItems:'flex-start',
    lineHeight:30,
    textAlignVertical: "top",
    padding: 10,
    fontSize:16
    },
    btnContinute:{
        marginTop:20,
        backgroundColor:COLORS.primary,
        borderRadius:15,
        padding:10
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