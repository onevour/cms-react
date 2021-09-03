import {
    DELETE,
    GET,
    POST, PUT
} from "../constants/reducActionTypes";

export function buildPost(payload, actionKey, responseKey) {
    return {
        type: actionKey,
        payload: payload,
        method: POST,
        response: responseKey
    }
}

export function buildPut(payload, actionKey, responseKey) {
    return {
        type: actionKey,
        payload: payload,
        method: PUT,
        response: responseKey
    }
}

export function buildDelete(payload, actionKey, responseKey) {
    return {
        type: actionKey,
        payload: payload,
        method: DELETE,
        response: responseKey
    }
}

export function buildGet(payload, actionKey, responseKey) {
    return {
        type: actionKey,
        payload: payload,
        method: GET,
        response: responseKey
    }
}