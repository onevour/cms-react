export const MAX_PENSIUN = 58


export const STATUS_PEGAWAI = [
    {
        value: 0,
        label: "ALL"
    }, {
        value: 1,
        label: "AKTIF"
    }, {
        value: 2,
        label: "NON AKTIF"
    }
]

// CUTI
export const JENIS_CUTI = [
    {
        value: 1,
        label: "TAHUNAN"
    },
    {
        value: 2,
        label: "BESAR"
    },
    {
        value: 3,
        label: "SAKIT"
    },
    {
        value: 4,
        label: "MELAHIRKAN"
    },
    {
        value: 5,
        label: "ALASAN PENTING"
    },
    {
        value: 6,
        label: "LUAR TANGGUNGAN NEGARA"
    }
]

export const emptyCrud = {
    code: 0,
    result : null
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