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
    CUTI_UPDATE_RESPONSE,
    CUTI_APPROVE_PEJABAT_SUBMIT,
    CUTI_APPROVE_ATASAN_SUBMIT,
    CUTI_DAYS,
    CUTI_DAYS_RESPONSE,
    HOLIDAYS_LOAD_FUTURE,
    MASTER_DOCUMENT,
    UPLOAD_DOCUMENT,
    USER_DOCUMENT,
    REMOVE_DOCUMENT,
    DOCUMENT_PAGE,
    DOCUMENT_CRUD,
    PANGKAT_PAGE,
    DOCUMENT_LIST,
    PANGKAT_DOCUMENT_CRUD,
    USER_PAGE,
    USER_LIST,
    USER_HISTORY_PANGKAT_LIST,
    USER_HISTORY_PANGKAT_CRUD,
    JABATAN_LIST,
    JABATAN_PAGE,
    JABATAN_CRUD,
    DUK_PAGE,
    DUK_LIST,
    CUTI_PAGE,
    CUTI_QUOTA,
    DUK_FILTER_PARAM,
    USER_CRUD,
    USER,
    CUTI_CALCULATE_DAY,
    DASHBOARD_JENIS_JABATAN_JENIS_KELAMIN,
    DASHBOARD_JABATAN_JENIS_KELAMIN,
    DASHBOARD_JABATAN_NAIK_PANGKAT,
    DASHBOARD_JABATAN_PENDIDIKAN,
    DASHBOARD_JABATAN_USIA, DASHBOARD_JABATAN_PANGKAT, DASHBOARD_PENSIUN
} from "../constants/reducActionTypes";

import {getData, postData} from "../../application/ApiRequest";
import {masterDocumentType} from "./reduxSagaDocumentType";

export default function* watcherSaga() {
    yield takeEvery("DATA_REQUESTED", workerSaga);
    yield takeEvery(LOGIN, masterDocumentType);
    yield takeEvery(LOGOUT, masterDocumentType);
    yield takeEvery(CUTI_SUBMIT, masterDocumentType);
    yield takeEvery(CUTI_CALCULATE_DAY, masterDocumentType);
    yield takeEvery(CUTI_CANCEL_SUBMIT, masterDocumentType);
    yield takeEvery(CUTI_APPROVE_ATASAN_SUBMIT, masterDocumentType);
    yield takeEvery(CUTI_APPROVE_PEJABAT_SUBMIT, masterDocumentType);
    yield takeEvery(CUTI_DAYS, masterDocumentType);
    yield takeEvery(CUTI_LOAD_USER, masterDocumentType);
    // holidays
    yield takeEvery(HOLIDAYS_SUBMIT, masterDocumentType);
    yield takeEvery(HOLIDAYS_REMOVE, masterDocumentType);
    yield takeEvery(HOLIDAYS_LOAD, masterDocumentType);
    yield takeEvery(HOLIDAYS_LOAD_FUTURE, masterDocumentType);
    // pisah file
    yield takeEvery(MASTER_DOCUMENT, masterDocumentType);
    yield takeEvery(UPLOAD_DOCUMENT, masterDocumentType);
    yield takeEvery(USER_DOCUMENT, masterDocumentType);
    yield takeEvery(REMOVE_DOCUMENT, masterDocumentType);

    // document
    yield takeEvery(DOCUMENT_LIST, masterDocumentType);
    yield takeEvery(DOCUMENT_PAGE, masterDocumentType);
    yield takeEvery(DOCUMENT_CRUD, masterDocumentType);

    // jabatan
    yield takeEvery(JABATAN_LIST, masterDocumentType);
    yield takeEvery(JABATAN_PAGE, masterDocumentType);
    yield takeEvery(JABATAN_CRUD, masterDocumentType);

    // duk
    yield takeEvery(DUK_LIST, masterDocumentType);
    yield takeEvery(DUK_PAGE, masterDocumentType);
    yield takeEvery(DUK_FILTER_PARAM, masterDocumentType);

    // cuti
    yield takeEvery(CUTI_QUOTA, masterDocumentType);
    yield takeEvery(CUTI_PAGE, masterDocumentType);

    // pangkat
    yield takeEvery(PANGKAT_PAGE, masterDocumentType);
    yield takeEvery(PANGKAT_DOCUMENT_CRUD, masterDocumentType);
    yield takeEvery(USER, masterDocumentType);
    yield takeEvery(USER_PAGE, masterDocumentType);
    yield takeEvery(USER_CRUD, masterDocumentType);
    yield takeEvery(USER_LIST, masterDocumentType);
    yield takeEvery(USER_HISTORY_PANGKAT_CRUD, masterDocumentType);
    yield takeEvery(USER_HISTORY_PANGKAT_LIST, masterDocumentType);

    // dashboard
    yield takeEvery(DASHBOARD_JENIS_JABATAN_JENIS_KELAMIN, masterDocumentType)
    yield takeEvery(DASHBOARD_JABATAN_JENIS_KELAMIN, masterDocumentType)
    yield takeEvery(DASHBOARD_JABATAN_NAIK_PANGKAT, masterDocumentType)
    yield takeEvery(DASHBOARD_JABATAN_PENDIDIKAN, masterDocumentType)
    yield takeEvery(DASHBOARD_JABATAN_USIA, masterDocumentType)
    yield takeEvery(DASHBOARD_JABATAN_PANGKAT, masterDocumentType)
    yield takeEvery(DASHBOARD_PENSIUN, masterDocumentType)
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
        if (CUTI_DAYS === action.type) {
            const payload = yield call(postData, action.payload);
            yield put({type: CUTI_DAYS_RESPONSE, payload});
        }
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
            // // console.log("api request", action.payload)
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
        if (HOLIDAYS_LOAD === action.type || HOLIDAYS_LOAD_FUTURE === action.type) {
            const payload = yield call(getData, action.payload);
            yield put({type: HOLIDAYS_LOAD_RESPONSE, payload});
        }
        // // console.log("load holiday from saga", action.type)
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}

function* workerSaga(action) {
    try {
        // // console.log("worker saga")
        const payload = yield call(getData, action.payload.url);
        yield put({type: "DATA_LOADED", payload});
    } catch (e) {
        yield put({type: "API_ERRORED", payload: e});
    }
}
