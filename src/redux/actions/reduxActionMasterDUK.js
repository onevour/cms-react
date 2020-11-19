import {
    DOCUMENT_CRUD, DOCUMENT_CRUD_RESPONSE, DOCUMENT_LIST, DOCUMENT_LIST_RESPONSE,
    DOCUMENT_PAGE,
    DOCUMENT_PAGE_RESPONSE, DUK_LIST, DUK_LIST_RESPONSE, DUK_PAGE, DUK_PAGE_RESPONSE, GET,
    MASTER_DOCUMENT,
    POST
} from "../constants/reducActionTypes";

export function listDuk() {
    const payload = {
        url: "/duk/all"
    }
    return {
        type: DUK_LIST,
        payload: payload,
        method: GET,
        response: DUK_LIST_RESPONSE,
        responseBody: {code: 0, result: []}
    }
}

export function pageDuk(param) {
    const payload = {
        url: "/duk/page",
        body: param
    }
    return {
        type: DUK_PAGE,
        payload: payload,
        method: POST,
        response: DUK_PAGE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}