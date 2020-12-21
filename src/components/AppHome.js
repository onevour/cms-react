import React, {Component, Fragment} from "react";
import {Route} from "react-router-dom";
import Navigation from "../modules/navigation/Navigation";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import User from "../modules/user/User";
import Dashboard from "../modules/dashboard/Dashboard";
import SampleTable from "../modules/dashboard/SampleTable";
import UserRoleForm from "../modules/user/UserRoleForm";

class AppHome extends Component {

    render() {
        return (
            <Fragment>
                <AppHeader/>
                <div className="container-fluid page-body-wrapper">
                    <nav className="sidebar sidebar-offcanvas" id="sidebar">
                        <Navigation/>
                    </nav>
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <Route path="/dashboard" component={Dashboard} exact/>
                            <Route path="/sample/table" component={SampleTable} exact/>
                            <Route path="/user" component={User} exact/>
                            <Route path="/user/update" component={UserRoleForm} exact/>
                        </div>
                        <AppFooter/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AppHome;