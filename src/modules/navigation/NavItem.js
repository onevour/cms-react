import React, {Component} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class NavItem extends Component {

    constructor() {
        super();
        this.state = {
            navigation: [
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
                            id: 13,
                            root_id: 12,
                            type: 3,
                            name: "Kenaikan Pegawai",
                            icon: "menu-icon mdi mdi-account-card-details",
                            path: "/pangkat/kenaikan/pegawai"
                        },
                        {
                            id: 14,
                            root_id: 12,
                            type: 3,
                            name: "Profile",
                            icon: "menu-icon mdi mdi-account-card-details",
                            path: "/employee"
                        }
                    ]
                },
                {id: 4, type: 1, name: "Document", icon: "menu-icon mdi mdi-account-card-details", path: "/document"},
                {id: 5, type: 1, name: "Profile", icon: "menu-icon mdi mdi-account-card-details", path: "/employee"},
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
                {id: 11, type: 1, name: "Calendar", icon: "menu-icon mdi mdi-calendar", path: "/calendar"},
                {id: 13, type: 1, name: "Calendar", icon: "menu-icon mdi mdi-calendar", path: "/jabatan/map"},

            ]
        }
    }

    selectedMenu(menusSelected) {
        if (menusSelected.type === 1) {
            this.state.navigation.map((menu, i) => {
                if (menu.type === 2) {
                    menu.expand = false
                    menu.selected = false
                    menu.items.map((subMenu, i) => {
                        subMenu.selected = false
                    })
                } else {
                    menu.selected = menusSelected.id === menu.id
                }
            })

        }
        if (menusSelected.type === 2) {
            // menusSelected.expand = !(menusSelected.expand)
            this.state.navigation.map((menu, i) => {
                const isEqual = menusSelected.id === menu.id
                if (menu.type === 2) {
                    if (isEqual) {
                        menu.expand = !(menu.expand)
                    } else {
                        menu.expand = false
                    }
                }

            })
        }
        if (menusSelected.type === 3) {
            menusSelected.selected = true
            this.state.navigation.map((menu, i) => {
                if (menu.type === 2) {
                    // selected root
                    const isEqual = menusSelected.root_id === menu.id
                    menu.expand = isEqual
                    menu.selected = isEqual
                    // sub menu
                    menu.items.map((subMenu, i) => {
                        const isEqual = menusSelected.id === subMenu.id
                        subMenu.selected = isEqual
                        // if(super)
                    })
                } else {
                    menu.selected = false
                }
            })
        }

    }

    menuTemplate(menu, index) {
        // root single menu
        if (menu.type === 1) {
            const show = (menu.selected ? 'nav-item active' : 'nav-item')
            const showLink = (menu.selected ? 'nav-link active' : 'nav-link')
            return (
                <li className={show} key={index}>
                    <Link className={showLink} to={menu.path} onClick={() => {
                        this.selectedMenu(menu)
                    }}>
                        <i className={menu.icon}/> <span
                        className="menu-title menu-title-nav">{menu.name}</span>
                    </Link>
                </li>
            );
        }
        // root menu has child
        if (menu.type === 2) {
            const show = (menu.expand ? 'collapse show' : 'collapse')
            const showLink = (menu.selected ? 'nav-item active' : 'nav-item')
            return (
                <li className={showLink} key={index}>
                    <a className="nav-link" data-toggle="collapse" href="#" aria-expanded={menu.selected}
                       onClick={() => {
                           this.selectedMenu(menu)
                       }}
                       aria-controls="ui-basic">
                        <i className="menu-icon mdi mdi-content-copy"/>
                        <span className="menu-title">{menu.name}</span>
                        <i className="menu-arrow"/>
                    </a>
                    <div className={show}>
                        <ul className="nav flex-column sub-menu">
                            {
                                menu.items.map((menuSub, indexSub) => {
                                    return this.menuTemplate(menuSub, indexSub);
                                })
                            }
                        </ul>
                    </div>
                </li>
            )
        }
        // sub
        if (menu.type === 3) {
            const show = (menu.selected ? 'nav-item active' : 'nav-item')
            const showLink = (menu.selected ? 'nav-link active' : 'nav-link')
            return (
                <li className={show} key={index}>
                    <Link className={showLink} to={menu.path} onClick={() => {
                        this.selectedMenu(menu)
                    }}>
                        <i className={menu.icon}/> <span
                        className="menu-title menu-title-nav">{menu.name}</span>
                    </Link>
                </li>
            )
        }
    }

    render() {
        const {navigation} = this.state
        return (
            <>
                {
                    this.state.navigation.map((item, index) => {
                        return this.menuTemplate(item, index);
                    })
                }
            </>

        );
    }
}

NavItem
    .contextTypes = {
    router: PropTypes.object
};

export default NavItem;