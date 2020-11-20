import {
    JABATAN_CRUD, JABATAN_CRUD_RESPONSE, JABATAN_LIST, JABATAN_LIST_RESPONSE,
    JABATAN_PAGE,
    JABATAN_PAGE_RESPONSE, GET,
    MASTER_JABATAN,
    POST
} from "../constants/reducActionTypes";

export function listJabatan() {
    const payload = {
        url: "/jabatan/all"
    }
    return {
        type: JABATAN_LIST,
        payload: payload,
        method: GET,
        response: JABATAN_LIST_RESPONSE,
        responseBody: {code: 0, result: []}
    }
}

export function listJabatanMap(param) {
    const payload = {
        url: "/jabatan/all/map",
        body: param
    }
    return {
        type: JABATAN_LIST,
        payload: payload,
        method: POST,
        response: JABATAN_LIST_RESPONSE,
        responseBody: {code: 0, result: []}
    }
}

export function pageJabatan(param) {
    const payload = {
        url: "/jabatan/page",
        body: param
    }
    return {
        type: JABATAN_PAGE,
        payload: payload,
        method: POST,
        response: JABATAN_PAGE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function mergeJabatan(param) {
    const payload = {
        url: "/jabatan/merge",
        body: param
    }
    return {
        type: JABATAN_CRUD,
        payload: payload,
        method: POST,
        response: JABATAN_CRUD_RESPONSE,
        responseBody: null
    }
}

export function removeJabatan(param) {
    const payload = {
        url: "/jabatan/remove",
        body: param
    }
    return {
        type: JABATAN_CRUD,
        payload: payload,
        method: POST,
        response: JABATAN_CRUD_RESPONSE,
        responseBody: null
    }
}