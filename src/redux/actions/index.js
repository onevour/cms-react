import {ADD_ARTICLE, LOGIN} from "../constants/action-types";

export function addArticle(payload) {
    return {type: ADD_ARTICLE, payload}
}

// with saga
export function getData(url) {
    return {type: "DATA_REQUESTED", payload: {url}};
}

export function login(param) {
    const payload = {
        url: "http://localhost:8080/api/v1/login",
        body: param
    }
    console.log("action " + LOGIN)
    return {type: LOGIN, payload: payload};
}