import {takeEvery, call, put} from "redux-saga/effects";
import {
    LOGIN,
    LOGIN_RESPONSE,
    LOGOUT,
    LOGOUT_RESPONSE,
    CUTI_SUBMIT,
    CUTI_SUBMIT_RESPONSE, CUTI_LOAD_USER, CUTI_LOAD_USER_RESPONSE
} from "../constants/action-types";

export default function* watcherSaga() {
    console.log("watcher saga")
    yield takeEvery("DATA_REQUESTED", workerSaga);
    yield takeEvery(LOGIN, workerSagaLogin);
    yield takeEvery(LOGOUT, workerSagaLogout);
    yield takeEvery(CUTI_SUBMIT, workerSagaSubmitCuti);
    yield takeEvery(CUTI_LOAD_USER, workerSagaLoadCuti);
}

function* workerSagaLogin(action) {
    try {

        const payload = yield call(postData, action.payload);
        yield put({type: LOGIN_RESPONSE, payload});
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}

function* workerSagaLogout(action) {
    try {
        const payload = {code: 401}
        yield put({type: LOGOUT_RESPONSE, payload});
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}

function* workerSagaSubmitCuti(action) {
    try {
        const payload = yield call(postData, action.payload);
        yield put({type: CUTI_SUBMIT_RESPONSE, payload});
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}

function* workerSagaLoadCuti(action) {
    try {
        const payload = yield call(postData, action.payload);
        yield put({type: CUTI_LOAD_USER_RESPONSE, payload});
        console.log("load cuti from saga")
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}

function* workerSaga(action) {
    try {
        console.log("worker saga")
        const payload = yield call(getData, action.payload.url);
        yield put({type: "DATA_LOADED", payload});
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload.body)
    };
    return fetch(payload.url, requestOptions).then(response =>
        response.json()
    );
}