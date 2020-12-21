import React, {Component,Fragment} from "react";
import {Route} from "react-router-dom";
import Dashboard from "../modules/dashboard/Dashboard";
import User from "../modules/user/User";
import UserRoleForm from "../modules/user/UserRoleForm";
import SampleTable from "../modules/dashboard/SampleTable";

class AppContent extends Component {

    render() {
        return (
            <Fragment>
                <Route path="/dashboard" component={Dashboard} exact/>
                <Route path="/user" component={User} exact/>
                <Route path="/user/update" component={UserRoleForm} exact/>
                <Route path="/sample/table" component={SampleTable} exact/>
            </Fragment>
        )
    }
}

export default AppContent