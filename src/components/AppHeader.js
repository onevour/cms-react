import React, {Component, useState} from 'react';
import ReactDOM from 'react-dom'
import {AccessAlarm, Menu} from '@material-ui/icons';

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headerState: 0,
            menuUserClass: "nav-item dropdown d-none d-xl-inline-block",
            menuUserDropdownClass: "dropdown-menu dropdown-menu-right navbar-dropdown",
            user: JSON.parse(localStorage.getItem('user'))
        }
        this.minimizeBNavBody = this.minimizeBNavBody.bind(this)
        this.showMenuUser = this.showMenuUser.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            console.log("outer")
            if ("nav-item dropdown d-none d-xl-inline-block" !== this.state.menuUserClass) {
                this.setState({menuUserClass: "nav-item dropdown d-none d-xl-inline-block"})
                this.setState({menuUserDropdownClass: "dropdown-menu dropdown-menu-right navbar-dropdown"})
            }
        } else console.log("inner")
    }

    minimizeBNavBody() {
        //sidebar-icon-only
        if (document.body.className === "sidebar-icon-only") {
            document.body.className = ""
        } else {
            document.body.className = "sidebar-icon-only"
        }

    }

    showMenuUser() {
        // nav-item dropdown d-none d-xl-inline-block show
        // dropdown-menu dropdown-menu-right navbar-dropdown show
        if ("nav-item dropdown d-none d-xl-inline-block show" === this.state.menuUserClass) {
            this.state.menuUserClass = "nav-item dropdown d-none d-xl-inline-block"
            this.state.menuUserDropdownClass = "dropdown-menu dropdown-menu-right navbar-dropdown"
        } else {
            this.state.menuUserClass = "nav-item dropdown d-none d-xl-inline-block show"
            this.state.menuUserDropdownClass = "dropdown-menu dropdown-menu-right navbar-dropdown show"
        }
        console.log("show menu")
    }

    render() {
        const {user, menuUserClass, menuUserDropdownClass} = this.state
        return (
            <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
                    <a className="navbar-brand brand-logo" href="index.html">

                    </a>
                    <a className="navbar-brand brand-logo-mini" href="index.html">

                    </a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center">
                    <button id="navMenu" className="navbar-toggler navbar-toggler align-self-center" type="button"
                            onClick={this.minimizeBNavBody}
                            data-toggle="minimize">
                        <Menu/>
                    </button>

                    <ul className="navbar-nav navbar-nav-right">

                        <li className={menuUserClass}>
                            <a className="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown"
                               aria-expanded="false"
                               onClick={this.showMenuUser}>
                                <span className="profile-text">{user.nama}</span>
                            </a>
                            <div className={menuUserDropdownClass}
                                 aria-labelledby="UserDropdown">
                                <a className="dropdown-item p-0">
                                    <div className="d-flex border-bottom">
                                        <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                                            <i className="mdi mdi-bookmark-plus-outline mr-0 text-gray"/>
                                        </div>
                                        <div
                                            className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                                            <i className="mdi mdi-account-outline mr-0 text-gray"/>
                                        </div>
                                        <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                                            <i className="mdi mdi-alarm-check mr-0 text-gray"/>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item mt-2">
                                    Manage Accounts
                                </a>
                                <a className="dropdown-item">
                                    Change Password
                                </a>
                                <a className="dropdown-item">
                                    Check Inbox
                                </a>
                                <a className="dropdown-item">
                                    Sign Out
                                </a>
                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                            data-toggle="offcanvas">
                        <span className="icon-menu"></span>
                    </button>
                </div>
            </nav>
        );
    }
}

export default AppHeader;