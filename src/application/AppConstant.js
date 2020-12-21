export const ROLES = [
    {
        "value": "STAFF",
        "label": "STAFF",
        "description": "Pegawai"
    },
    {
        "value": "STAFF ADMIN",
        "label": "STAFF ADMIN",
        "description": "Super Admin"
    },
    {
        "value": "KEPALA SUB UNIT",
        "label": "KEPALA SUB UNIT",
        "description": "Admin Satker Simpeg"
    },
    {
        "value": "KEPALA UNIT",
        "label": "KEPALA UNIT",
        "description": "Admin Satker Presensi"
    }
]

export const MONTHS = [
    {
        value: 1,
        label: "Januari"
    }, {
        value: 2,
        label: "Februari"
    }, {
        value: 3,
        label: "Maret"
    }, {
        value: 4,
        label: "April"
    }, {
        value: 5,
        label: "Mei"
    }, {
        value: 6,
        label: "Juni"
    }, {
        value: 7,
        label: "Juli"
    }, {
        value: 8,
        label: "Agustus"
    }, {
        value: 9,
        label: "September"
    }, {
        value: 10,
        label: "Oktober"
    }, {
        value: 11,
        label: "November"
    }, {
        value: 12,
        label: "Desember"
    }
]

export const emptyCrud = {
    code: 0,
    result: null
}

export const emptyContentList = {
    code: 0, result: []
}

export const emptyContentPage = {
    code: 0, result: {
        values: [], element_total: 0,
        page: 0,
        page_total: 1,
        empty: false,
        first: true,
        last: true
    }
}

export function defCrud(state, key) {
    return state[key] ? state[key] : emptyCrud
}

export function defList(state, key) {
    return state[key] ? state[key] : emptyContentList
}

export function defPage(state, key) {
    return state[key] ? state[key] : emptyContentPage
}