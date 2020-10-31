import {takeEvery, call, put} from "redux-saga/effects";
import {
    LOGIN,
    LOGIN_RESPONSE,
    LOGOUT,
    LOGOUT_RESPONSE,
    CUTI_SUBMIT,
    CUTI_SUBMIT_RESPONSE,
    CUTI_LOAD_USER,
    CUTI_LOAD_USER_RESPONSE,
    HOLIDAYS_LOAD,
    HOLIDAYS_LOAD_RESPONSE,
    HOLIDAYS_SUBMIT,
    HOLIDAYS_REMOVE,
    HOLIDAYS_SUBMIT_RESPONSE,
    HOLIDAYS_REMOVE_RESPONSE,
    CUTI_CANCEL_SUBMIT,
    CUTI_UPDATE_RESPONSE, CUTI_APPROVE_PEJABAT_SUBMIT, CUTI_APPROVE_ATASAN_SUBMIT
} from "../constants/action-types";

export default function* watcherSaga() {
    console.log("watcher saga")
    yield takeEvery("DATA_REQUESTED", workerSaga);
    yield takeEvery(LOGIN, workerSagaLogin);
    yield takeEvery(LOGOUT, workerSagaLogout);
    yield takeEvery(CUTI_SUBMIT, workerSagaCuti);
    yield takeEvery(CUTI_CANCEL_SUBMIT, workerSagaCuti);
    yield takeEvery(CUTI_APPROVE_ATASAN_SUBMIT, workerSagaCuti);
    yield takeEvery(CUTI_APPROVE_PEJABAT_SUBMIT, workerSagaCuti);
    yield takeEvery(CUTI_LOAD_USER, workerSagaCuti);
    yield takeEvery(HOLIDAYS_SUBMIT, workerSagaLoadHolidays);
    yield takeEvery(HOLIDAYS_REMOVE, workerSagaLoadHolidays);
    yield takeEvery(HOLIDAYS_LOAD, workerSagaLoadHolidays);
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

function* workerSagaCuti(action) {
    try {
        if (CUTI_SUBMIT === action.type) {
            const payload = yield call(postData, action.payload);
            yield put({type: CUTI_SUBMIT_RESPONSE, payload});
        }
        if (CUTI_LOAD_USER === action.type) {
            const payload = yield call(postData, action.payload);
            yield put({type: CUTI_LOAD_USER_RESPONSE, payload});
        }
        if (CUTI_CANCEL_SUBMIT === action.type
            || CUTI_APPROVE_PEJABAT_SUBMIT === action.type
            || CUTI_APPROVE_ATASAN_SUBMIT === action.type
        ) {
            console.log("api request", action.payload)
            const payload = yield call(postData, action.payload);
            yield put({type: CUTI_UPDATE_RESPONSE, payload});
        }
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}


function* workerSagaLoadHolidays(action) {
    try {
        if (HOLIDAYS_SUBMIT === action.type) {
            const payload = yield call(postData, action.payload);
            yield put({type: HOLIDAYS_SUBMIT_RESPONSE, payload});
        }
        if (HOLIDAYS_REMOVE === action.type) {
            const payload = yield call(postData, action.payload);
            yield put({type: HOLIDAYS_REMOVE_RESPONSE, payload});
        }
        if (HOLIDAYS_LOAD === action.type) {
            const payload = yield call(getData, action.payload);
            yield put({type: HOLIDAYS_LOAD_RESPONSE, payload});
        }
        console.log("load holiday from saga", action.type)
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

function getData(payload) {
    return fetch(payload.url).then(response =>
        response.json()
    );
}

function postData(payload) {
    console.log(payload.url)
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload.body)
    };
    return fetch(payload.url, requestOptions).then(response =>
        response.json()
    );
}