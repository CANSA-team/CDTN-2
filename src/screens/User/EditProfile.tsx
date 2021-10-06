import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Button,Text, Input } from 'react-native-elements';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import HeaderTitle from '../../components/HeaderTitle';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import COLORS from './../../consts/Colors';

let user_temp = {
    "id": 1,
    "phone": "0968241064",
    "name": "anh",
    "birthday": "1999-09-28T17:00:00.000Z"
}

export default function EditProfile(props:any) {
    const {navigation,route} = props;
    const [date, setDate] = useState(new Date(user_temp.birthday));
    const [show, setShow] = useState(false);
    const [name, setName] = useState(user_temp.name);
    const [phone, setPhone] = useState(user_temp.phone);


    useEffect(() => {
    }, [])

    const onChange = (event:any, selectedDate:Date) => {
        selectedDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(selectedDate);
    };

    const showMode = (currentMode:any) => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
        setDate(date);
    };

    const setUser = () => {
        user_temp = {
            "id": 1,
            "phone": phone,
            "name": name,
            "birthday": moment.utc(date).format('YYYY-MM-DD'),
        };

    }

    return (
        <View style={styles.container}>
            <HeaderTitle title={'EDIT'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>
           
            <View style={{marginHorizontal:10,marginVertical:20}}>            
                <Input
                    value={name}
                    label="Họ và Tên"
                    onChangeText={setName}
                />
                <Input
                    value={phone}
                    keyboardType='numeric'
                    label="Số điện thoại"
                    onChangeText={setPhone}
                />
                <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center' }}>
                    <Text style={{fontSize:20,marginRight:20,borderBottomColor:'gray',borderBottomWidth:1}}>{moment.utc(date).format('DD/MM/YYYY')}</Text>
                    <Button buttonStyle={{backgroundColor:COLORS.primary}} onPress={showDatepicker} title={
                        <FontAwesomeIcon icon={faCalendarAlt} size={20} color="white"/>
                    } >
                    </Button>

                </View>

                <View style={{marginBottom:20}}>
                    {show && (
                        <DateTimePicker
                            
                            color={COLORS.primary}
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            onChange={onChange}
                        />
                    )}
                </View> 

                <Button buttonStyle={{backgroundColor:COLORS.primary,borderRadius:10,padding:10}} title='Xác nhận sửa' onPress={setUser} />
            </View>
            
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 5,
        position: 'absolute',
        top: 33,
        left: 5,
        right: 0,
        zIndex:2
    },
});