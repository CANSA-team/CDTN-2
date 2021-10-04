import React, { useRef, useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function OTPscreen() {

    const [pinText1, setpinText1] = useState('');
    const [pinText2, setpinText2] = useState('');
    const [pinText3, setpinText3] = useState('');
    const [pinText4, setpinText4] = useState('');
    const [pinText5, setpinText5] = useState('');
    const [pinText6, setpinText6] = useState('');
    const pinInputRef1 = useRef<TextInput>();
    const pinInputRef2 = useRef<TextInput>();
    const pinInputRef3 = useRef<TextInput>();
    const pinInputRef4 = useRef<TextInput>();
    const pinInputRef5 = useRef<TextInput>();
    const pinInputRef6 = useRef<TextInput>();


    const updatePinText1 = (pinText1: string) => {
        console.log(pinInputRef1.current.isFocused());
        setpinText1(pinText1);
        if (pinText1 != "") {
            pinInputRef2.current?.focus()
        }
    };
    const updatePinText2 = (pinText2: string) => {
        console.log(pinInputRef2.current.isFocused());
        setpinText2(pinText2);
        if (pinText2 != "") {
            pinInputRef3.current?.focus()
        }
    };

    const updatePinText3 = (pinText3: string) => {
        console.log(pinInputRef3.current.isFocused());
        setpinText3(pinText3);
        if (pinText3 != "") {
            pinInputRef4.current?.focus()
        }
    };

    const updatePinText4 = (pinText4: string) => {
        console.log(pinInputRef4.current.isFocused());
        setpinText4(pinText4);
        if (pinText4 != "") {
            pinInputRef5.current?.focus()
        }
    };

    const updatePinText5 = (pinText5: string) => {
        console.log(pinInputRef5.current.isFocused());
        setpinText5(pinText5);
        if (pinText5 != "") {
            pinInputRef6.current?.focus()
        }
    };

    const updatePinText6 = (pinText6: string) => {
        console.log(pinInputRef6.current.isFocused());
        setpinText6(pinText6);
        if (pinText6 != "") {
            pinInputRef6.current?.focus()
        }
    };

    // Time out
    const [time, setTime] = useState(60);
    useEffect(() => {
        setInterval(() => {
            setTime(time - 1)
        }, 1000)
    });



    return (       
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.up}>
                    <Ionicons
                        name="ios-speedometer"
                        size={100}
                        color={'rgb(221, 97, 97)'}>
                    </Ionicons>
                    <Text style={styles.title}>
                        Verfication Code
                    </Text>
                    <Text style={{ color: 'rgb(221, 97, 97)', fontSize: 15, marginTop: 10 }}>
                        Input your OTP code sent via Email
                    </Text>
                </View>
                <View style={styles.down}>
                    <View style={styles.containerInput}>
                        <TextInput
                            onChangeText={updatePinText1}
                            value={pinText1}
                            ref={pinInputRef1}
                            maxLength={1}
                            keyboardType='numeric'
                            style={{
                                marginRight: 5, marginLeft: 5,
                                fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                            }} />
                        <TextInput
                            onChangeText={updatePinText2}
                            value={pinText2}
                            ref={pinInputRef2}
                            maxLength={1}
                            keyboardType='numeric'
                            style={{
                                marginRight: 5, marginLeft: 5,
                                fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                            }} />
                        <TextInput
                            onChangeText={updatePinText3}
                            value={pinText3}
                            ref={pinInputRef3}
                            maxLength={1}
                            keyboardType='numeric'
                            style={{
                                marginRight: 5, marginLeft: 5,
                                fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                            }} />
                        <TextInput
                            onChangeText={updatePinText4}
                            value={pinText4}
                            ref={pinInputRef4}
                            maxLength={1}
                            keyboardType='numeric'
                            style={{
                                marginRight: 5, marginLeft: 5,
                                fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                            }} />
                        <TextInput
                            onChangeText={updatePinText5}
                            value={pinText5}
                            ref={pinInputRef5}
                            maxLength={1}
                            keyboardType='numeric'
                            style={{
                                marginRight: 5, marginLeft: 5,
                                fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                            }} />
                        <TextInput
                            onChangeText={updatePinText6}
                            value={pinText6}
                            ref={pinInputRef6}
                            maxLength={1}
                            keyboardType='numeric'
                            style={{
                                marginRight: 5, marginLeft: 5,
                                fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                            }} />
                    </View>

                    <TouchableOpacity style={styles.forgotButton1}>
                        <Text style={styles.navButtonText1}>
                            Resend OTP in: {time}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginButtonTitle}>Continue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.navButtonText}>
                            Resend OTP
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#33FF99'
    },
    up: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'rgb(255,119,34)',
        textAlign: 'center',
        width: 400,
        fontSize: 30
    },
    down: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    forgotButton: {
        width: 120,
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3366CC',
    },
    navButtonText: {
        fontSize: 18,
        color: 'white',
    },
    loginButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221, 97, 97)',
        marginBottom: 10,
        marginTop: 10
    },
    loginButtonTitle: {
        fontSize: 18,
        color: 'white'

    },
    forgotButton1: {

    },
    navButtonText1: {
        fontSize: 15,

    },
    containerInput: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
})

