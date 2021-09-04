import {takeEvery} from "redux-saga/effects";
import {
    LOGIN,
    LOGOUT,
    USER_PAGE,
    USER_LIST,
    USER_CRUD,
    USER, ROLE_PAGE, ROLE_CRUD,
} from "../constants/reducActionTypes";

import {responseWorker} from "./reduxSagaWorker";

export default function* watcherSaga() {
    yield takeEvery(LOGIN, responseWorker)
    yield takeEvery(LOGOUT, responseWorker)
    yield takeEvery(USER, responseWorker)
    yield takeEvery(USER_PAGE, responseWorker)
    yield takeEvery(USER_CRUD, responseWorker)
    yield takeEvery(USER_LIST, responseWorker)

    yield takeEvery(ROLE_PAGE, responseWorker)
    yield takeEvery(ROLE_CRUD, responseWorker)
}