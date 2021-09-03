import {call, put} from "redux-saga/effects"
import {
    DELETE,
    GET,
    POST, PUT
} from "../constants/reducActionTypes"
import {deleteData, getData, postData, putData} from "../../../commons/http/ApiRequest"

export function* responseWorker(action) {
    try {
        if (GET === action.method) {
            const payloadResponse = yield call(getData, action.payload)
            yield put({
                type: action.response,
                event: action.response,
                payload: payloadResponse,
                responseBody: action.responseBody
            })
        }
        if (POST === action.method) {
            const payloadResponse = yield call(postData, action.payload)
            yield put({
                type: action.response,
                event: action.response,
                payload: payloadResponse,
                responseBody: action.responseBody
            })
        }
        if (PUT === action.method) {
            const payloadResponse = yield call(putData, action.payload)
            yield put({
                type: action.response,
                event: action.response,
                payload: payloadResponse,
                responseBody: action.responseBody
            })
        }
        if (DELETE === action.method) {
            const payloadResponse = yield call(deleteData, action.payload)
            yield put({
                type: action.response,
                event: action.response,
                payload: payloadResponse,
                responseBody: action.responseBody
            })
        }
    } catch (e) {
        yield put({type: "API_ERROR", payload: e})
    }
}
