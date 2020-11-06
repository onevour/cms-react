import React, {Component, Fragment} from "react";
import {formatDate, selectedTabClass} from "../../application/AppCommons";
import EmployeePendidikan from "./EmployeePendidikan";
import EmployeeDataKeluarga from "./EmployeeDataKeluarga";
import EmployeeDataKeluargaV2 from "./EmployeeDataKeluargaV2";

class EmployeeDataPribadi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {
                    selected: true,
                    label: "Pendidikan",
                    content: <EmployeePendidikan/>
                }, {
                    selected: false,
                    label: "Keluarga",
                    content: <EmployeeDataKeluargaV2/>
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
                this.setState({content: val.content})
            }
            return val

        })
        this.setState({tabs: newTabs})
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
                        <h4 className="card-title">Data Pribadi</h4>
                    </div>
                    <div className="col">
                        <button type="submit" style={{marginTop: -10}}
                                className="btn btn-success btn-sm mr-2 float-right">Cetak CV
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>Nama</td>
                                <td>{user.nama}</td>
                                <td/>
                                <td/>
                            </tr>
                            <tr>
                                <td>Tempat, Tgl Lahir</td>
                                <td>{user.tempat_lahir + ", "} {formatDate(user.tanggal_lahir)}</td>
                                <td/>
                                <td/>
                            </tr>
                            <tr>
                                <td>Status Perkawinan</td>
                                <td>{user.status_diri}</td>
                                <td>Tgl. Pernikahan</td>
                                <td>{formatDate(user.marital_date)}</td>
                            </tr>
                            <tr>
                                <td>Telepon</td>
                                <td>
                                    {user.contacts.map((o, i) =>
                                        <>
                                            {o.type === 1 ? o.value : ""}
                                            {o.type === 1 && <br/>}
                                        </>
                                    )}
                                </td>
                                <td>Email</td>
                                <td>
                                    {user.contacts.map((o, i) =>
                                        <>
                                            {o.type === 2 ? o.value : ""}
                                            {o.type === 2 && <br/>}
                                        </>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>Alamat</td>
                                <td>{user.alamat}, {user.kode_pos} </td>
                                <td>RT/RW</td>
                                <td>{user.rt_rw}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row" style={{marginTop: 20}}>
                    <div className="col-md-12">
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
                    {content}
                </div>
            </div>
        )
    }

}

export default EmployeeDataPribadi;