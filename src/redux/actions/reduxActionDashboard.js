import {
    DASHBOARD_JABATAN_JENIS_KELAMIN,
    DASHBOARD_JABATAN_JENIS_KELAMIN_RESPONSE,
    DASHBOARD_JABATAN_NAIK_PANGKAT,
    DASHBOARD_JABATAN_NAIK_PANGKAT_RESPONSE,
    DASHBOARD_JABATAN_PANGKAT,
    DASHBOARD_JABATAN_PANGKAT_RESPONSE,
    DASHBOARD_JABATAN_PENDIDIKAN,
    DASHBOARD_JABATAN_PENDIDIKAN_RESPONSE,
    DASHBOARD_JABATAN_USIA,
    DASHBOARD_JABATAN_USIA_RESPONSE,
    DASHBOARD_JENIS_JABATAN_JENIS_KELAMIN,
    DASHBOARD_JENIS_JABATAN_JENIS_KELAMIN_RESPONSE, DASHBOARD_KODE_JABATAN_JENIS_KELAMIN,
    DASHBOARD_KODE_JABATAN_JENIS_KELAMIN_RESPONSE,
    DASHBOARD_PENSIUN,
    DASHBOARD_PENSIUN_RESPONSE,
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
    POST,
    USER,
    USER_CRUD,
    USER_CRUD_RESPONSE,
    USER_HISTORY_PANGKAT_CRUD,
    USER_HISTORY_PANGKAT_CRUD_RESPONSE,
    USER_HISTORY_PANGKAT_LIST,
    USER_HISTORY_PANGKAT_LIST_RESPONSE,
    USER_LIST,
    USER_LIST_RESPONSE,
    USER_PAGE,
    USER_PAGE_RESPONSE,
    USER_RESPONSE
} from "../constants/reducActionTypes";

export function dashboardKodeJabatanJenisKelamin() {
    const payload = {
        url: "/dashboard/kodejabatanjeniskelamin",
        body: {}
    }
    return {
        type: DASHBOARD_KODE_JABATAN_JENIS_KELAMIN,
        payload: payload,
        method: GET,
        response: DASHBOARD_KODE_JABATAN_JENIS_KELAMIN_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function dashboardJenisJabatanJenisKelamin() {
    const payload = {
        url: "/dashboard/jenisjabatanjeniskelamin",
        body: {}
    }
    return {
        type: DASHBOARD_JENIS_JABATAN_JENIS_KELAMIN,
        payload: payload,
        method: GET,
        response: DASHBOARD_JENIS_JABATAN_JENIS_KELAMIN_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function dashboardJabatanJenisKelamin() {
    const payload = {
        url: "/dashboard/jabatanjeniskelamin",
        body: {}
    }
    return {
        type: DASHBOARD_JABATAN_JENIS_KELAMIN,
        payload: payload,
        method: GET,
        response: DASHBOARD_JABATAN_JENIS_KELAMIN_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function dashboardJabatanNaikPangkat() {
    const payload = {
        url: "/dashboard/naikpangkat",
        body: {}
    }
    return {
        type: DASHBOARD_JABATAN_NAIK_PANGKAT,
        payload: payload,
        method: GET,
        response: DASHBOARD_JABATAN_NAIK_PANGKAT_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function dashboardPensiun() {
    const payload = {
        url: "/dashboard/pensiun",
        body: {}
    }
    return {
        type: DASHBOARD_PENSIUN,
        payload: payload,
        method: GET,
        response: DASHBOARD_PENSIUN_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function dashboardJabatanPendidikan() {
    const payload = {
        url: "/dashboard/jabatanpendidikan",
        body: {}
    }
    return {
        type: DASHBOARD_JABATAN_PENDIDIKAN,
        payload: payload,
        method: GET,
        response: DASHBOARD_JABATAN_PENDIDIKAN_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function dashboardJabatanUsia() {
    const payload = {
        url: "/dashboard/jabatanusia",
        body: {}
    }
    return {
        type: DASHBOARD_JABATAN_USIA,
        payload: payload,
        method: GET,
        response: DASHBOARD_JABATAN_USIA_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}

export function dashboardJabatanPangkat() {
    const payload = {
        url: "/dashboard/jabatanpangkat",
        body: {}
    }
    return {
        type: DASHBOARD_JABATAN_PANGKAT,
        payload: payload,
        method: GET,
        response: DASHBOARD_JABATAN_PANGKAT_RESPONSE,
        responseBody: {code: 0, result: {values: []}}
    }
}
