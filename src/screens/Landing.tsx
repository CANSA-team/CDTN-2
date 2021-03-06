import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { State, UserModel, UserStage } from '../redux';
import { useNavigation } from '../utils/useNavigation';
import COLORS from '../consts/Colors';

import { useDispatch, useSelector } from 'react-redux';
import { updateAccess } from '../redux/actions/accessActions';
import { checkLogin} from '../redux/actions/userActions';

export default function Lauding() {
    const accessState = useSelector((state: State) => state.accessReducer);

    const { navigate } = useNavigation();
    const { message } = accessState;
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { timeSampCheckLogin }: { timeSampCheckLogin:number } = userState;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateAccess());
        dispatch(checkLogin())
    }, [])


    useEffect(() => {
        if (message != '' && timeSampCheckLogin !== -1) {
            navigate('homeStack')
        }

    }, [accessState,timeSampCheckLogin]);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Welcome to</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 45, color: COLORS.primary }}>CANSA SHOP</Text>
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
    deliveryIcon: {
        width: 120,
        height: 120,
    },
    titleContainer: {
        marginTop: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        color: '#7D7D7D'
    }
});
