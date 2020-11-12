import React, {Component} from "react";
import {Link, Router} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AccessAlarm, ThreeDRotation} from '@material-ui/icons';

class NavItem extends Component {

    constructor() {
        super();
        this.state = {
            navigation: [
                {name: "Profile", icon: "menu-icon mdi mdi-account-card-details", path: "/employee"},
                {name: "Cuti", icon: "menu-icon mdi mdi-file-image", path: "/cuti"},
                {
                    name: "Cuti Approval Atasan",
                    icon: "menu-icon mdi mdi-account-check",
                    path: "/cuti_approval_atasan"
                },
                {
                    name: "Cuti Approval Pejabat",
                    icon: "menu-icon mdi mdi-account-check",
                    path: "/cuti_approval_pejabat"
                },
                {name: "Kenaikan Pangkat", icon: "menu-icon mdi mdi-folder-upload", path: "/kenaikan_pangkat"},
                {name: "Pensiun", icon: "menu-icon mdi mdi-account-switch", path: "/pensiun"},
                {name: "Calendar", icon: "menu-icon mdi mdi-calendar", path: "/calendar"},
            ]
        }
    }

    menuTemplate(item, index) {
        return (
            <li className="nav-item" key={index}>
                <Link className="nav-link" to={item.path}>
                    <i className={item.icon}/> <span
                    className="menu-title menu-title-nav">{item.name}</span>
                </Link>
            </li>
        );
    }

    render() {
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

NavItem.contextTypes = {
    router: PropTypes.object
};

export default NavItem;