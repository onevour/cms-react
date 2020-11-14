import {
    CUTI_APPROVE_ATASAN_SUBMIT, CUTI_APPROVE_PEJABAT_SUBMIT, CUTI_CANCEL_SUBMIT, CUTI_DAYS, CUTI_LOAD_USER,
    CUTI_SUBMIT, HOLIDAYS_LOAD, HOLIDAYS_LOAD_FUTURE, HOLIDAYS_REMOVE, HOLIDAYS_SUBMIT,
} from "../constants/reducActionTypes";

export function requestCuti(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url:  "/cuti/request",
        body: param
    }
    return {type: CUTI_SUBMIT, payload: payload};
}

export function cancelCuti(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url:  "/cuti/cancel",
        body: param
    }
    console.log("event cancel cuti", payload)
    return {type: CUTI_CANCEL_SUBMIT, payload: payload};
}

export function approveAtasanCuti(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url:  "/cuti/approve/atasan",
        body: param
    }
    return {type: CUTI_APPROVE_ATASAN_SUBMIT, payload: payload};
}

export function approvePejabatCuti(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url:  "/cuti/approve/pejabat",
        body: param
    }
    return {type: CUTI_APPROVE_PEJABAT_SUBMIT, payload: payload};
}

export function calculateDays(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url:  "/cuti/day",
        body: param
    }
    // console.log("cal date action", payload)
    return {type: CUTI_DAYS, payload: payload};
}

export function loadCutiUserLogin() {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url:  "/cuti/user",
        body: {
            nip: user.nip
        }
    }
    return {type: CUTI_LOAD_USER, payload: payload};
}

export function submitDateHoliday(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url:  "/cuti/holiday/create",
        body: param
    }
    return {type: HOLIDAYS_SUBMIT, payload: payload};
}

export function removeDateHoliday(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url:  "/cuti/holiday/remove",
        body: param
    }
    return {type: HOLIDAYS_REMOVE, payload: payload};
}

export function loadHolidays() {
    const payload = {
        url:  "/cuti/holiday/list"
    }
    return {type: HOLIDAYS_LOAD, payload: payload};
}

export function loadHolidaysFuture() {
    const payload = {
        url:  "/cuti/holiday/future"
    }
    return {type: HOLIDAYS_LOAD_FUTURE, payload: payload};
}