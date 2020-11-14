import {
    LOGIN,
    LOGOUT
} from "../constants/reducActionTypes";

export function login(param) {
    const payload = {
        url:  "/user/login",
        body: param
    }
    return {type: LOGIN, payload: payload};
}

export function logout(param) {
    const payload = {}
    return {type: LOGOUT, payload: payload};
}

