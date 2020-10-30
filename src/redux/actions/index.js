import {BASE_URL, ADD_ARTICLE, LOGIN, LOGOUT, CUTI_SUBMIT, CUTI_LOAD_USER} from "../constants/action-types";

export function addArticle(payload) {
    return {type: ADD_ARTICLE, payload}
}

// with saga
export function getData(url) {
    return {type: "DATA_REQUESTED", payload: {url}};
}

export function login(param) {
    const payload = {
        url: BASE_URL + "/api/v1/login",
        body: param
    }
    return {type: LOGIN, payload: payload};
}

export function logout(param) {
    const payload = {}
    return {type: LOGOUT, payload: payload};
}

// cuti
export function submitCuti(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: BASE_URL + "/api/v1/cuti",
        body: param
    }
    return {type: CUTI_SUBMIT, payload: payload};
}

export function loadCutiUserLogin() {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: BASE_URL + "/api/v1/cuti/user",
        body: {
            nip: user.nip
        }
    }
    return {type: CUTI_LOAD_USER, payload: payload};
}