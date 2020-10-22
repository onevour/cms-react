import React, {Component, Fragment} from "react";
import Purchase from "./Purchase";
import Summary from "./Summary";

class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                <Purchase/>
                <Summary/>
            </Fragment>
        );
    }
}

export default Dashboard;