import {call, put} from "redux-saga/effects"
import {
    GET,
    POST
} from "../constants/reducActionTypes"
import {getData, postData} from "../../../commons/http/ApiRequest"

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
    } catch (e) {
        yield put({type: "API_ERROR", payload: e})
    }
}
