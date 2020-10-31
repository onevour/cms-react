import {
    ADD_ARTICLE,
    LOGIN_RESPONSE,
    LOGOUT_RESPONSE,
    CUTI_SUBMIT_RESPONSE,
    CUTI_LOAD_USER_RESPONSE,
    HOLIDAYS_LOAD_RESPONSE,
    HOLIDAYS_SUBMIT_RESPONSE,
    HOLIDAYS_REMOVE_RESPONSE,
    CUTI_CANCEL_SUBMIT, CUTI_APPROVE_PEJABAT_SUBMIT, CUTI_APPROVE_ATASAN_SUBMIT
} from "../constants/action-types";

const initialState = {
    loginResponse: {code: 0},
    cutiResponse: {code: 0},
    cutiUserResponse: {code: 0, result: []},
    cutiUpdateResponse: {code: 0},
    holidaySubmitResponse: {code: 0},
    holidayRemoveResponse: {code: 0},
    holidaysResponse: {code: 0, result: []}
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
        return Object.assign({}, state, {
            cutiUserResponse: action.payload
        });
    }
    if (HOLIDAYS_SUBMIT_RESPONSE === action.type) {
        return Object.assign({}, state, {
            holidaySubmitResponse: action.payload
        });
    }
    if (HOLIDAYS_REMOVE_RESPONSE === action.type) {
        return Object.assign({}, state, {
            holidayRemoveResponse: action.payload
        });
    }
    if (HOLIDAYS_LOAD_RESPONSE === action.type) {
        return Object.assign({}, state, {
            holidaysResponse: action.payload
        });
    }
    if (CUTI_CANCEL_SUBMIT === action.type
        || CUTI_APPROVE_PEJABAT_SUBMIT === action.type
        || CUTI_APPROVE_ATASAN_SUBMIT === action.type) {
        return Object.assign({}, state, {
            cutiUpdateResponse: action.payload
        });
    }
    return state;
}

export default rootReducer;