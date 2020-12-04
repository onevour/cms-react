import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {
    BASE_URL, DUK_FILTER_PARAM, DUK_FILTER_PARAM_RESPONSE,
    DUK_PAGE_RESPONSE, USER_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentPage, emptyCrud, MAX_PENSIUN, STATUS_PEGAWAI} from "../../application/AppConstant";
import {connect} from "react-redux";
import {listDuk, pageDuk, paramDuk} from "../../redux/actions/reduxActionMasterDUK";
import {formatDate, getFileExtension} from "../../application/AppCommons";
import moment from "moment";
import Select from "react-select";
import {pageUser} from "../../redux/actions/reduxActionUser";
import {Redirect} from "react-router-dom";

class UserNaikPangkat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            filter: '',
            directBody: null,
            direct: false
        };
        this.changePage = this.changePage.bind(this)
        this.downloadEmployeeData = this.downloadEmployeeData.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
    }

    componentDidMount() {
        this.props.pageUser({
            filter: '',
            module: 'naikpangkat',
            page: 0
        })
    }


    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.setState({id: 0, name: ''})
            this.props.pageUser({filter: "", module: 'naikpangkat', page: this.state.page})
        }
    }

    changePage(page) {
        this.setState({page: page - 1})
        const request = {
            filter: this.state.name,
            module: 'naikpangkat',
            page: page - 1
        }
        this.props.pageUser(request)
    }

    handleChangeName(event) {
        this.setState({name: event.target.value})
        const request = {
            filter: this.state.name,
            module: 'naikpangkat',
            page: 0
        }
        this.props.pageUser(request)
    }

    renderHeader() {
        return (
            <thead>
            <tr>
                <th>Nama</th>
                <th>NIP</th>
                <th>Jabatan</th>
                <th>Pangkat</th>
                <th>Golongan</th>
                <th>Pangkat</th>
                <th>Golongan</th>
                <th>Jabatan</th>
            </tr>
            </thead>

        )
    }

    masaKerja(o) {
        const pensiun = moment(o.tanggal_lahir).add(MAX_PENSIUN, 'years');
        let diff = moment(pensiun).diff(moment(o.tgl_sk_cpns), 'milliseconds')
        let duration = moment.duration(diff)
        return (
            <>
                {duration.years()} Tahun {duration.months()} Bulan
            </>
        )
    }

    usia(o) {
        let diff = moment().diff(moment(o.tanggal_lahir), 'milliseconds')
        let duration = moment.duration(diff)
        return (
            <>
                {duration.years()} Tahun {duration.months()} Bulan
            </>
        )
    }

    pangkatTerakhir(o, index) {
        if (0 === o.pangkats.length) return ''
        let last = o.pangkats[o.pangkats.length - 2]
        if (!last.pangkat_golongan) return ''
        if (0 === index) {
            return last.pangkat_golongan.golongan
        }
        return last.pangkat_golongan.nama
    }

    pangkatAjuan(o, index) {
        if (0 === o.pangkats.length) return ''
        let last = o.pangkats[o.pangkats.length - 1]
        if (!last.pangkat_golongan) return ''
        if (0 === index) {
            return last.pangkat_golongan.golongan
        }
        return last.pangkat_golongan.nama
    }

    downloadBlanko(o, index) {
        return (
            <a href="#" style={{marginTop: -10}}
               onClick={() => {
                   const {user} = this.state
                   fetch(BASE_URL + '/user/download/pensiun/' + o.nip + '/' + index)
                       .then(response => {
                           if (response.ok) {
                               response.blob().then(blob => {
                                   let url = window.URL.createObjectURL(blob);
                                   let a = document.createElement('a');
                                   a.href = url;
                                   a.download = o.nip + '-blanko-' + index + '.pdf';
                                   a.click();
                               });
                           }
                       }).catch(function (err) {
                   });
               }}>download</a>
        )
    }

    renderTable(users) {
        return (
            users.result.values.map((o, i) =>
                <tr className="clickable" key={i}>
                    <td>{o.nip}</td>
                    <td>{o.nama}</td>
                    <td>{o.jabatan}</td>
                    <td>{this.pangkatTerakhir(o, 0)}</td>
                    <td>{this.pangkatTerakhir(o, 1)}</td>
                    <td>{this.pangkatAjuan(o, 0)}</td>
                    <td>{this.pangkatAjuan(o, 1)}</td>
                </tr>
            )
        )
    }

    downloadEmployeeData() {
        const {user} = this.state
        fetch(BASE_URL + '/user/download/cv/' + user.nip)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = user.nip + '-' + user.nama + '.pdf';
                    a.click();
                });
            });
    }

    render() {
        const {page, name} = this.state
        const {users} = this.props

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Data Pegawai Naik Pangkat</h4>
                                <div className="row">
                                    <div className="col-md-3">

                                        <div className="col-md-3 col-sm-3">
                                            <button type="submit" style={{marginTop: -10}}
                                                    onClick={this.downloadEmployeeData}
                                                    className="btn btn-success btn-sm mr-2 ">
                                                <i className="mdi mdi-18px mdi-printer"/> Cetak
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-3">

                                        <input type="text" className="form-control"
                                               value={this.state.name}
                                               onChange={this.handleChangeName}
                                               placeholder="Nama pegawai"/>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        {this.renderHeader()}
                                        <tbody>
                                        {this.renderTable(users)}
                                        </tbody>

                                    </table>
                                </div>
                                <Pagination
                                    totalPages={users.result.page_total}
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
        users: (state[USER_PAGE_RESPONSE] ? state[USER_PAGE_RESPONSE] : emptyContentPage)
    }
}

export default connect(mapStateToProps, {pageUser, listDuk, paramDuk})(UserNaikPangkat);