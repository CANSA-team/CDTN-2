import { CommentActionType, OderActionType, SliderActionType } from "../action-types";
import { CommentActions } from "../actions/commentActions";
import { OrderActions } from "../actions/oderActions";
import { CommentState, CommentModel, OderState } from "../models";


const initialState: OderState = {
    status: undefined,
    oderList: undefined,
    oder: undefined,
    error: undefined
}

const oderReducer = (state: OderState = initialState, action: OrderActions) => {
    switch (action.type) {
        case OderActionType.ADD_ORDER:
            return {
                ...state,
                status: action.payload
            }
        case OderActionType.GET_ALL_ORDER:
            return {
                ...state,
                oderList: action.payload
            }
        case OderActionType.UPDATE_ORDER:
            return {
                ...state,
                oderList: action.payload
            }
        case OderActionType.UPDATE_ODER_ITEM:
            return {
                ...state,
                oder: action.payload
            }
        case OderActionType.ON_ORDER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default oderReducer;