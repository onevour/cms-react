import {call, put} from "redux-saga/effects";
import {
    GET,
    MASTER_DOCUMENT_RESPONSE, POST,
    USER_DOCUMENT_RESPONSE
} from "../constants/reducActionTypes";
import {getData, postData} from "../../application/ApiRequest";

export function* masterDocumentType(action) {
    try {
        if (action.method === GET) {
            const payloadResponse = yield call(getData, action.payload);
            yield put({type: action.response, event: action.response, payload: payloadResponse, responseBody: action.responseBody});
        }
        if (action.method === POST) {
            const payloadResponse = yield call(postData, action.payload);
            // console.log({action})
            yield put({type: action.response, event: action.response, payload: payloadResponse, responseBody: action.responseBody});
        }
    } catch (e) {
        yield put({type: "API_ERRORE", payload: e});
    }
}
