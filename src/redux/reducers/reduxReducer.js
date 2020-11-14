import loginCutiReducer from "./reduxReducerCuti";
import dataDigitalReducer from "./reduxReducerDataDigital";
import {documentTypeReducer} from "./reduxReducerDocumentType";

const initialState = {
    loginResponse: {code: 0},
    cutiResponse: {code: 0},
    cutiDaysResponse: {code: 0, result: 0},
    cutiUserResponse: {code: 0, result: []},
    cutiUpdateResponse: {code: 0},
    holidaySubmitResponse: {code: 0},
    holidayRemoveResponse: {code: 0},
    holidaysResponse: {code: 0, result: []},
    masterDocument: {code: 0, result: []},
    uploadDocument: {code: 0, result: []},
    userDocument: {code: 0, result: []}
};

function rootReducer(state = initialState, action) {
    state = loginCutiReducer(state, action)
    state = dataDigitalReducer(state, action)
    state = documentTypeReducer(state, action)
    return state;
}

export default rootReducer;