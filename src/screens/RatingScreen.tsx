import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryModel, CategoryState, CommentModel, CommentState, getProductsCategory, getProductsHot, getProductsNew, State, UserModel, UserStage } from '../redux';
import HeaderTitle from './../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RatingComment from '../components/RatingComment';
import { addComment } from '../redux/actions/commentActions';

export default function RatingScreen(props: any) {
    const { navigation } = props;
    const { getParam } = navigation;
    const id = getParam('id');
    const dispatch = useDispatch();
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const categoryState: CategoryState = useSelector((state: State) => state.categoryReducer);
    const { categories }: { categories: CategoryModel[] } = categoryState;
    const { userInfor }: { userInfor: UserModel } = userState;
    const commentState: CommentState = useSelector((state: State) => state.commentReducer);
    const { comment }: { comment: CommentModel[] } = commentState;
    const [isLoadingComment, setIsLoadingComment] = useState(true)

    useEffect(() => {
        if (comment && !isLoadingComment) {
            setIsLoadingComment(true);
            dispatch(getProductsNew());
            dispatch(getProductsHot());
            dispatch(getProductsCategory(categories[0].category_id));
            Alert.alert(
                "Thông báo!",
                "Đánh giá thành công",
                [
                    { text: "OK", onPress:() =>navigation.goBack()}
                ]
            );
        }
    }, [commentState])

    const onTap = (comment_content: string, comment_rating: number) => {
        if (comment_content) {
            setIsLoadingComment(false);
            dispatch(addComment(id, userInfor.user_id, comment_content, comment_rating));
        }
    }

    return (
        <View style={styles.container}>
            <HeaderTitle title="Đánh giá" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
                <Text style={{ fontSize: 18 }}>Hãy nhập đánh giá của bạn :</Text>
            </View>
            <View style={{marginHorizontal:10,marginTop:20}}>

                <RatingComment onTap={onTap} />
                 
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 20,
        marginTop: 20,
        marginHorizontal: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 35,
        left: 5,
        right: 0,
        zIndex: 2
    },
    btnSend: {
        textAlign: 'center',
        padding: 9,
        borderRadius: 15,
        backgroundColor: '#eeeb3e',
        width: 100,
        fontSize: 14
    }
})
