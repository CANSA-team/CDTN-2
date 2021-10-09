import { Dispatch } from "redux";
import { ProductModel } from "../models";
import  axios  from 'axios';
import { ProductActionType } from "../action-types";
import {cansa} from "../../consts/Selector";

export interface GetProductNew{
    readonly type: ProductActionType.GET_PRODUCT_NEW,
    payload?: [ProductModel]
}
export interface GetProductCategory{
    readonly type: ProductActionType.GET_PRODUCT_CATEGORY,
    payload?: [ProductModel]
}
export interface ProductErrorAction{
    readonly type: ProductActionType.ON_PRODUCT_ERROR,
    payload: any
}

export interface GetProductHot{
    readonly type: ProductActionType.GET_PRODUCT_HOT,
    payload?: [ProductModel]
}

export interface GetProduct{
    readonly type: ProductActionType.GET_PRODUCT,
    payload?: [ProductModel]
}

export type ProductActions = GetProductNew | ProductErrorAction | GetProductHot | GetProductCategory | GetProduct;

export const getProductsNew = () => {
    return async ( dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/page/1/new/0/e4611a028c71342a5b083d2cbf59c494`)
            if(!response){
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT_NEW,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}

export const getProductsHot = () => {
    return async ( dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/page/1/hot/0/e4611a028c71342a5b083d2cbf59c494`)
            if(!response){
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT_HOT,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}

export const getProductsCategory = (category_id: number) => {
    return async ( dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/category/page/1/${category_id}/0/e4611a028c71342a5b083d2cbf59c494`)
            if(!response){
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT_CATEGORY,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}

export const getProduct = (product_id: number) => {
    return async ( dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/view/${product_id}/0/e4611a028c71342a5b083d2cbf59c494`)
            if(!response){
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}
