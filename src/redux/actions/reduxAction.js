import {
    GET,
    POST
} from "../constants/reducActionTypes";

export function buildPost(payload, actionKey, responseKey) {
    return {
        type: actionKey,
        payload: payload,
        method: POST,
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