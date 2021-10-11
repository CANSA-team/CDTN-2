import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import ProductOrdered from '../../components/ProductOrdered';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { OderItemModel, OderModel, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOder } from '../../redux/actions/oderActions';
import { getUserInfo } from '../../redux/actions/userActions';

let check = true;

export default function Ordered(props: any) {
    const { navigation, route } = props;
    const orderState = useSelector((state: State) => state.oderReducer);
    const { oderList } = orderState;
    const userState = useSelector((state: State) => state.userReducer);
    const { userInfor } = userState;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    // useEffect(() => {
    //     if(oderList){
    //         setIsLoading(true);
    //     }
    // },[orderState]);

    if (check) {
        if (userInfor) {
            dispatch(getAllOder(userInfor.user_id));
            check = false;
        } else {
            check = true;
        }
    } else {
        check = true;
    }

    // console.log(oderList);

    return (
        <View style={styles.container}>
            <HeaderTitle title="Đơn hàng" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            {
                !oderList ?
                    (<View style={styles.container}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) :
                    (
                        <ScrollView style={{ flex: 1, marginTop: 5 }} showsVerticalScrollIndicator={false}>
                            {
                                oderList && oderList.map((oder: OderModel, index: number) => {
                                    return(
                                        <View key={index}>
                                            <ProductOrdered oder={oder} />
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