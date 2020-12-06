import React, {Component} from "react";
import {formatDate, formatStatusFamily, selectedTabClass} from "../../../application/AppCommons";

class EmployeeDataKeluargaV2 extends Component {

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
            <div className="col-12" style={{marginTop: 10}}>

                <div className="row">
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
                </div>

                <div className="table-responsive row">
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
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{formatStatusFamily(o.family_status)}</td>
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

export default EmployeeDataKeluargaV2;