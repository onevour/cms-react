import React, {Component, Fragment} from "react";
import Pagination from "../../plugins/Pagination";
import moment from 'moment';

class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            familyTab: [1, 0, 0, 0, 0],
            user: JSON.parse(localStorage.getItem('user')),
            familyVal: []
        }
        this.dateFormat = this.dateFormat.bind(this);
        this.filterFamily = this.filterFamily.bind(this);
        this.familyValue = this.familyValue.bind(this);
        this.state.familyVal = this.familyValue(0)
    }

    dateFormat(timestamp) {
        return moment(timestamp).format('DD-MMM-YYYY')
    }

    filterFamily(e) {
        e.preventDefault();
        let tag = parseInt(e.currentTarget.dataset.tag)
        this.familyValue(tag)
        const tmp = [0, 0, 0, 0, 0]
        this.state.familyTab.map((item, index) => {
            if (index === tag) tmp[index] = 1
        })
        this.setState({familyTab: tmp, familyVal: this.familyValue(tag)})
    }

    familyValue(tag) {
        const val = []
        if (this.state.user === null) return []
        if (this.state.user.families === null) return []
        this.state.user.families.map((item, index) => {
            if (item.type === (tag + 1)) val.push(item)
        })
        return val
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
                                     src={user.picture}
                                     alt=""/>
                                <p style={{marginTop: 30, fontSize: 12}}>{user.name}</p>
                                <p style={{fontSize: 12}}>{user.nip}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h4 className="card-title">Data Probadi</h4>
                                    </div>
                                    <div className="col">
                                        <button type="submit"
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
                                                <td>{user.name}</td>
                                                <td/>
                                                <td/>
                                            </tr>
                                            <tr>
                                                <td>Tempat, Tgl Lahir</td>
                                                <td>{user.pob + ", "} {this.dateFormat(user.dob)}</td>
                                                <td/>
                                                <td/>
                                            </tr>
                                            <tr>
                                                <td>Status Perkawinan</td>
                                                <td>{user.marital_status}</td>
                                                <td>Tgl. Pernikahan</td>
                                                <td>{this.dateFormat(user.marital_date)}</td>
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
                                                <td colSpan="3">{user.address}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="row gutters-sm">
                            <div className="col-sm-12 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="card-title">Keluarga</h4>

                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                                <a data-tag="0"
                                                   className={familyTab[0] === 1 ? "nav-link active" : "nav-link"}
                                                   onClick={this.filterFamily} href="#">Pasangan</a>
                                            </li>
                                            <li className="nav-item">
                                                <a data-tag="1"
                                                   className={familyTab[1] === 1 ? "nav-link active" : "nav-link"}
                                                   onClick={this.filterFamily} href="#">Anak</a>
                                            </li>
                                            <li className="nav-item">
                                                <a data-tag="2"
                                                   className={familyTab[2] === 1 ? "nav-link active" : "nav-link"}
                                                   onClick={this.filterFamily} href="#">Orang Tua</a>
                                            </li>
                                            <li className="nav-item">
                                                <a data-tag="3"
                                                   className={familyTab[3] === 1 ? "nav-link active" : "nav-link"}
                                                   onClick={this.filterFamily} href="#">Mertua</a>
                                            </li>
                                            <li className="nav-item">
                                                <a data-tag="4"
                                                   className={familyTab[4] === 1 ? "nav-link active" : "nav-link"}
                                                   onClick={this.filterFamily} href="#">Saudara</a>
                                            </li>

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
                                                {familyVal.map((o, i) =>
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
                                </div>
                            </div>
                        </div>

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
                                        <h4 className="card-title">Riwayat Mutasi</h4>
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
                                        <h4 className="card-title">Riwayat Jabatan</h4>
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

                        <div className="row gutters-sm">
                            <div className="col-sm-12 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="card-title">Riwayat DP3</h4>
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
                                        <h4 className="card-title">Riwayat Angka Kredit</h4>
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
                                        <h4 className="card-title">Riwayat Satya Lencana</h4>
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
                                        <h4 className="card-title">Riwayat Hukuman Disiplin</h4>
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
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Employee;