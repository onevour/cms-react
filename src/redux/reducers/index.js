import {ADD_ARTICLE, LOGIN_RESPONSE, LOGOUT_RESPONSE} from "../constants/action-types";

const initialState = {
    loginResponse: {code: 0}
};

function rootReducer(state = initialState, action) {
    // start from here
    if (LOGIN_RESPONSE === action.type) {
        return Object.assign({}, state, {
            loginResponse: action.payload
        });
    }
    if (LOGOUT_RESPONSE === action.type) {
        return Object.assign({}, state, {
            loginResponse: {code: 401}
        });
    }
    return state;
}

export default rootReducer;