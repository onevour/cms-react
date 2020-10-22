import React, {Component, Fragment} from "react";
import Pagination from "../../plugins/Pagination";

class Employee extends Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-2 mb-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <img className="img-fluid"
                                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                                     alt=""/>
                                <h4 className="card-title" style={{marginTop: 30}}>John Dou</h4>
                                <p className="card-description">111222333444</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h4 className="card-title">Data Umum</h4>
                                    </div>
                                    <div className="col">
                                        <button type="submit" className="btn btn-success btn-sm mr-2 float-right">Download</button>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                <td>Nama</td>
                                                <td>john doe</td>
                                                <td></td>
                                                <td>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Tempat, Tgl Lahir</td>
                                                <td>Jakarta, 15 May 2017</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Status Perkawinan</td>
                                                <td>Menikah</td>
                                                <td>Tgl. Pernikahan</td>
                                                <td>20 May 2017</td>
                                            </tr>
                                            <tr>
                                                <td>Telepon</td>
                                                <td>021-7878781</td>
                                                <td>Email</td>
                                                <td>johndoe@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <td>Alamat</td>
                                                <td colSpan="3">53275533</td>
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
                                                <a className="nav-link active" href="#">Pasangan</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">Anak</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">Orang Tua</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">Mertua</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">Saudara</a>
                                            </li>

                                        </ul>

                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Hubungan</th>
                                                    <th>Nama</th>
                                                    <th>Tempat, Tgl. Lahir</th>
                                                    <th>Pekerjaan</th>
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
                                        <h4 className="card-title">Keterangan Perorangan</h4>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                <tr>
                                                    <td>Nama</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>NIP</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Status Pegawai (Aktif/Pensiun/Pindah/CTLN)</td>
                                                    <td></td>
                                                </tr>
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
                                        <h4 className="card-title">Riwayat Cuti</h4>
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