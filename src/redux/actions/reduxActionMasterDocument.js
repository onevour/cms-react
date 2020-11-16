import {
    DOCUMENT_CRUD, DOCUMENT_CRUD_RESPONSE, DOCUMENT_LIST, DOCUMENT_LIST_RESPONSE,
    DOCUMENT_PAGE,
    DOCUMENT_PAGE_RESPONSE, GET,
    MASTER_DOCUMENT,
    POST
} from "../constants/reducActionTypes";

export function listDocument() {
    const payload = {
        url: "/document/type/all"
    }
    return {
        type: DOCUMENT_LIST,
        payload: payload,
        method: GET,
        response: DOCUMENT_LIST_RESPONSE,
        responseBody: {code: 0, result: []}
    }
}

export function pageDocument(param) {
    const payload = {
        url: "/document/type/page",
        body: param
    }
    return {
        type: DOCUMENT_PAGE,
        payload: payload,
        method: POST,
        response: DOCUMENT_PAGE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function mergeDocument(param) {
    const payload = {
        url: "/document/type/merge",
        body: param
    }
    return {
        type: DOCUMENT_CRUD,
        payload: payload,
        method: POST,
        response: DOCUMENT_CRUD_RESPONSE,
        responseBody: null
    }
}

export function removeDocument(param) {
    const payload = {
        url: "/document/type/remove",
        body: param
    }
    return {
        type: DOCUMENT_CRUD,
        payload: payload,
        method: POST,
        response: DOCUMENT_CRUD_RESPONSE,
        responseBody: null
    }
}