import { Dispatch } from "redux";
import { ProductModel } from "../models";
import  axios  from 'axios';
import { ProductActionType } from "../action-types";
import {cansa} from "../../consts/Selector";

export interface GetAllProduct{
    readonly type: ProductActionType.GET_ALL_PRODUCT,
    payload?: [ProductModel]
}
export interface ProductErrorAction{
    readonly type: ProductActionType.ON_PRODUCT_ERROR,
    payload: any
}

export type ProductActions = GetAllProduct | ProductErrorAction;

export const getProducts = () => {
    return async ( dispatch: Dispatch<ProductActions>) => {
        try {
            console.log(cansa[0]);
            const response = await axios.get<any>(`${cansa[0]}/api/product/page/1/0/e4611a028c71342a5b083d2cbf59c494?fbclid=IwAR15YJjDQ0Qm_k0tm3WeSXt1YRpQxlGr9DiIapSJZMhe3N2QElIzBMs1uTA`)
            if(!response){
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_ALL_PRODUCT,
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
