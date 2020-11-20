import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {
    BASE_URL,
    DUK_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentPage, JENIS_CUTI, MAX_PENSIUN, STATUS_PEGAWAI} from "../../application/AppConstant";
import {connect} from "react-redux";
import {listDuk, pageDuk} from "../../redux/actions/reduxActionMasterDUK";
import {disableBeforeDay, formatDate} from "../../application/AppCommons";
import moment from "moment";
import Select from "react-select";
import Datetime from "react-datetime";


class EmployeeDUK extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            id: 0,
            status:'',
            name: '',
            golongan: '',
            pangkat: '',
            pendidikan: '',
            usia: ''
        };
        this.changePage = this.changePage.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.downloadDUK = this.downloadDUK.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        this.props.pageDuk({filter: "", page: 0})
    }

    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.setState({id: 0, name: ''})
            this.props.pageDuk({filter: "", page: this.state.page})
        }
        if (props.documents !== this.props.documents) {


        }
    }

    downloadDUK() {
        const {user} = this.state
        fetch(BASE_URL + '/duk/download/')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'duk.pdf';
                    a.click();
                });
            });
    }

    changePage(page) {
        this.setState({page: page - 1});
        this.props.pageDuk({filter: "", page: page - 1})
    }

    handleChangeStatus(event) {
        console.log(event.target.value)
        this.setState({status: event.value})
    }

    handleChangeName(event) {
        console.log(event.target.value)
        this.setState({name: event.target.value})
    }

    handleChangeGolongan(event) {
        console.log(event.target.value)
        this.setState({golongan: event.target.value})
    }

    handleChangePangkat(event) {
        console.log(event.target.value)
        this.setState({pangkat: event.target.value})
    }

    handleChangePendidikan(event) {
        console.log(event.target.value)
        this.setState({pendidikan: event.target.value})
    }

    handleChangeUsia(event) {
        console.log(event.target.value)
        this.setState({usia: event.target.value})
    }

    submitForm(event) {
        event.preventDefault()
        const request = {
            id: this.state.id,
            name: this.state.name
        }
        console.log("submit")
        this.props.mergeDocument(request)
    }

    latesPendidikan(educations, key) {
        if (educations.length === 0) {
            return ''
        }
        let newArray = educations[educations.length - 1];
        return newArray[key]
    }

    usia(dob) {
        let year = moment().diff(dob, 'years', false)
        let month = moment().diff(dob, 'months', false) - (year * 12)
        return year + ' Tahun ' + month + ' Bulan'
    }

    pensiun(dob) {
        let dodDate = moment(dob).add(MAX_PENSIUN, 'y')
        return dodDate.format('YYYY')
    }

    pensiunTMT(dob) {
        let dodDate = moment(dob).add(MAX_PENSIUN, 'y')
        return dodDate.format('DD MMM YYYY')
    }

    masaKerja(mulaiCPNS, dob) {
        let year = moment().diff(dob, 'years', false)
        if (year > MAX_PENSIUN) {
            // sudah pensiun
            let dobDate = moment(dob).add(MAX_PENSIUN, 'y')
            let year = moment(dobDate).diff(mulaiCPNS, 'years', false)
            let month = moment(dobDate).diff(mulaiCPNS, 'months', false) - (year * 12)
            return year + ' Tahun ' + month + ' Bulan'
        }
        let yearCPNS = moment().diff(mulaiCPNS, 'years', false)
        let monthCPNS = moment().diff(mulaiCPNS, 'months', false) - (yearCPNS * 12)
        return yearCPNS + ' Tahun ' + monthCPNS + ' Bulan'
    }

    masaKerjaJabatan(gol) {
        let yearCPNS = moment().diff(gol, 'years', false)
        let monthCPNS = moment().diff(gol, 'months', false) - (yearCPNS * 12)
        return yearCPNS + ' Tahun ' + monthCPNS + ' Bulan'
    }

    masaKerjaGolongan(jabatan) {
        let yearCPNS = moment().diff(jabatan, 'years', false)
        let monthCPNS = moment().diff(jabatan, 'months', false) - (yearCPNS * 12)
        return yearCPNS + ' Tahun ' + monthCPNS + ' Bulan'
    }

    renderHeader() {
        return (
            <thead>
            <tr>
                <th rowSpan={2}>Nama</th>
                <th rowSpan={2}>Jenis Kelamin</th>
                <th rowSpan={2}>Nip</th>
                <th colSpan={3}>Pangkat/Golongan Ruang</th>
                <th rowSpan={2}>Masa waktu dipangkat</th>
                <th colSpan={2}>Jabatan</th>
                <th rowSpan={2}>Masa waktu dijabatan</th>
                <th rowSpan={2}>TMT CPNS</th>
                <th rowSpan={2}>Masa kerja (tahun, bulan)</th>
                <th colSpan={2}>Jumlah Pelatihan</th>
                <th colSpan={3}>Pendidikan</th>
                <th colSpan={2}>Tempat/Tanggal Lahir</th>
                <th rowSpan={2}>Usia (tahun dan bulan)</th>
                <th rowSpan={2}>TMT Pensiun</th>
                <th rowSpan={2}>Tahun Pensiun</th>
                <th rowSpan={2}>Catatan Mutasi kepegawaian</th>
                <th rowSpan={2}>Agama</th>
            </tr>
            <tr>
                <th>Pangkat</th>
                <th>Golongan</th>
                <th>TMT</th>
                <th>Nama Jabatan</th>
                <th>TMT</th>
                <th>Pelatihan Jabatan</th>
                <th>Pelatihan Teknis</th>
                <th>Tingkat ijazah terakhir</th>
                <th>Nama instansi</th>
                <th>Jurusan</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
            </tr>
            </thead>

        )
    }

    renderTable(duks) {
        return (
            duks.result.values.map((o, i) =>
                <tr className="clickable" key={i}>
                    <td>{o.nama}</td>
                    <td>{o.kelamin}</td>
                    <td>{o.nip}</td>
                    <td>{o.pangkat}</td>
                    <td>{o.pangkat_detail.gol}</td>
                    <td>{formatDate(o.tmt_gol)}</td>
                    <td>{this.masaKerjaGolongan(o.tmt_gol)}</td>
                    <td>{o.jabatan}</td>
                    <td>{formatDate(o.tmt_jabatan)}</td>
                    <td>{this.masaKerjaJabatan(o.tmt_jabatan)}</td>
                    <td>{formatDate(o.tgl_mulai_cpns)}</td>
                    <td>{this.masaKerja(o.tgl_mulai_cpns, o.tanggal_lahir)}</td>
                    <td/>
                    <td/>
                    <td>{this.latesPendidikan(o.educations, 'type')}</td>
                    <td>{this.latesPendidikan(o.educations, 'value')}</td>
                    <td>{this.latesPendidikan(o.educations, 'majors')}</td>
                    <td>{o.tempat_lahir}</td>
                    <td>{formatDate(o.tanggal_lahir)}</td>
                    <td>{this.usia(o.tanggal_lahir)}</td>
                    <td>{this.pensiunTMT(o.tanggal_lahir)}</td>
                    <td>{this.pensiun(o.tanggal_lahir)}</td>
                    <td/>
                    <td>{o.agama}</td>


                </tr>
            )
        )
    }

    render() {
        const {page, name} = this.state
        const {duks} = this.props
        console.log(duks)
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Data Pegawai</h4>
                                <div className="row">
                                    <div className="col-md-9">
                                        <form className="forms-sample" ref={(ref) => this.formRef = ref}
                                              onSubmit={this.submitForm}
                                              noValidate>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Status
                                                            Pegawai</label>
                                                        <div className="col-sm-9">
                                                            <Select className="form-control select-tmd"
                                                                    options={STATUS_PEGAWAI}
                                                                    onChange={this.handleChangeCuti}
                                                                    label="Single select"/>
                                                            <span
                                                                className="text-danger">{this.state.errorjenisCuti}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Nama</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Nama pegawai"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Pangkat</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Pangkat pegawai"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Jabatan</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Jabatan pegawai"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Masa Kerja</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Masa kerja"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Pendidikan</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Pendidikan"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Usia</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Usia"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label"/>
                                                        <div className="col-sm-9">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit"
                                                    className="btn btn-success mr-2">Cari Pegawai
                                            </button>
                                            <button type="cancel"
                                                    className="btn mr-2">Clear
                                            </button>
                                        </form>
                                    </div>
                                    <div className="col-md-3">
                                        <button type="submit" style={{marginTop: -30}}
                                                onClick={this.downloadDUK}
                                                className="btn btn-success btn-sm mr-2 float-right">Download DUK
                                        </button>

                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        {this.renderHeader()}
                                        <tbody>
                                        {this.renderTable(duks)}
                                        </tbody>

                                    </table>
                                </div>
                                <Pagination
                                    totalPages={duks.result.page_total}
                                    currentPage={(page + 1)}
                                    showMax={5}
                                    onClick={this.changePage}
                                />

                            </div>
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        duks: (state[DUK_PAGE_RESPONSE] ? state[DUK_PAGE_RESPONSE] : emptyContentPage)
    }
}

export default connect(mapStateToProps, {pageDuk, listDuk})(EmployeeDUK);