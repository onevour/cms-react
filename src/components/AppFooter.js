import React, {Component} from "react";

class AppFooter extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid clearfix">
                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                        Copyright © 2020 <a href="#" target="_blank">SphereDevOps</a>. All rights reserved.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                        <i className="mdi mdi-heart text-danger"/>
                    </span>
                </div>
            </footer>
        );
    }
}

export default AppFooter;