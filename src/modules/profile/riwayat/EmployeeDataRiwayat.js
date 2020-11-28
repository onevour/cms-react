import React, {Component} from "react";
import {selectedTabClass} from "../../../application/AppCommons";
import EmployeeMutasi from "./EmployeeMutasi";
import EmployeePangkat from "./EmployeePangkat";
import EmployeeSKP from "./EmployeeSKP";
import EmployeeCredit from "./EmployeeCredit";
import EmployeeSatyaLencanaForm from "../form/EmployeeSatyaLencanaForm";
import EmployeeLencana from "./EmployeeLencana";
import EmployeeDisplin from "./EmployeeDisiplin";
import EmployeePelatihan from "./EmployeePelatihan";

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
                    label: "SKP",
                    content: <EmployeeSKP/>,
                },
                {
                    selected: false,
                    label: "Angka Kredit",
                    content: <EmployeeCredit/>,
                },
                {
                    selected: false,
                    label: "Satya Lencana",
                    content: <EmployeeLencana/>,
                },
                {
                    selected: false,
                    label: "Hukuman Disiplin",
                    content: <EmployeeDisplin/>
                },
                {
                    selected: false,
                    label: "Pelatihan Jabatan",
                    content: <EmployeePelatihan type={1}/>
                },
                {
                    selected: false,
                    label: "Pelatihan Teknis",
                    content: <EmployeePelatihan type={2}/>
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