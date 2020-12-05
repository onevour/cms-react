import React, {Component, Fragment} from "react";
import {Button, Modal} from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import {Redirect} from "react-router-dom";
import {getFileExtension} from "../../application/AppCommons";
import {connect} from "react-redux";
import {
    loadMasterDocument,
    loadUserDocument,
    removeUserDocument,
    userUploadDocument
} from "../../redux/actions/reduxActionDataDigital";
import swal from "sweetalert";
import {BASE_URL} from "../../redux/constants/reducActionTypes";

class KenaikanPangkatDokumenForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            back: false,
            user: JSON.parse(localStorage.getItem('user')),
            pangkat: JSON.parse(this.props.location.state.body)
        }
        this.cancel = this.cancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        // this.handleChangeFile = this.handleChangeFile.bind(this)
        this.handleModalShowHide = this.handleModalShowHide.bind(this)
    }

    componentDidMount(props) {
        this.props.loadUserDocument()
        if (this.props.location.state === undefined) {
            return true
        }
        // const param = JSON.parse(this.props.location.state.body)
        // console.log("body", param);
    }

    handleModalShowHide() {
        this.setState({showHide: !this.state.showHide})
    }

    handleChange(value, formattedValue) {
        this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    componentDidUpdate(props) {
        console.log(this.props.uploadDocument)
        if (props.uploadDocument !== this.props.uploadDocument) {
            //swal("Cuti", "Pengajuan cuti berhasil!", "success");
            // this.props.loadUserDocument()
        }
        if (props.userDocument !== this.props.userDocument) {
            // this.props.loadUserDocument()
        }
    }

    cancel() {
        this.setState({back: true})
    }

    renderRedirect() {
        if (this.state.back) {
            return <Redirect to={{
                pathname: '/kenaikan_pangkat'
            }}/>
        }
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

    renderDownloadView(o, userDocument) {
        if (userDocument.result) {
            let value = null
            for (let i = 0; i < userDocument.result.length; i++) {
                let tmp = userDocument.result[i]
                if (tmp.document.value === o.value) {
                    value = tmp
                    break
                }
            }
            if (value && value.path) {
                return (
                    <a href="#" style={{marginTop: -10}}
                       onClick={() => {
                           const {user} = this.state
                           fetch(BASE_URL + '/user/download/digital/' + user.nip + '/' + value.id)
                               .then(response => {
                                   if (response.ok) {
                                       response.blob().then(blob => {
                                           let url = window.URL.createObjectURL(blob);
                                           let a = document.createElement('a');
                                           a.href = url;
                                           a.download = user.nip + '-' + value.document.label + '.' + getFileExtension(value.path);
                                           a.click();
                                       });
                                   }
                               }).catch(function (err) {
                           });
                       }}>download</a>
                )
            }
        }

    }

    renderTableData(userDocument) {
        if (!this.state.pangkat.pangkat_golongan) {
            return;
        }
        if (!this.state.pangkat.pangkat_golongan.document_pangkat) {
            return;
        }
        return this.state.pangkat.pangkat_golongan.document_pangkat.map((o, i) => {

            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{o.label}</td>
                    <td><input type="file" onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                            this.handleChangeFile(file, o)
                        }
                    }}/></td>
                    <td>{this.renderDownloadView(o, userDocument)}</td>
                </tr>
            )
        })
    }

    render() {
        const {userDocument} = this.props
        console.log(userDocument)
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Dokumen Kenaikan Pangkat</h4>
                                <p className="card-description">
                                    Dokumen pegawai
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
                                                Opsi
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderTableData(userDocument)}
                                        </tbody>
                                    </table>
                                </div>
                                <button className="btn mt-3" onClick={this.cancel}>Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        masterDocument: state.masterDocument.result,
        uploadDocument: state.uploadDocument,
        userDocument: state.userDocument
    }
}

export default connect(
    mapStateToProps, {userUploadDocument, loadUserDocument}
)(KenaikanPangkatDokumenForm)