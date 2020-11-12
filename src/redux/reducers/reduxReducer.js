import {
    ADD_ARTICLE,
    LOGIN_RESPONSE,
    LOGOUT_RESPONSE,
    CUTI_SUBMIT_RESPONSE,
    CUTI_LOAD_USER_RESPONSE,
    HOLIDAYS_LOAD_RESPONSE,
    HOLIDAYS_SUBMIT_RESPONSE,
    HOLIDAYS_REMOVE_RESPONSE,
    CUTI_CANCEL_SUBMIT, CUTI_APPROVE_PEJABAT_SUBMIT, CUTI_APPROVE_ATASAN_SUBMIT, CUTI_DAYS_RESPONSE
} from "../constants/action-types";
import loginCutiReducer from "./reduxLoginCuti";
import dataDigitalReducer from "./reduxReducerDataDigital";

const initialState = {
    loginResponse: {code: 0},
    cutiResponse: {code: 0},
    cutiDaysResponse: {code: 0, result: 0},
    cutiUserResponse: {code: 0, result: []},
    cutiUpdateResponse: {code: 0},
    holidaySubmitResponse: {code: 0},
    holidayRemoveResponse: {code: 0},
    holidaysResponse: {code: 0, result: []},
    masterDocument: {code: 0, result: []},
    uploadDocument: {code: 0, result: []},
    userDocument: {code: 0, result: []}
};

function rootReducer(state = initialState, action) {
    state = loginCutiReducer(state, action)
    state = dataDigitalReducer(state, action)
    return state;
}

export default rootReducer;