import { ImageActionType } from "../action-types";
import { ImageActions } from "../actions/imageActions";
import { ImageStage } from "../models";


const initialState: ImageStage = {
    image: undefined,
    error: undefined
}

const imageReducer = (state: ImageStage = initialState, action: ImageActions) => {
    switch (action.type) {
        case ImageActionType.GET_IMAGE:
            return {
                ...state,
                image: action.payload
            }
        case ImageActionType.ON_IMAGE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default imageReducer;