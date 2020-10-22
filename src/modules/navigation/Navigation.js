import React, {Component} from "react";
import NavItem from "./NavItem";

class Navigation extends Component {

    render() {
        return (
            <ul className="nav">
                <li className="nav-item nav-profile">
                    <div className="nav-link">
                        <div className="user-wrapper">
                            <div className="profile-image">

                            </div>
                            <div className="text-wrapper">
                                <p className="profile-name">Richard V.Welsh</p>
                                <div>
                                    <small className="designation text-muted">Manager</small>
                                    <span className="status-indicator online"></span>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-success btn-block">New Project
                            <i className="mdi mdi-plus"></i>
                        </button>
                    </div>
                </li>
                <NavItem/>
            </ul>
        );
    }
}

export default Navigation;