import {
    MASTER_DOCUMENT_RESPONSE, REMOVE_DOCUMENT_RESPONSE, UPLOAD_DOCUMENT_RESPONSE, USER_DOCUMENT_RESPONSE
} from "../constants/reducActionTypes";


function dataDigitalReducer(state, action) {
    if (MASTER_DOCUMENT_RESPONSE === action.type) {
        return Object.assign({}, state, {
            masterDocument: action.payload
        });
    }

    if (USER_DOCUMENT_RESPONSE === action.type) {
        return Object.assign({}, state, {
            userDocument: action.payload
        });
    }
    return state;
}

export default dataDigitalReducer;