import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Platform } from 'react-native';
import { Button,Text, Input } from 'react-native-elements';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

let user_temp = {
    "id": 1,
    "phone": "0968241064",
    "name": "anh",
    "birthday": "1999-09-28T17:00:00.000Z"
}

export default function EditProfile() {

    const [date, setDate] = useState(new Date(user_temp.birthday));
    const [show, setShow] = useState(false);
    const [name, setName] = useState(user_temp.name);
    const [phone, setPhone] = useState(user_temp.phone);


    useEffect(() => {
    }, [])

    const onChange = (event:any, selectedDate:Date) => {
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
            <View style={{ flexDirection: 'row' }}>
                <Text>{moment.utc(date).format('DD/MM/YYYY')}</Text>
                <Button onPress={showDatepicker} title={
                    <FontAwesomeIcon icon={faCalendarAlt} />
                } >
                </Button>

            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    onChange={onChange}
                />
            )}

            <Button title='Xác nhận sửa' onPress={setUser} />
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});