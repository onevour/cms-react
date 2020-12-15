import {
    CUTI_APPROVE_ATASAN_SUBMIT, CUTI_APPROVE_ATASAN_SUBMIT_RESPONSE,
    CUTI_APPROVE_PEJABAT_SUBMIT, CUTI_APPROVE_PEJABAT_SUBMIT_RESPONSE, CUTI_CALCULATE_DAY, CUTI_CALCULATE_DAY_RESPONSE,
    CUTI_CANCEL_SUBMIT, CUTI_CANCEL_SUBMIT_RESPONSE,
    CUTI_DAYS,
    CUTI_LOAD_USER, CUTI_LOAD_USER_RESPONSE, CUTI_PAGE, CUTI_PAGE_RESPONSE, CUTI_QUOTA, CUTI_QUOTA_RESPONSE,
    CUTI_SUBMIT, CUTI_SUBMIT_RESPONSE,
    DOCUMENT_PAGE,
    DOCUMENT_PAGE_RESPONSE, GET,
    HOLIDAYS_LOAD,
    HOLIDAYS_LOAD_FUTURE, HOLIDAYS_LOAD_FUTURE_RESPONSE, HOLIDAYS_LOAD_RESPONSE,
    HOLIDAYS_REMOVE, HOLIDAYS_REMOVE_RESPONSE,
    HOLIDAYS_SUBMIT, HOLIDAYS_SUBMIT_RESPONSE, JABATAN_LIST, JABATAN_LIST_RESPONSE,
    POST,
} from "../constants/reducActionTypes";

export function requestCuti(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/cuti/request",
        body: param
    }
    // return {type: CUTI_SUBMIT, payload: payload};
    return {
        type: CUTI_SUBMIT,
        payload: payload,
        method: POST,
        response: CUTI_SUBMIT_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function cutiQuota() {
    const user = JSON.parse(localStorage.getItem('user'))
    let param = {
        nip: user.nip
    }
    const payload = {
        url: "/cuti/quota",
        body: param
    }
    return {
        type: CUTI_QUOTA,
        payload: payload,
        method: POST,
        response: CUTI_QUOTA_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function cancelCuti(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/cuti/cancel",
        body: param
    }
    // console.log("event cancel cuti", payload)
    // return {type: CUTI_CANCEL_SUBMIT, payload: payload}
    return {
        type: CUTI_CANCEL_SUBMIT,
        payload: payload,
        method: POST,
        response: CUTI_CANCEL_SUBMIT_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function approveAtasanCuti(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/cuti/approve/atasan",
        body: param
    }
    // return {type: CUTI_APPROVE_ATASAN_SUBMIT, payload: payload}
    return {
        type: CUTI_APPROVE_ATASAN_SUBMIT,
        payload: payload,
        method: POST,
        response: CUTI_APPROVE_ATASAN_SUBMIT_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function approvePejabatCuti(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/cuti/approve/pejabat",
        body: param
    }
    return {
        type: CUTI_APPROVE_PEJABAT_SUBMIT,
        payload: payload,
        method: POST,
        response: CUTI_APPROVE_PEJABAT_SUBMIT_RESPONSE,
        responseBody: {code: 0, result: null}
    }
    // return {type: CUTI_APPROVE_PEJABAT_SUBMIT, payload: payload};
}

export function calculateDays(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/cuti/day",
        body: param
    }
    // // console.log("cal date action", payload)
    // return {type: CUTI_DAYS, payload: payload};
    return {
        type: CUTI_CALCULATE_DAY,
        payload: payload,
        method: POST,
        response: CUTI_CALCULATE_DAY_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function loadCutiUserLogin() {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: "/cuti/user",
        body: {
            nip: user.nip
        }
    }
    // return {type: CUTI_LOAD_USER_RESPONSE, payload: payload};
    return {
        type: CUTI_LOAD_USER,
        payload: payload,
        method: POST,
        response: CUTI_LOAD_USER_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function loadCutiUserApproval() {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: "/cuti/user/approval",
        body: {
            nip: user.nip
        }
    }
    return {
        type: CUTI_LOAD_USER,
        payload: payload,
        method: POST,
        response: CUTI_LOAD_USER_RESPONSE
    }
}

export function submitDateHoliday(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/cuti/holiday/create",
        body: param
    }
    // return {type: HOLIDAYS_SUBMIT, payload: payload};
    return {
        type: HOLIDAYS_SUBMIT,
        payload: payload,
        method: POST,
        response: HOLIDAYS_SUBMIT_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function removeDateHoliday(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/cuti/holiday/remove",
        body: param
    }
    // return {type: HOLIDAYS_REMOVE, payload: payload};
    return {
        type: HOLIDAYS_REMOVE,
        payload: payload,
        method: POST,
        response: HOLIDAYS_REMOVE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function loadHolidays() {
    const payload = {
        url: "/cuti/holiday/list"
    }
    // return {type: HOLIDAYS_LOAD, payload: payload};
    return {
        type: HOLIDAYS_LOAD,
        payload: payload,
        method: GET,
        response: HOLIDAYS_LOAD_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function loadHolidaysFuture() {
    const payload = {
        url: "/cuti/holiday/future"
    }
    return {
        type: HOLIDAYS_LOAD_FUTURE,
        payload: payload,
        method: GET,
        response: HOLIDAYS_LOAD_FUTURE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function pageUserCuti(param) {
    const payload = {
        url: "/cuti/page",
        body: param
    }
    return {
        type: CUTI_PAGE,
        payload: payload,
        method: POST,
        response: CUTI_PAGE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}