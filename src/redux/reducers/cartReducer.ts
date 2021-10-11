import { CartActionType, ProductActionType } from "../action-types";
import { CartActions } from "../actions/cartActions";
import { ProductActions } from "../actions/productActions";
import { ProductModel, ProductState, CartModel, CartState } from "../models";


const initialState: CartState = {
    cart: undefined,
    status: undefined,
    error: undefined
}

const cartReducer = (state: CartState = initialState, action: CartActions) => {
    switch (action.type) {
        case CartActionType.GET_ALL_CART:
            return {
                ...state,
                cart: action.payload
            }
        case CartActionType.UPDATE_CART:
            return {
                ...state,
                cart: action.payload
            }
        case CartActionType.ADD_TO_CART:
            return {
                ...state,
                status: action.payload
            }
        case CartActionType.ON_CART_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default cartReducer;