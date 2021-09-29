import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Accessory, Avatar, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';

let user_temp = {
    "id": 1,
    "phone": "0968241064",
    "name": "anh",
    "birthday": "1999-09-28T17:00:00.000Z"
}

export default function Account() {
    const [image, setImage] = useState('https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg');
    const [user, setUser] = useState(false);
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    let checkLogin = () => {
        setUser(!user);
    }

    function changDate(dateObj: Date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "Sep", "October", "November", "December"];
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = month + '\n' + day + ',' + year;
        return output;
    }

    let getImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    if (user) {
        return (
            <View style={styles.container}>
                <Avatar
                    rounded
                    size="xlarge"
                    source={{
                        uri: image,
                    }}
                    onPress={getImg}
                >
                    <Accessory></Accessory>
                </Avatar>
                <Text>User name: {user_temp.name}</Text>
                <Text>User phone: {user_temp.phone}</Text>
                <Text>User birthday: { moment.utc(user_temp.birthday).format('DD/MM/YYYY')}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        title="Logout"
                        type="outline"
                        onPress={checkLogin}
                    />
                    <Button
                        title="edit"
                        type="outline"
                        onPress={checkLogin}
                    />
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <Button
                    title="Login"
                    type="outline"
                    onPress={checkLogin}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});