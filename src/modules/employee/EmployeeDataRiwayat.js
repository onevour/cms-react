import React, {Component, Fragment} from "react";
import {selectedTabClass} from "../../application/AppCommons";

class EmployeeDataRiwayat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    selected: true,
                    label: "Mutasi"
                },
                {
                    selected: false,
                    label: "Jabatan"
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
            ]
        }
    }

    selectedTab(index) {
        this.setState({
            tabs: this.state.tabs.map((val, i) => {
                val.selected = index === i
                return val
            })
        })
    }

    render() {
        const {tabs} = this.state
        return (
            <div className="card-body">
                <h4 className="card-title">Data Riwayat</h4>
                <ul className="nav nav-tabs">
                    {tabs.map((o, i) =>
                        <li className="nav-item">
                            <a className={selectedTabClass(o)}
                               onClick={(e) => {
                                   e.preventDefault();
                                   this.selectedTab(i)
                               }} href="#">{o.label}</a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

}

export default EmployeeDataRiwayat;