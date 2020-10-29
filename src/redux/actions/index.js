import {ADD_ARTICLE, LOGIN, LOGOUT} from "../constants/action-types";

export function addArticle(payload) {
    return {type: ADD_ARTICLE, payload}
}

// with saga
export function getData(url) {
    return {type: "DATA_REQUESTED", payload: {url}};
}

export function login(param) {
    const payload = {
        url: "http://5.181.217.229:8081/api/v1/login",
        body: param
    }
    console.log("action " + LOGIN)
    return {type: LOGIN, payload: payload};
}

export function logout(param) {
    const payload = {
    }
    console.log("action " + LOGOUT)
    return {type: LOGOUT, payload: payload};
}