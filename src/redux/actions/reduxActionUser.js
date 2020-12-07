import {
    DOCUMENT_CRUD,
    DOCUMENT_CRUD_RESPONSE,
    DOCUMENT_PAGE,
    DOCUMENT_PAGE_RESPONSE,
    GET,
    MASTER_DOCUMENT,
    PANGKAT_DOCUMENT_CRUD,
    PANGKAT_DOCUMENT_CRUD_RESPONSE,
    PANGKAT_PAGE,
    PANGKAT_PAGE_RESPONSE,
    POST, USER, USER_CRUD, USER_CRUD_RESPONSE, USER_HISTORY_PANGKAT_CRUD, USER_HISTORY_PANGKAT_CRUD_RESPONSE,
    USER_HISTORY_PANGKAT_LIST,
    USER_HISTORY_PANGKAT_LIST_RESPONSE,
    USER_LIST,
    USER_LIST_RESPONSE,
    USER_PAGE,
    USER_PAGE_RESPONSE, USER_RESPONSE
} from "../constants/reducActionTypes";

export function listUser(param) {
    const payload = {
        url: "/user/list",
        body: param
    }
    return {
        type: USER_LIST,
        payload: payload,
        method: POST,
        response: USER_LIST_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function pageUser(param) {
    const payload = {
        url: "/user/page",
        body: param
    }
    return {
        type: USER_PAGE,
        payload: payload,
        method: POST,
        response: USER_PAGE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function userUpdateRole(param) {
    const payload = {
        url: "/user/update/role",
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: POST,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function pageUserJabatan(param) {
    const payload = {
        url: "/user/page/jabatan",
        body: param
    }
    return {
        type: USER_PAGE,
        payload: payload,
        method: POST,
        response: USER_PAGE_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function listUserGolongan(param) {
    const payload = {
        url: "/user/list/golongan",
        body: param
    }
    return {
        type: USER_LIST,
        payload: payload,
        method: POST,
        response: USER_LIST_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function listUserHistoryPangkat() {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: "/user/history/pangkat/" + user.nip,
        body: {}
    }
    return {
        type: USER_HISTORY_PANGKAT_LIST,
        payload: payload,
        method: GET,
        response: USER_HISTORY_PANGKAT_LIST_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function addPangkat(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/pangkat/add",
        body: param
    }
    return {
        type: USER_HISTORY_PANGKAT_CRUD,
        payload: payload,
        method: POST,
        response: USER_HISTORY_PANGKAT_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function removePangkat(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: "/user/pangkat/remove",
        body: param
    }
    return {
        type: USER_HISTORY_PANGKAT_CRUD,
        payload: payload,
        method: POST,
        response: USER_HISTORY_PANGKAT_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

// UPDATE PROFILE
export function userProfile() {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url: "/user/profile/" + user.nip,
        body: null
    }
    return {
        type: USER,
        payload: payload,
        method: GET,
        response: USER_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

// UPDATE PROFILE
export function updateProfile(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile",
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: POST,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

// UPDATE SKP
export function updateSKP(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/skp",
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: POST,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function removeSKP(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/skp/remove/" + param.id,
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: GET,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

// UPDATE ANGKA KREDIT
export function updateCredit(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/credit",
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: POST,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function removeCredit(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/credit/remove/" + param.id,
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: GET,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

// UPDATE SATYA LENCANA
export function updateLencana(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/lencana",
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: POST,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function removeLencana(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/lencana/remove/" + param.id,
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: GET,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

// UPDATE HUKUMAN DISIPLIN
export function updateDisiplin(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/disiplin",
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: POST,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function removeDisiplin(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/disiplin/remove/" + param.id,
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: GET,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

// UPDATE PELATIHAN JABATAN
export function updatePelatihan(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/pelatihan",
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: POST,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}

export function removePelatihan(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url: "/user/update/profile/pelatihan/remove/" + param.id,
        body: param
    }
    return {
        type: USER_CRUD,
        payload: payload,
        method: GET,
        response: USER_CRUD_RESPONSE,
        responseBody: {code: 0, result: null}
    }
}