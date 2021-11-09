import { OderActionType } from "../action-types";
import { OrderActions } from "../actions/oderActions";
import { OderState, OderModel } from "../models";


const initialState: OderState = {
    status: undefined,
    oderList: [] as OderModel[],
    oder: {} as OderModel,
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