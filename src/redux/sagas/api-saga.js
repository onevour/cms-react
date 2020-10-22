import { takeEvery, call, put } from "redux-saga/effects";
import {LOGIN, LOGIN_RESPONSE} from "../constants/action-types";

export default function* watcherSaga() {
    console.log("watcher saga")
    yield takeEvery("DATA_REQUESTED", workerSaga);
    yield takeEvery(LOGIN, workerSagaLogin);
}

function* workerSagaLogin(action) {
    try {

        const payload = yield call(postData, action.payload);
        console.log("worker login "+JSON.stringify(payload))
        yield put({ type: LOGIN_RESPONSE, payload });
    } catch (e) {
        yield put({ type: "API_ERRORED", payload: e });
    }
}

function* workerSaga(action) {
    try {
        console.log("worker saga")
        const payload = yield call(getData, action.payload.url);
        yield put({ type: "DATA_LOADED", payload });
    } catch (e) {
        yield put({ type: "API_ERRORED", payload: e });
    }
}

function getData(url) {
    return fetch(url).then(response =>
        response.json()
    );
}

function postData(payload) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload.body)
    };
    return fetch(payload.url, requestOptions).then(response =>
        response.json()
    );
}