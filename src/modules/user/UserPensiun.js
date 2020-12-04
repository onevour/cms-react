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

class UserPensiun extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            filter: '',
            directBody: null,
            direct: false
        };
        this.changePage = this.changePage.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
    }

    componentDidMount() {
        this.props.pageUser({
            filter: '',
            module: 'pensiun',
            page: 0
        })
    }


    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.setState({id: 0, name: ''})
            this.props.pageUser({filter: "", module: 'pensiun', page: this.state.page})
        }
    }

    changePage(page) {
        this.setState({page: page - 1})
        const request = {
            filter: this.state.name,
            module: 'pensiun',
            page: page - 1
        }
        this.props.pageUser(request)
    }

    handleChangeName(event) {
        this.setState({name: event.target.value})
        const request = {
            filter: this.state.name,
            module: 'pensiun',
            page: 0
        }
        this.props.pageUser(request)
    }

    renderHeader() {
        return (
            <thead>
            <tr>
                <th>NIP</th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Pangkat</th>
                <th>Masa Kerja</th>
                <th>Usia</th>
                <th>Pengajuan</th>
                <th>Blanko 1</th>
                <th>Blanko 2</th>
                <th>Blanko 3</th>
                <th>Blanko 4</th>
                <th>Blanko 5</th>
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
                    <td>{o.golongan_detail.gol}</td>
                    <td>{this.masaKerja(o)}</td>
                    <td>{this.usia(o)}</td>
                    <td>{this.downloadBlanko(o, 0)}</td>
                    <td>{this.downloadBlanko(o, 1)}</td>
                    <td>{this.downloadBlanko(o, 2)}</td>
                    <td>{this.downloadBlanko(o, 3)}</td>
                    <td>{this.downloadBlanko(o, 4)}</td>
                    <td>{this.downloadBlanko(o, 5)}</td>
                </tr>
            )
        )
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
                                <h4 className="card-title">Data Pegawai Pensiun</h4>
                                <div className="row">
                                    <div className="col-md-9">

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

export default connect(mapStateToProps, {pageUser, listDuk, paramDuk})(UserPensiun);