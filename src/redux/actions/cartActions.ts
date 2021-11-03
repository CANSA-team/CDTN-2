import { Dispatch } from "redux";
import { ProductModel } from "../models";
import axios from 'axios';
import { CartActionType, ProductActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface GetAllCart {
    readonly type: CartActionType.GET_ALL_CART,
    payload?: [ProductModel]
}
export interface UpdateCart {
    readonly type: CartActionType.UPDATE_CART,
    payload?: [ProductModel]
}
export interface CartErrorAction {
    readonly type: CartActionType.ON_CART_ERROR,
    payload: any
}
export interface AddCartAction {
    readonly type: CartActionType.ADD_TO_CART,
    payload: any
}

export type CartActions = GetAllCart | CartErrorAction | AddCartAction | UpdateCart;

export const getCart = () => {
    return async (dispatch: Dispatch<CartActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/cart/all/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: CartActionType.ON_CART_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: CartActionType.GET_ALL_CART,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: CartActionType.ON_CART_ERROR,
                payload: error
            })
        }

    }
}

export const addCart = (product_id: number) => {
    return async (dispatch: Dispatch<CartActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/cart/add/${product_id}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: CartActionType.ON_CART_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: CartActionType.ADD_TO_CART,
                    payload: response.data.status
                })
            }

        } catch (error) {
            dispatch({
                type: CartActionType.ON_CART_ERROR,
                payload: error
            })
        }

    }
}

export const updateCart = (product_id: number, qty: number) => {
    return async (dispatch: Dispatch<CartActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/cart/update/${product_id}/${qty}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: CartActionType.ON_CART_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: CartActionType.UPDATE_CART,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: CartActionType.ON_CART_ERROR,
                payload: error
            })
        }

    }
}