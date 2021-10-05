import { ProductActionType } from "../action-types";
import { ProductActions } from "../actions/productActions";
import { ProductModel, ProductState } from "../models";


const initialState:ProductState ={
    products: {} as [ProductModel],
    error: undefined
}

const productReducer = (state:ProductState = initialState,action:ProductActions)=>{
    switch (action.type) {
        case ProductActionType.GET_ALL_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case ProductActionType.ON_PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default productReducer;