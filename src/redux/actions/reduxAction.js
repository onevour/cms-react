import {
    CUTI_SUBMIT, CUTI_SUBMIT_RESPONSE,
    LOGIN, LOGIN_RESPONSE,
    LOGOUT, POST
} from "../constants/reducActionTypes";

export function login(param) {
    const payload = {
        url:  "/user/login",
        body: param
    }
    // return {type: LOGIN, payload: payload};
    return {
        type: LOGIN,
        payload: payload,
        method: POST,
        response: LOGIN_RESPONSE
    }
}

export function logout(param) {
    const payload = {}
    return {type: LOGOUT, payload: payload};
}

