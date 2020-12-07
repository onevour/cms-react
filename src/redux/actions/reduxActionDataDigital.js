import {
    GET,
    MASTER_DOCUMENT, MASTER_DOCUMENT_RESPONSE, POST,
    REMOVE_DOCUMENT,
    UPLOAD_DOCUMENT, UPLOAD_DOCUMENT_RESPONSE,
    USER_DOCUMENT, USER_DOCUMENT_RESPONSE,
    USER_HISTORY_PANGKAT_LIST, USER_HISTORY_PANGKAT_LIST_RESPONSE
} from "../constants/reducActionTypes";

export function loadMasterDocument() {
    const payload = {
        url: "/user/document/type"
    }
    return {
        type: MASTER_DOCUMENT,
        payload: payload,
        method: GET,
        response: MASTER_DOCUMENT_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
    // return {type: MASTER_DOCUMENT, payload}
}

export function userUploadDocument(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/document/upload",
        body: param
    }
    return {
        type: UPLOAD_DOCUMENT,
        payload: payload,
        method: POST,
        response: UPLOAD_DOCUMENT_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function loadUserDocument() {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: "/user/document",
        body: {
            nip: user.nip
        }
    }
    return {
        type: USER_DOCUMENT,
        payload: payload,
        method: POST,
        response: USER_DOCUMENT_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
    // return {type: USER_DOCUMENT, payload}
}

export function removeUserDocument(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/document/remove",
        body: param
    }
    // return {type: REMOVE_DOCUMENT, payload}
    return {
        type: UPLOAD_DOCUMENT,
        payload: payload,
        method: POST,
        response: UPLOAD_DOCUMENT_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}