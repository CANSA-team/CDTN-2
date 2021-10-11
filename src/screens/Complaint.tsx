import React,{useState,useEffect} from 'react'
import { View, TouchableOpacity,StyleSheet,Text,TextInput, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../redux';
import { addComplaint } from '../redux/actions/complaintActions';
import { useNavigation } from '../utils/useNavigation';

let check = false;

export default function Complaint(props:any) {
    const { navigate } = useNavigation();
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    const id = getParam('id');
    const [defautRating,setDefautRating] = useState(5);
    const [complaint,setComplaint] = useState();
    const dispatch = useDispatch();
    const userState = useSelector((state: State) => state.userReducer);
    const complaintState = useSelector((state: State) => state.complaintReducer);
    const { userInfor } = userState;
    const { status } = complaintState;

    useEffect(() => {
        console.log(status);
        if(status && check){
            Alert.alert(
                "Thông báo!",
                "Cảm ơn bạn đã phản hồi!",
                [
                    { text: "OK" , onPress: () => check = false}
                ]
            );
            
        }
    },[complaintState])

    const opTap = ()=>{
        if(userInfor){
            if(complaint){
                dispatch(addComplaint(id,complaint));
            }else{
                Alert.alert(
                    "Thông báo!",
                    "Bạn chưa nhập lý do!",
                    [
                        { text: "OK" }
                    ]
                );
            }
        }else{
            Alert.alert(
                "Thông báo!",
                "Chưa đăng nhập!",
                [
                    { text: "OK" }
                ]
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5,marginTop:5}}>      
                
                <TouchableOpacity style={{justifyContent:'flex-end',marginRight:5}} onPress={()=>{
                    check = true;
                    opTap();
                }}>
                    <Text style={styles.btnSend}>Send</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textAreaContainer} >
                    <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Your complaint..."
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    maxLength={255}
                    multiline={true}
                    onChangeText = {(text:any) =>{
                        setComplaint(text);
                    }}
                    />
            </View>       
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
    textAreaContainer: {
      borderColor: 'gray',
      borderWidth: 1,
      padding: 5,
      borderRadius:20
    },
    textArea: {
      height: 90,
      justifyContent: "flex-start",
      alignItems:'flex-start',
      lineHeight:30,
      textAlignVertical: "top",
      padding: 10,
      fontSize:16
    },
    btnSend:{
        textAlign:'center',
        padding:9,
        borderRadius:15,
        backgroundColor:'#eeeb3e',
        width:100,
        fontSize:14
    }
})
