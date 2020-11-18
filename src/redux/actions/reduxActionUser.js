import {
    DOCUMENT_CRUD,
    DOCUMENT_CRUD_RESPONSE,
    DOCUMENT_PAGE,
    DOCUMENT_PAGE_RESPONSE,
    GET,
    MASTER_DOCUMENT,
    PANGKAT_DOCUMENT_CRUD,
    PANGKAT_DOCUMENT_CRUD_RESPONSE,
    PANGKAT_PAGE,
    PANGKAT_PAGE_RESPONSE,
    POST, USER_HISTORY_PANGKAT_CRUD, USER_HISTORY_PANGKAT_CRUD_RESPONSE,
    USER_HISTORY_PANGKAT_LIST,
    USER_HISTORY_PANGKAT_LIST_RESPONSE,
    USER_LIST,
    USER_LIST_RESPONSE,
    USER_PAGE,
    USER_PAGE_RESPONSE
} from "../constants/reducActionTypes";

export function pageUser(param) {
    const payload = {
        url: "/user/page",
        body: param
    }
    return {
        type: USER_PAGE,
        payload: payload,
        method: POST,
        response: USER_PAGE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function listUserGolongan(param) {
    const payload = {
        url: "/user/list/golongan",
        body: param
    }
    return {
        type: USER_LIST,
        payload: payload,
        method: POST,
        response: USER_LIST_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function listUserHistoryPangkat() {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: "/user/history/pangkat/" + user.nip,
        body: {}
    }
    return {
        type: USER_HISTORY_PANGKAT_LIST,
        payload: payload,
        method: GET,
        response: USER_HISTORY_PANGKAT_LIST_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function addPangkat(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: "/user/pangkat/add",
        body: param
    }
    return {
        type: USER_HISTORY_PANGKAT_CRUD,
        payload: payload,
        method: POST,
        response: USER_HISTORY_PANGKAT_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function removePangkat(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: "/user/pangkat/remove",
        body: param
    }
    return {
        type: USER_HISTORY_PANGKAT_CRUD,
        payload: payload,
        method: POST,
        response: USER_HISTORY_PANGKAT_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}
