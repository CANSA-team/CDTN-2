import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '../../utils/useNavigation'
import axios from 'axios';
import { cansa } from '../../consts/Selector'
import COLORS from '../../consts/Colors';

export default function Resgister() {
  const { navigate } = useNavigation();
  const [name, setName] = useState('')
  const [nameValdate, setNameValdate] = useState(true)
  const [email, setEmail] = useState('')
  const [emailValdate, setEmailValdate] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordValdate, setPasswordValdate] = useState(true)

  const valiDate = (text: any, type: any) => {
    const nameRegex = ''
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (type == 'email') {
      if (emailRegex.test(text)) {
        setEmail(text)
        setEmailValdate(true)
      }
      else {
        setEmailValdate(false)
      }
    }
    else if (type == 'password') {
      if (passwordRegex.test(text)) {
        setPassword(text)
        setPasswordValdate(true)
      }
      else {
        setPasswordValdate(false)
      }
    } else if (type == 'nickname') {
      if (text != null) {
        setName(text)
        setNameValdate(true)
      }
      else {
        setNameValdate(false)
      }
    }
  }

  const registerBtn = () => {
    if (email != '' && password != '') {
      axios.get(`${cansa[1]}/api/user/create/1/${name}/${password}/${email}/e4611a028c71342a5b083d2cbf59c494`)
        .then(res => {
          if (res.data.status == 'success') {
            navigate('Login');
            Alert.alert('Thông báo', res.data.message);
          } else {
            Alert.alert('Thông báo', res.data.message);
          }

        })
        .catch(error => console.log(error));
    } else {
      Alert.alert('Thông báo', 'Email hoặc password không hợp lệ!!')
    }
  }

  const Divider = (props: any) => {
    return <View {...props}>
      <View style={styles.line}></View>
      <Text style={styles.textOR}>HOẶC</Text>
      <View style={styles.line}></View>
    </View>
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigate('Login') }}>
            <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.up}>
          <Image style={{ width: 150, height: 150 }} source={require('../../../assets/icon.png')} />
        </View>
        <View style={styles.down}>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              textContentType='nickname'
              autoCapitalize="sentences"
              returnKeyType="next"
              placeholder="Nhập Tên Khác (NickName)"
              maxLength={20}
              onChangeText={(text) => valiDate(text, 'nickname')}
            >
            </TextInput>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, !emailValdate ? styles.error : null]}
              textContentType='emailAddress'
              keyboardType='email-address'
              placeholder="Nhập E-mail"
              onChangeText={(text) => valiDate(text, 'email')}
            >
            </TextInput>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, !passwordValdate ? styles.error : null]}
              placeholder="Nhập mật khẩu"
              secureTextEntry={true}
              onChangeText={(text) => valiDate(text, 'password')}
            >
            </TextInput>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, !passwordValdate ? styles.error : null]}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={true}
              onChangeText={(text) => valiDate(text, 'password')}
            >
            </TextInput>
          </View>


          <TouchableOpacity style={styles.registerButton}
            onPress={() => { registerBtn() }}
          >
            <Text style={styles.registerButtonTitle}>Đăng Ký</Text>
          </TouchableOpacity>

          <Divider style={styles.divider}></Divider>
          <View style={{ marginBottom: 10 }}>
            <FontAwesome.Button
              style={styles.facebookButton}
              name="facebook"
              backgroundColor="#3b5998"
            >
              <Text style={styles.loginButtonTitle}>Đăng nhập bằng Facebook</Text>
            </FontAwesome.Button>
          </View>
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
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    position: 'absolute',
    top: 30,
    left: 10,
    right: 0,
    zIndex: 2
  },
  headerIcon: {
    borderRadius: 50,
    padding: 5
  },
  up: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  down: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: 'rgb(255,119,34)',
    textAlign: 'center',
    width: 400,
    fontSize: 23
  },
  textInputContainer: {
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  textInput: {
    width: 280,
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },

  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  registerButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: COLORS.primary
  },
  registerButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  facebookButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',

  },
  googleButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',


  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black'
  },
  textOR: {
    flex: 1,
    textAlign: 'center'
  },
  divider: {
    flexDirection: 'row',
    height: 40,
    width: 298,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotButton: {

  },
  navButtonText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    color: '#3b5998'

  },
  error: {
    borderColor: 'red',
    borderWidth: 1
  }
})