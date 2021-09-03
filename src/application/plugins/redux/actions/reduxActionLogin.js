import {
    LOGIN,
    LOGIN_RESPONSE
} from "../constants/reducActionTypes";
import {buildPost} from "./reduxAction";

export function login(param) {
    const payload = {
        url: "/user/login",
        body: param
    }
    return buildPost(payload, LOGIN, LOGIN_RESPONSE)
}

export function logout(param) {
    const payload = {
        url: "/user/login",
        body: param
    }
    return buildPost(payload, LOGIN, LOGIN_RESPONSE)
}