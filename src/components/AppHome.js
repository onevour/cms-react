import React, {Component, Fragment} from "react";
import Navigation from "../modules/navigation/Navigation";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppContent from "./AppContent";

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
                            <AppContent/>
                        </div>
                        <AppFooter/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AppHome;