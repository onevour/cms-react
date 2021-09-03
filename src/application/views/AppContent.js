import React, {Component,Fragment} from "react";
import {Route} from "react-router-dom";
import Dashboard from "../../modules/dashboard/Dashboard";
import SampleTable from "../../modules/dashboard/SampleTable";
import UserTable from "../../modules/user/UserTable";
import UserForm from "../../modules/user/UserForm";

class AppContent extends Component {

    render() {
        return (
            <Fragment>
                <Route path="/dashboard" component={Dashboard} exact/>
                <Route path="/user" component={UserTable} exact/>
                <Route path="/user/form" component={UserForm} exact/>
                <Route path="/sample/table" component={SampleTable} exact/>
            </Fragment>
        )
    }
}

export default AppContent