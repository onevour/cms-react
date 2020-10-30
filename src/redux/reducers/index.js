import {
    ADD_ARTICLE,
    LOGIN_RESPONSE,
    LOGOUT_RESPONSE,
    CUTI_SUBMIT_RESPONSE,
    CUTI_LOAD_USER_RESPONSE
} from "../constants/action-types";

const initialState = {
    loginResponse: {code: 0},
    cutiResponse: {code: 0},
    cutiUserResponse: {code: 0, result: []}
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
    if (CUTI_SUBMIT_RESPONSE === action.type) {
        return Object.assign({}, state, {
            cutiResponse: action.payload
        });
    }
    if (CUTI_LOAD_USER_RESPONSE === action.type) {
        console.log("response load cuti user", action.payload)
        return Object.assign({}, state, {
            cutiUserResponse: action.payload
        });
    }
    return state;
}

export default rootReducer;