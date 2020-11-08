import React, {Component, Fragment} from "react";
import Pagination from "../../plugins/Pagination";
import moment from 'moment';
import EmployeeDataPribadi from "./datapribadi/EmployeeDataPribadi";
import EmployeeDataKepegawaian from "./kepegawaian/EmployeeDataKepegawaian";
import EmployeeDataKeluarga from "./datapribadi/EmployeeDataKeluarga";
import EmployeeDataRiwayat from "./riwayat/EmployeeDataRiwayat";

class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    render() {
        const {user, familyTab, familyVal} = this.state
        if (user === null) {
            return (<></>)
        }
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-2 mb-3">
                        <div className="card">
                            <div className="card-body text-center" style={{padding: 20}}>
                                <img className="img-fluid"
                                     src={user.photo}
                                     alt=""/>
                                <p style={{marginTop: 30, fontSize: 12}}>{user.nama}</p>
                                <p style={{fontSize: 12}}>{user.nip}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <div className="card mb-3">
                            <EmployeeDataPribadi/>
                        </div>

                        <div className="card mb-3">
                            <EmployeeDataKepegawaian/>
                        </div>

                        <div className="card mb-3">
                            <EmployeeDataRiwayat/>
                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }

    /*

    <div className="row gutters-sm">
                            <div className="col-sm-12 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="card-title">Pendidikan</h4>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Jenjang</th>
                                                    <th>Nama Instansi</th>
                                                    <th>TMT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {user.educations.map((o, i) =>
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{o.type}</td>
                                                        <td>{o.value}</td>
                                                        <td>{o.graduated}</td>
                                                    </tr>
                                                )}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row gutters-sm">
                            <div className="col-sm-12 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="card-title">Pendidikan dan pelatihan Jabatan</h4>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Jenjang</th>
                                                    <th>Nama Instansi</th>
                                                    <th>TMT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row gutters-sm">
                            <div className="col-sm-12 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="card-title">Pendidikan dan pelatihan Teknis</h4>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Jenjang</th>
                                                    <th>Nama Instansi</th>
                                                    <th>TMT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row gutters-sm">
                            <div className="col-sm-12 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="card-title">Data Pendukung</h4>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Jenjang</th>
                                                    <th>Nama Instansi</th>
                                                    <th>TMT</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


    * */
}

export default Employee;