import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppHome from "./AppHome";

class AppRouting extends Component {

    render() {
        return (
            <div className="container-scroller">
                <BrowserRouter>
                    <Switch>
                        <AppHome/>
                        <Route component={Error}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default AppRouting