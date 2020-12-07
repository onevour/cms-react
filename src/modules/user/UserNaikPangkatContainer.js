import React, {Component, Fragment} from "react";
import UserNaikPangkatFungsional from "./UserNaikPangkatFungsional";
import {selectedTabClass} from "../../application/AppCommons";
import UserNaikPangkatRegular from "./UserNaikPangkatRegular";

class UserNaikPangkatContainer extends Component {

    constructor(props) {
        super(props);
        require("moment-business-days")
        this.state = {
            tabs: [
                {
                    selected: true,
                    label: "Regular",
                    content: <UserNaikPangkatRegular/>,
                },
                {
                    selected: false,
                    label: "Fungsional",
                    content: <UserNaikPangkatFungsional/>,

                }
            ],
            content: <UserNaikPangkatRegular/>,
        }
    }

    selectedTab(index) {
        var content = null
        const tabs = this.state.tabs.map((val, i) => {
            val.selected = index === i
            if (val.selected) {
                content = val.content;
            }
            return val
        })
        this.setState({tabs: tabs, content: content})
    }

    render() {
        const {content, tabs} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Kenaikan pangkat pegawai</h4>
                                <ul className="nav nav-tabs">
                                    {tabs.map((o, i) =>
                                        <li className="nav-item" key={i}>
                                            <a className={selectedTabClass(o)}
                                               onClick={(e) => {
                                                   e.preventDefault();
                                                   this.selectedTab(i)
                                               }} href="#">{o.label}</a>
                                        </li>
                                    )}
                                </ul>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }

}

export default UserNaikPangkatContainer