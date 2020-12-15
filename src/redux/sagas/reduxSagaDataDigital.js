import {call, put} from "redux-saga/effects";
import {
    MASTER_DOCUMENT_RESPONSE,
    USER_DOCUMENT_RESPONSE
} from "../constants/reducActionTypes";
import {getData, postData} from "../../application/ApiRequest";

export function* masterDocument(action) {
    try {
        const payload = yield call(getData, action.payload);
        yield put({type: MASTER_DOCUMENT_RESPONSE, payload});
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}

export function* uploadUserDocument(action) {
    try {
        // console.log(action)
        const payload = yield call(postData, action.payload);
        yield put({type: USER_DOCUMENT_RESPONSE, payload});
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}

export function* userDocument(action) {
    try {
        // console.log(action)
        const payload = yield call(postData, action.payload);
        yield put({type: USER_DOCUMENT_RESPONSE, payload});
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}

export function* removeUserDocument(action) {
    try {
        // console.log(action)
        const payload = yield call(postData, action.payload);
        yield put({type: USER_DOCUMENT_RESPONSE, payload});
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}
