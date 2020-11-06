import React, {Component, Fragment} from "react";
import {formatDate, selectedTabClass} from "../../application/AppCommons";
import EmployeePendidikan from "./EmployeePendidikan";

class EmployeeDataKepegawaian extends Component {

    constructor(props) {
        super(props); this.state = {
            tabs: [
                {
                    selected: true,
                    label: "Pendidikan",
                    component: <EmployeePendidikan/>
                }
            ],
            content: <EmployeePendidikan/>,
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    selectedTab(index) {
        var content = ''
        const newTabs = this.state.tabs.map((val, i) => {
            val.selected = index === i
            if (val.selected) {
                content = val.content
            }
            return val

        })
        this.setState({tabs: newTabs, content: content})
    }

    render() {
        const {user, tabs, content} = this.state
        if (user === null) {
            return (<></>)
        }
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h4 className="card-title">Data Kepegawaian</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>Status</td>
                                <td>{user.status_peg}</td>
                                <td>Jenis</td>
                                <td>{user.jenis_peg}</td>
                            </tr>
                            <tr>
                                <td>Jabatan</td>
                                <td>{user.jabatan}</td>
                                <td>Eselon</td>
                                <td>{user.eselon}</td>
                            </tr>
                            <tr>
                                <td>No SK Jabatan</td>
                                <td>{user.no_sk_jabatan}</td>
                                <td>Tgl SK Jabatan</td>
                                <td>{formatDate(user.tgl_sk_jabatan)}</td>
                            </tr>

                            <tr>
                                <td>NPWP</td>
                                <td>{user.npwp}</td>
                                <td>No. Taspen</td>
                                <td>{user.no_taspen}</td>
                            </tr>
                            <tr>
                                <td>No. Karis SU</td>
                                <td>{user.no_karis_su}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>MKS</td>
                                <td>{user.mks}</td>
                                <td>MKG</td>
                                <td>{user.mkg}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{user.status_aktif} </td>
                                <td>Perkiraan Pensiun</td>
                                <td>{user.perkiraan_pensiun}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}

export default EmployeeDataKepegawaian;