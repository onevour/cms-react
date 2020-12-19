import React, {Component} from "react";
import {selectedTabClass} from "../../../application/AppCommons";
import ViewEmployeeMutasi from "./ViewEmployeeMutasi";
import ViewEmployeePangkat from "./ViewEmployeePangkat";
import ViewEmployeeSKP from "./ViewEmployeeSKP";
import ViewEmployeeCredit from "./ViewEmployeeCredit";
import ViewEmployeeLencana from "./ViewEmployeeLencana";
import ViewEmployeePelatihan from "./ViewEmployeePelatihan";
import ViewEmployeeDisplin from "./ViewEmployeeDisiplin";

class ViewEmployeeDataRiwayat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    selected: true,
                    label: "Mutasi",
                    content: <ViewEmployeeMutasi/>,
                },
                {
                    selected: false,
                    label: "Pangkat",
                    content: <ViewEmployeePangkat/>,

                },
                {
                    selected: false,
                    label: "SKP",
                    content: <ViewEmployeeSKP/>,
                },
                {
                    selected: false,
                    label: "Angka Kredit",
                    content: <ViewEmployeeCredit/>,
                },
                {
                    selected: false,
                    label: "Satya Lencana",
                    content: <ViewEmployeeLencana/>,
                },
                {
                    selected: false,
                    label: "Hukuman Disiplin",
                    content: <ViewEmployeeDisplin/>
                },
                {
                    selected: false,
                    label: "Pelatihan Jabatan",
                    content: <ViewEmployeePelatihan type={1}/>
                },
                {
                    selected: false,
                    label: "Pelatihan Teknis",
                    content: <ViewEmployeePelatihan type={2}/>
                }
            ],
            content: <ViewEmployeeMutasi/>,
            user: JSON.parse(localStorage.getItem('user-view'))
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

export default ViewEmployeeDataRiwayat;