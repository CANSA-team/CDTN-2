import { CommplaintActionType } from "../action-types";
import { ComplaintActions } from "../actions/complaintActions";
import { ComplaintStage } from "../models";


const initialState: ComplaintStage = {
    status: undefined,
    error: undefined
}

const complaintReducer = (state: ComplaintStage = initialState, action: ComplaintActions) => {
    switch (action.type) {
        case CommplaintActionType.ADD_COMPLAINT:
            return {
                ...state,
                status: action.payload
            }
        case CommplaintActionType.ON_COMPLAINT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default complaintReducer;