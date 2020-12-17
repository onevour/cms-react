import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {
    BASE_URL, DUK_FILTER_PARAM, DUK_FILTER_PARAM_RESPONSE,
    DUK_PAGE_RESPONSE, USER_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentPage, emptyCrud, MAX_PENSIUN, STATUS_PEGAWAI} from "../../application/AppConstant";
import {connect} from "react-redux";
import {listDuk, pageDuk, paramDuk} from "../../redux/actions/reduxActionMasterDUK";
import {disableBeforeDay, formatDate, getFileExtension} from "../../application/AppCommons";
import moment from "moment";
import Select from "react-select";
import {pageUser} from "../../redux/actions/reduxActionUser";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import {downloadData, postData} from "../../application/ApiRequest";
import {saveAs} from 'file-saver';
import {Button, Modal} from "react-bootstrap";
import Datetime from "react-datetime";

class UserPensiun extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            filter: '',
            directBody: null,
            direct: false,
            modalShow: false,
            noDokumen: '',
            noDokumenMentri: '',
            tglDokumenMentri: null,
        };
        this.tanggalRef = React.createRef();
        this.changePage = this.changePage.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleNoDocumenChange = this.handleNoDocumenChange.bind(this)
        this.handleSelectTanggal = this.handleSelectTanggal.bind(this)
        this.modalClose = this.modalClose.bind(this)
        this.downloadFile = this.downloadFile.bind(this)
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
                <th>Pengantar</th>
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
        if (100 === index) {
            return this.downloadPengantar(o, index)
        }
        if (2 === index) {
            return this.downloadBlanko2(o, index)
        }
        if (4 === index) {
            return this.downloadPengantar(o, index)
        }
        return (
            <a href="#" style={{marginTop: -10}}
               onClick={() => {
                   const payload = {
                       url: '/user/download/pensiun',
                       body: {
                           nip: o.nip,
                           blankoId: index
                       }
                   };
                   return downloadData(payload).then(response => {
                       if (response.ok) {
                           response.blob().then(blob => {
                               saveAs(blob, o.nip + '-blanko-' + index + '.pdf');
                           });
                       }
                   }).catch(function (err) {
                   });
               }}>download</a>
        )
    }

    downloadPengantar(o, index) {
        return (
            <a href="#" style={{marginTop: -10}}
               onClick={() => {
                   this.setState({modalShow: true, userPensiun: o, indexPensiun: index})
                   /*
                   swal({
                       text: 'Input nomor surat',
                       content: "input",
                       button: {
                           text: "Download",
                           closeModal: false,
                       },
                   }).then(name => {
                       if (!name) {
                           swal("Download gagal!", 'mohon input nomor surat!', "error");
                           throw null
                       }
                       const payload = {
                           url: '/user/download/pensiun',
                           body: {
                               nip: o.nip,
                               blankoId: index
                           }
                       }
                       return downloadData(payload)
                   })
                       .then(results => {
                           return results.blob();
                       })
                       .then(blob => {
                           saveAs(blob, o.nip + '_pengantar_pensiun.pdf');
                           return swal('Download success', o.nip + '_pengantar_pensiun.pdf', 'success');
                       })
                       .catch(err => {
                           if (err) {
                               swal("Download gagal!", err, "error");
                           } else {
                               swal.stopLoading();
                               swal.close();
                           }
                       });

                    */
               }}>download</a>
        )
    }

    downloadBlanko2(o, index) {
        return (
            <a href="#" style={{marginTop: -10}}
               onClick={() => {
                   this.setState({modalShow: true, userPensiun: o, indexPensiun: index})
               }}>download</a>
        )
    }

    download(o, index, blob) {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = o.nip + '-blanko-' + index + '.pdf';
        a.click();
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
                    <td>{this.downloadBlanko(o, 100)}</td>
                    <td>{this.downloadBlanko(o, 1)}</td>
                    <td>{this.downloadBlanko(o, 2)}</td>
                    <td>{this.downloadBlanko(o, 3)}</td>
                    <td>{this.downloadBlanko(o, 4)}</td>
                    <td>{this.downloadBlanko(o, 5)}</td>
                </tr>
            )
        )
    }

    modalClose() {
        this.setState({modalShow: false})
    }

    handleNoDocumenChange(e) {
        this.setState({noDokumen: e.target.value})
    }

    handleSelectTanggal(e) {
        this.setState({tanggal: e})
    }

    renderContent() {
        const {indexPensiun} = this.state
        if (100 === indexPensiun || 4 === indexPensiun) {
            // no dokumen
            return (
                <div className="form-group">
                    <label className="label">No Surat</label>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="No Surat"
                               value={this.state.noDokumen}
                               onChange={this.handleNoDocumenChange}/>
                    </div>
                </div>
            )
        }

        if (2 === indexPensiun) {
            // no dokumen
            return (
                <Fragment>
                    <div className="form-group">
                        <label className="label">No Surat</label>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="No Surat"
                                   value={this.state.noDokumen}
                                   onChange={this.handleNoDocumenChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label">Tgl Surat</label>
                        <div className="input-group">
                            <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}
                                      ref={this.tanggalRef}
                                      onChange={this.handleSelectTanggal}/>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }

    downloadFile() {
        const {userPensiun, indexPensiun, noDokumen, tanggal} = this.state
        let docName = userPensiun.nip + '-blanko-' + indexPensiun + '.pdf'
        if (100 === indexPensiun) {
            docName = userPensiun.nip + '_pengantar_pensiun.pdf';
        }
        const payload = {
            url: '/user/download/pensiun',
            body: {
                nip: userPensiun.nip,
                blankoId: indexPensiun,
                noDokumen: noDokumen,
                tanggal: tanggal,
            }
        };
        return downloadData(payload).then(response => {
            if (response.ok) {
                response.blob().then(blob => {
                    saveAs(blob, docName);
                    this.setState({modalShow: false, noDokumen: '', blankoId: 200, userPensiun: null})
                });
            }
        }).catch(function (err) {
        });
    }

    render() {
        const {page, name, modalShow} = this.state
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
                <Modal size="ls" show={modalShow} onHide={this.modalClose} onShow={this.modalOnShow}
                       animation={false} backdrop="static" scrollable={true}>
                    <Modal.Header closeButton style={{backgroundColor: "white"}}>
                        <Modal.Title>Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "#f2f8f9"}}>
                        {this.renderContent()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.downloadFile}>Download
                        </Button>
                    </Modal.Footer>
                </Modal>
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