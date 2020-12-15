export const menuAll = [
    {
        id: 0,
        type: 1,
        name: "Dashboard",
        icon: "menu-icon mdi mdi-account-check",
        path: "/dashboard"
    },
    {
        id: 1,
        type: 2,
        expand: false,
        selected: false,
        name: "Master Data",
        items: [
            {
                id: 2,
                root_id: 1,
                type: 3,
                name: "Document",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/document"
            },
            {
                id: 3,
                root_id: 1,
                type: 3,
                name: "Pangkat",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/pangkat"
            },
            {
                id: 113,
                root_id: 1,
                type: 3,
                name: "Jabatan",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/jabatan"
            }, {
                id: 11,
                root_id: 1,
                type: 3,
                name: "Calendar",
                icon: "menu-icon mdi mdi-calendar",
                path: "/calendar"
            }
        ]
    },
    {
        id: 12,
        type: 2,
        name: "Menu Admin",
        expand: false,
        selected: false,
        items: [
            {
                id: 120,
                root_id: 12,
                type: 3,
                name: "Kenaikan Pangkat",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/pangkat/kenaikan/user"
            },
            {
                id: 121,
                root_id: 12,
                type: 3,
                name: "Document Pending",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/document/pending"
            },
            {
                id: 123,
                root_id: 12,
                type: 3,
                name: "User",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/user"
            },
            {
                id: 124,
                root_id: 12,
                type: 3,
                name: "Pegawai Pensiun",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/user/pensiun"
            },
            {
                id: 125,
                root_id: 12,
                type: 3,
                name: "Pegawai Naik Pangkat",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/user/naikpangkat"
            },
            {
                id: 126,
                root_id: 12,
                type: 3,
                name: "Cuti User",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/cuti/user/admin"
            }
        ]
    },
    {id: 5, type: 1, name: "Profile", icon: "menu-icon mdi mdi-account-card-details", path: "/profile"},
    {id: 6, type: 1, name: "Cuti", icon: "menu-icon mdi mdi-file-image", path: "/cuti"},
    {
        id: 7,
        type: 1,
        name: "Cuti Approval Atasan",
        icon: "menu-icon mdi mdi-account-check",
        path: "/cuti_approval_atasan"
    },
    {
        id: 8,
        type: 1,
        name: "Cuti Approval Pejabat",
        icon: "menu-icon mdi mdi-account-check",
        path: "/cuti_approval_pejabat"
    },
    {
        id: 9,
        type: 1,
        name: "Kenaikan Pangkat",
        icon: "menu-icon mdi mdi-folder-upload",
        path: "/kenaikan_pangkat"
    },
    {id: 10, type: 1, name: "Pensiun", icon: "menu-icon mdi mdi-account-switch", path: "/pensiun"},
    {
        id: 100,
        type: 2,
        expand: false,
        selected: false,
        name: "Report",
        items: [
            {
                id: 13,
                type: 3,
                root_id: 100,
                name: "Peta Jabatan",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/jabatan/map"
            },
            {
                id: 14,
                root_id: 100,
                type: 3,
                name: "Data Pegawai",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/duk"
            },
            {
                id: 15,
                type: 3,
                root_id: 100,
                name: "Cuti Pegawai",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/cuti/user"
            },
        ]
    }
]

export const menuAdmin = [
    {
        id: 1,
        type: 2,
        expand: false,
        selected: false,
        name: "Master Data",
        items: [
            {
                id: 2,
                root_id: 1,
                type: 3,
                name: "Document",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/document"
            },
            {
                id: 3,
                root_id: 1,
                type: 3,
                name: "Pangkat",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/pangkat"
            },
            {
                id: 113,
                root_id: 1,
                type: 3,
                name: "Jabatan",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/jabatan"
            }, {
                id: 11,
                root_id: 1,
                type: 3,
                name: "Calendar",
                icon: "menu-icon mdi mdi-calendar",
                path: "/calendar"
            }
        ]
    },
    {
        id: 12,
        type: 2,
        name: "Menu Admin",
        expand: false,
        selected: false,
        items: [
            {
                id: 120,
                root_id: 12,
                type: 3,
                name: "Kenaikan Pangkat",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/pangkat/kenaikan/user"
            },
            {
                id: 121,
                root_id: 12,
                type: 3,
                name: "Document Pending",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/document/pending"
            },
            {
                id: 123,
                root_id: 12,
                type: 3,
                name: "User",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/user"
            },
            {
                id: 124,
                root_id: 12,
                type: 3,
                name: "Pegawai Pensiun",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/user/pensiun"
            },
            {
                id: 125,
                root_id: 12,
                type: 3,
                name: "User Naik Pangkat",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/user/naikpangkat"
            },
            {
                id: 126,
                root_id: 12,
                type: 3,
                name: "Cuti User",
                icon: "menu-icon mdi mdi-account-card-details",
                path: "/cuti/user/admin"
            }
        ]
    },
    {id: 5, type: 1, name: "Profile", icon: "menu-icon mdi mdi-account-card-details", path: "/profile"},
    {id: 6, type: 1, name: "Cuti", icon: "menu-icon mdi mdi-file-image", path: "/cuti"},
    {
        id: 9,
        type: 1,
        name: "Kenaikan Pangkat",
        icon: "menu-icon mdi mdi-folder-upload",
        path: "/kenaikan_pangkat"
    },
    {
        id: 100,
        type: 2,
        expand: false,
        selected: false,
        name: "Report",
        items: [
            {
                id: 13,
                type: 3,
                root_id: 100,
                name: "Peta Jabatan",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/jabatan/map"
            },
            {
                id: 14,
                root_id: 100,
                type: 3,
                name: "Data Pegawai",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/duk"
            },
            {
                id: 15,
                type: 3,
                root_id: 100,
                name: "Cuti Pegawai",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/cuti/user"
            },
        ]
    }
]

export const menuPejabat = [
    {id: 5, type: 1, name: "Profile", icon: "menu-icon mdi mdi-account-card-details", path: "/profile"},
    {id: 6, type: 1, name: "Cuti", icon: "menu-icon mdi mdi-file-image", path: "/cuti"},
    {
        id: 8,
        type: 1,
        name: "Cuti Approval Pejabat",
        icon: "menu-icon mdi mdi-account-check",
        path: "/cuti_approval_pejabat"
    },
    {
        id: 9,
        type: 1,
        name: "Kenaikan Pangkat",
        icon: "menu-icon mdi mdi-folder-upload",
        path: "/kenaikan_pangkat"
    },
    {id: 10, type: 1, name: "Pensiun", icon: "menu-icon mdi mdi-account-switch", path: "/pensiun"},
    {
        id: 100,
        type: 2,
        expand: false,
        selected: false,
        name: "Report",
        items: [
            {
                id: 13,
                type: 3,
                root_id: 100,
                name: "Peta Jabatan",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/jabatan/map"
            },
            {
                id: 14,
                root_id: 100,
                type: 3,
                name: "Data Pegawai",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/duk"
            },
            {
                id: 15,
                type: 3,
                root_id: 100,
                name: "Cuti Pegawai",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/cuti/user"
            },
        ]
    }
]

export const menuAtasan = [
    {id: 5, type: 1, name: "Profile", icon: "menu-icon mdi mdi-account-card-details", path: "/profile"},
    {id: 6, type: 1, name: "Cuti", icon: "menu-icon mdi mdi-file-image", path: "/cuti"},
    {
        id: 8,
        type: 1,
        name: "Cuti Approval Atasan",
        icon: "menu-icon mdi mdi-account-check",
        path: "/cuti_approval_atasan"
    },
    {
        id: 9,
        type: 1,
        name: "Kenaikan Pangkat",
        icon: "menu-icon mdi mdi-folder-upload",
        path: "/kenaikan_pangkat"
    },
    {id: 10, type: 1, name: "Pensiun", icon: "menu-icon mdi mdi-account-switch", path: "/pensiun"},
    {
        id: 100,
        type: 2,
        expand: false,
        selected: false,
        name: "Report",
        items: [
            {
                id: 13,
                type: 3,
                root_id: 100,
                name: "Peta Jabatan",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/jabatan/map"
            },
            {
                id: 14,
                root_id: 100,
                type: 3,
                name: "Data Pegawai",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/duk"
            },
            {
                id: 15,
                type: 3,
                root_id: 100,
                name: "Cuti Pegawai",
                icon: "menu-icon mdi mdi-file-tree",
                path: "/cuti/user"
            },
        ]
    }
]

export const menuStaf = [
    {id: 5, type: 1, name: "Profile", icon: "menu-icon mdi mdi-account-card-details", path: "/profile"},
    {id: 6, type: 1, name: "Cuti", icon: "menu-icon mdi mdi-file-image", path: "/cuti"},
    {
        id: 9,
        type: 1,
        name: "Kenaikan Pangkat",
        icon: "menu-icon mdi mdi-folder-upload",
        path: "/kenaikan_pangkat"
    },
    {id: 10, type: 1, name: "Pensiun", icon: "menu-icon mdi mdi-account-switch", path: "/pensiun"},
    {id: 13, type: 1, name: "Peta Jabatan", icon: "menu-icon mdi mdi-file-tree", path: "/jabatan/map"}
]

export function renderMenu() {
    return menuAll
    let user = JSON.parse(localStorage.getItem('user'))
    if (!user) return []
    // console.log(user.role)
    if ('PEJABAT PUSAT' === user.role) {
        return menuPejabat
    }
    if ('KEPALA UNIT' === user.role) {
        return menuAtasan
    }
    if ('STAFF ADMIN' === user.role) {
        return menuAdmin
    }
    if ('STAFF' === user.role) {
        return menuStaf
    }
    return []
}