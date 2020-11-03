import React, {Component, useState} from 'react';
import ReactDOM from 'react-dom'
import {AccessAlarm, Menu} from '@material-ui/icons';
import {Redirect, useHistory} from "react-router-dom";

import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {login, logout} from "../redux/actions";

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: 0,
            headerState: 0,
            menuUserClass: "nav-item dropdown d-none d-xl-inline-block",
            menuUserDropdownClass: "dropdown-menu dropdown-menu-right navbar-dropdown",
            user: JSON.parse(localStorage.getItem('user'))
        }
        this.minimizeBNavBody = this.minimizeBNavBody.bind(this)
        this.showMenuUser = this.showMenuUser.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.logout = this.logout.bind(this);
        this.state.isLogin = (this.state.user === null ? 0 : 1)
        document.body.className = "sidebar-icon-only"
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    logout(e) {
        e.preventDefault()
        localStorage.removeItem('user')
        this.props.logout({});
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        // event.preventDefault()
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            // console.log("outer, hide " + this.state.user)
            if ("nav-item dropdown d-none d-xl-inline-block" !== this.state.menuUserClass) {
                this.setState({menuUserClass: "nav-item dropdown d-none d-xl-inline-block"})
                this.setState({menuUserDropdownClass: "dropdown-menu dropdown-menu-right navbar-dropdown"})
                console.log("hide menu profile")
            }
        } else console.log("inner")
        return true
    }

    minimizeBNavBody() {
        if (document.body.className === "sidebar-icon-only") {
            document.body.className = ""
        } else {
            document.body.className = "sidebar-icon-only"
        }
    }

    showMenuUser(e) {
        e.preventDefault()
        if ("nav-item dropdown d-none d-xl-inline-block show" === this.state.menuUserClass) {
            this.setState({menuUserClass: "nav-item dropdown d-none d-xl-inline-block"})
            this.setState({menuUserDropdownClass: "dropdown-menu dropdown-menu-right navbar-dropdown"})
        } else {
            this.setState({menuUserClass: "nav-item dropdown d-none d-xl-inline-block show"})
            this.setState({menuUserDropdownClass: "dropdown-menu dropdown-menu-right navbar-dropdown show"})
        }
        console.log("show menu")
    }

    render() {
        const {loginResponse} = this.props
        const {isLogin, user, menuUserClass, menuUserDropdownClass} = this.state
        console.log("login redux : ", loginResponse)
        if (loginResponse && loginResponse.code && loginResponse.code === 401) {
            return (
                <Redirect to='/'/>
            )
        } else {

            return (
                <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
                        <a className="navbar-brand brand-logo" href="index.html">
                            {isLogin}
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
                                <a className="nav-link dropdown-toggle" id="UserDropdown" href="#"
                                   data-toggle="dropdown"
                                   aria-expanded="false"
                                   onClick={this.showMenuUser}>
                                    <span className="profile-text">{user.username}</span>
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
                                    <a className="dropdown-item" onClick={this.logout}>
                                        Sign Out
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                                type="button"
                                data-toggle="offcanvas">
                            <span className="icon-menu"/>
                        </button>
                    </div>
                </nav>
            )
        }
    }
}

function mapStateToProps(state) {

    return {
        loginResponse: state.loginResponse
    }

}

// export default AppHeader;
export default connect(mapStateToProps, {logout})(AppHeader);