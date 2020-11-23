import React, {Component, Fragment} from "react";
import {formatDate, selectedTabClass} from "../../../application/AppCommons";

class EmployeeDataKeluarga extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    selected: true,
                    label: "Pasangan"
                },
                {
                    selected: false,
                    label: "Anak"
                },
                {
                    selected: false,
                    label: "Orang Tua"
                },
                {
                    selected: false,
                    label: "Mertua"
                },
                {
                    selected: false,
                    label: "Saudara"
                }
            ],
            families: [],
            user: JSON.parse(localStorage.getItem('user'))
        }
        this.state.families = this.filterFamilyMember(0)
    }

    selectedTab(index) {
        const newTabs = this.state.tabs.map((val, i) => {
            val.selected = index === i
            return val
        })
        this.setState({tabs: newTabs, families: this.filterFamilyMember(index)})
    }

    filterFamilyMember(index) {
        if (this.state.user === null || this.state.user.families === null) {
            return []
        }
        let families = []
        this.state.user.families.map((family) => {
            if (family.type === (index + 1)) {
                families.push(family)
            }
        })
        return families;
    }

    render() {
        const {tabs, user, familyTab, families} = this.state
        if (user === null) {
            return (<></>)
        }
        return (
            <div className="card-body">
                <h4 className="card-title">Keluarga</h4>

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

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Hubungan</th>
                            <th>Nama</th>
                            <th>Pekerjaan</th>
                        </tr>
                        </thead>
                        <tbody>
                        {families.map((o, i) =>
                            <tr>
                                <td>{i + 1}</td>
                                <td>{o.family_status}</td>
                                <td>{o.name}</td>
                                <td>{o.occupation}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default EmployeeDataKeluarga;