import React, {Component, Fragment} from "react";
import {selectedTabClass} from "../../application/AppCommons";
import EmployeeMutasi from "./EmployeeMutasi";
import EmployeePangkat from "./EmployeePangkat";

class EmployeeDataRiwayat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    selected: true,
                    label: "Mutasi",
                    content: <EmployeeMutasi/>,
                },
                {
                    selected: false,
                    label: "Pangkat",
                    content: <EmployeePangkat/>,
                },
                {
                    selected: false,
                    label: "DP3"
                },
                {
                    selected: false,
                    label: "Angka Kredit"
                },
                {
                    selected: false,
                    label: "Satya Lencana"
                },
                {
                    selected: false,
                    label: "Hukuman Disiplin"
                }
            ],
            content: <EmployeeMutasi/>,
            user: JSON.parse(localStorage.getItem('user'))
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
        const {tabs, content} = this.state
        return (
            <div className="card-body">
                <h4 className="card-title">Data Riwayat</h4>
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
        )
    }

}

export default EmployeeDataRiwayat;