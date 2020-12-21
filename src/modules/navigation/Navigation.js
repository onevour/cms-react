import React, {Component} from "react";
import NavItem from "./NavItem";

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    render() {
        const {user} = this.state
        return (
            <ul className="nav">
                <li className="nav-item nav-profile">
                    <div className="nav-link">
                        <div className="user-wrapper">
                            <div className="profile-image">
                                <img className="img-fluid"
                                     src={user.picture}
                                     alt=""/>
                            </div>
                            <div className="text-wrapper">
                                <p className="profile-name">{user.nama}</p>
                                <div>
                                    <small className="designation text-muted">{user.jabatan}</small>
                                    <span className="status-indicator online"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <NavItem/>
            </ul>
        );
    }
}

export default Navigation;