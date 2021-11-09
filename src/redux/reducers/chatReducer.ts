import { Chat, ShopActionType } from "../action-types";
import { ChatAction } from "../actions/chatActions";
import { ShopActions } from "../actions/shopActions";
import { CommentState, CommentModel, ChatStage, ShopModel } from "../models";


const initialState: ChatStage = {
    isChat: undefined,

}

const chatReducer = (state: ChatStage = initialState, action: ChatAction) => {
    switch (action.type) {
        case Chat.CHAT_IS_UPDATE:
            return {
                ...state,
                isChat: action.payload
            }
        default:
            return state;

    }
}

export default chatReducer;