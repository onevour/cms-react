import React, {Component, Fragment} from "react";
import {formatDate, selectedTabClass} from "../../../application/AppCommons";
import EmployeePendidikan from "../datapribadi/EmployeePendidikan";
import EmployeePNS from "./EmployeePNS";

class EmployeeDataKepegawaian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    selected: true,
                    label: "CPNS & PNS",
                    content: <EmployeePNS/>
                },
                {
                    selected: false,
                    label: "Jabatan",
                    content: <EmployeePendidikan/>
                },
                {
                    selected: false,
                    label: "Pangkat",
                    content: <EmployeePendidikan/>
                },
                {
                    selected: false,
                    label: "Unit Kerja",
                    content: <EmployeePendidikan/>
                }
            ],
            content: <EmployeePNS/>,
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
        const {jabatan_detail, eselon_detail, pangkat_detail, units} = user
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
                                <td><span>Status</span></td>
                                <td>{user.status_peg}</td>
                                <td>Jenis</td>
                                <td>{user.jenis_peg}</td>
                            </tr>
                            <tr>
                                <td>Unit</td>
                                <td >{units[0].nama_unit_utama}</td>
                                <td colSpan={2}>{units[0].singkatan}</td>
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
                                <td/>
                                <td/>
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
                            <tr>
                                <th colSpan={4}>CPNS & PNS</th>
                            </tr>
                            <tr>
                                <td><span>CPNS</span></td>
                                <td>{formatDate(user.tgl_mulai_cpns)}</td>
                                <td><span>PNS</span></td>
                                <td>{formatDate(user.tgl_mulai_pns)}</td>

                            </tr>
                            <tr>
                                <td><span>No SK CPNS</span></td>
                                <td>{user.no_sk_cpns}</td>
                                <td><span>No SK PNS</span></td>
                                <td>{user.no_sk_pns}</td>
                            </tr>
                            <tr>
                                <td>Tgl. SK CPNS</td>
                                <td>{formatDate(user.tgl_sk_cpns)}</td>
                                <td>Tgl. SK PNS</td>
                                <td>{formatDate(user.tgl_sk_pns)}</td>
                            </tr>
                            <tr>
                                <th colSpan={4}>Jabatan</th>
                            </tr>
                            <tr>
                                <td>Jabatan</td>
                                <td>{jabatan_detail.nama_jabatan}</td>
                                <td>Kategori</td>
                                <td>{jabatan_detail.kategori}</td>
                            </tr>
                            <tr>
                                <td>No SK Jabatan</td>
                                <td>{user.no_sk_jabatan}</td>
                                <td>Tgl SK Jabatan</td>
                                <td>{formatDate(user.tgl_sk_jabatan)}</td>
                            </tr>
                            <tr>
                                <td>Eselon</td>
                                <td>{eselon_detail.eselon}</td>
                                <td/>
                                <td/>
                            </tr>
                            <tr>
                                <th colSpan={4}>Pangkat & Golongan</th>
                            </tr>
                            <tr>
                                <td>Pangkat</td>
                                <td>{pangkat_detail.pangkat}</td>
                                <td>Pangkat Gol.</td>
                                <td>{pangkat_detail.gol}</td>
                            </tr>
                            <tr>
                                <td>TMT</td>
                                <td>{formatDate(user.tmt_gol)}</td>
                                <td/>
                                <td/>
                            </tr>
                            <tr>

                                <td>No SK Gol.</td>
                                <td>{user.no_sk_gol}</td>
                                <td>Tgl SK Gol.</td>
                                <td>{formatDate(user.tgl_sk_gol)}</td>

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