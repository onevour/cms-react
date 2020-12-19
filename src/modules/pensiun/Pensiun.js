import React, {Component, Fragment} from "react";
import moment from "moment-timezone";
import {Button, Modal} from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import {connect} from "react-redux";
import {loadUserDocument, userUploadDocument} from "../../redux/actions/reduxActionDataDigital";
import {
    BASE_URL,
    UPLOAD_DOCUMENT_RESPONSE, USER_DOCUMENT_RESPONSE,
    USER_HISTORY_PANGKAT_LIST_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {defCrud, defList, emptyContentList, MAX_PENSIUN} from "../../application/AppConstant";
import {listUserHistoryPangkat} from "../../redux/actions/reduxActionUser";
import {formatDate, getFileExtension} from "../../application/AppCommons";
import DocumentViewer from "../../plugins/DocumentViewer";

class Pensiun extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            url: '',
            path: '',
            modalShow: false
        }
        this.onModalClose = this.onModalClose.bind(this)
    }

    componentDidMount(props) {
        this.props.loadUserDocument()
        this.props.listUserHistoryPangkat()
    }

    componentDidUpdate(props) {
        if (props.uploads !== this.props.uploads) {
            this.props.loadUserDocument()
            this.props.listUserHistoryPangkat()
        }
    }

    pensiunDocument() {
        const {pangkats} = this.props
        for (let i = 0; i < pangkats.result.length; i++) {
            const o = pangkats.result[i]
            if ((o.pangkat_golongan) && 18 === o.pangkat_golongan.id) {
                if (o.pangkat_golongan) {
                    // console.log(o.pangkat_golongan)
                    return o.pangkat_golongan.document_pangkat
                } else return []
            }
        }
        return []
    }

    handleChangeFile(file, o) {
        new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                const param = {
                    type: o.value,
                    ext: getFileExtension(file.name),
                    file: fileReader.result
                }
                if ('' === param.ext) {
                    return true
                }
                this.props.userUploadDocument(param)
            }
            fileReader.onerror = (error) => {
                this.setState({ext: '', file: ''})
                // reject(error);
            }
        })
    }

    renderStatus(o, userDocument) {
        if (userDocument) {
            // // console.log(o)
            let value = null
            for (let i = 0; i < userDocument.length; i++) {
                let tmp = userDocument[i]
                // // console.log(tmp)
                if (tmp.document.value === o.value) {
                    value = tmp
                    break
                }
            }
            if (value && value.path) {
                return (
                    <>Tersedia</>
                )
            }
            return (
                <>Tidak Tersedia</>
            )
        }

    }

    renderDownloadView(o, userDocument) {
        // console.log(userDocument)
        const {user} = this.state
        if (userDocument) {
            // // console.log(o)
            let value = null
            for (let i = 0; i < userDocument.length; i++) {
                let tmp = userDocument[i]
                // // console.log(tmp)
                if (tmp.document.value === o.value) {
                    value = tmp
                    break
                }
            }
            if (value && value.path) {
                return (
                    <>

                        <button type="button"
                                className="btn btn-success btn-sm btn-option mr-2"
                                onClick={() => {
                                    fetch(BASE_URL + '/user/download/digital/' + user.nip + '/' + value.id)
                                        .then(response => {
                                            if (response.ok) {
                                                response.blob().then(blob => {
                                                    let url = window.URL.createObjectURL(blob);
                                                    let a = document.createElement('a');
                                                    a.href = url;
                                                    a.download = user.nip + '-' + value.document + '.' + getFileExtension(value.path);
                                                    a.click();
                                                });
                                            }
                                        }).catch(function (err) {
                                    })
                                }}>
                            <i className="mdi mdi-24px mdi-download"/>
                        </button>
                        <button type="button"
                                className="btn btn-success btn-sm btn-option mr-2"
                                onClick={() => {
                                    this.setState({
                                        url: BASE_URL + '/user/download/digital/' + user.nip + '/' + value.id,
                                        modalShow: true,
                                        path: value.path
                                    })
                                }}>
                            <i className="mdi mdi-24px mdi-magnify-plus-outline"/>
                        </button>
                    </>
                )
            }
        }
    }

    onModalClose() {
        // console.log("callback from child")
        this.setState({modalShow: false})
    }

    renderTableData(documents, userDocument) {
        return documents.map((o, i) => {
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{o.label}</td>
                    <td>
                        <input type="file" onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                                this.handleChangeFile(file, o)
                            }
                        }}/>
                    </td>
                    <td>{this.renderStatus(o, userDocument)}</td>
                    <td>{this.renderDownloadView(o, userDocument)}</td>
                </tr>
            )
        })
    }


    render() {
        const documents = this.pensiunDocument()
        // console.log(documents)
        const {userDocument} = this.props
        const {user, url, modalShow, path} = this.state
        // validate pensiun
        let pensiun = moment(user.tanggal_lahir).add(MAX_PENSIUN, 'years');
        let diff = pensiun.diff(moment())
        let duration = moment.duration(diff)
        // console.log(duration.years(), duration.months(), moment(user.tanggal_lahir).format("MM-DD-YYYY"))
        let isPensiun = duration.years() === 0 || duration.years() <= 0

        if (!isPensiun) {
            return (
                <Fragment>
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h4 className="card-title">Anda belum memasuki masa pensiun</h4>
                                    <p className="card-description">
                                        Perkiraan pensiun
                                        anda:<b> {formatDate(pensiun)}</b> ({duration.years()} Tahun {duration.months()} Bulan)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        let label_pensiun = duration.years() + ' Tahun ' + duration.months() + ' Bulan'
        if (duration.years() < 0) {
            label_pensiun = 'Sudah Pensiun'
        }
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Dokumen Pensiun</h4>
                                <p className="card-description">
                                    Perkiraan pensiun anda
                                    anda:<b> {formatDate(pensiun)}</b> ({label_pensiun})
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                No
                                            </th>
                                            <th>
                                                Dokumen
                                            </th>
                                            <th>
                                                File
                                            </th>
                                            <th>
                                                File Digital
                                            </th>
                                            <th>
                                                Opsi
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.renderTableData(documents, userDocument.result)
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DocumentViewer url={url} modalShow={modalShow} path={path} callback={this.onModalClose}/>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        userDocument: defList(state, USER_DOCUMENT_RESPONSE),
        uploads: defCrud(state, UPLOAD_DOCUMENT_RESPONSE),
        pangkats: defList(state, USER_HISTORY_PANGKAT_LIST_RESPONSE)
    }
}

export default connect(
    mapStateToProps, {userUploadDocument, listUserHistoryPangkat, loadUserDocument}
)(Pensiun)