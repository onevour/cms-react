import {
    DOCUMENT_CRUD, DOCUMENT_CRUD_RESPONSE,
    DOCUMENT_PAGE,
    DOCUMENT_PAGE_RESPONSE,
    MASTER_DOCUMENT, PANGKAT_DOCUMENT_CRUD, PANGKAT_DOCUMENT_CRUD_RESPONSE, PANGKAT_PAGE, PANGKAT_PAGE_RESPONSE,
    POST
} from "../constants/reducActionTypes";

export function pagePangkat(param) {
    const payload = {
        url: "/pangkat/page",
        body: param
    }
    return {
        type: PANGKAT_PAGE,
        payload: payload,
        method: POST,
        response: PANGKAT_PAGE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function mergePangkatDocument(param) {
    const payload = {
        url: "/pangkat/document/merge",
        body: param
    }
    return {
        type: PANGKAT_DOCUMENT_CRUD,
        payload: payload,
        method: POST,
        response: PANGKAT_DOCUMENT_CRUD_RESPONSE,
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