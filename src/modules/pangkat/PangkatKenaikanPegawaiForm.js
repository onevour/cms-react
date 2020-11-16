import React, {Component, Fragment} from "react";
import {Modal} from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import {
    USER_LIST_RESPONSE,
    USER_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentList, emptyContentPage, emptyCrud} from "../../application/AppConstant";
import {connect} from "react-redux";
import {listDocument} from "../../redux/actions/reduxActionMasterDocument";
import {mergePangkatDocument} from "../../redux/actions/reduxActionMasterPangkat";
import {listUserGolongan, pageUser} from "../../redux/actions/reduxActionUser";
import {formatDate} from "../../application/AppCommons";

class PangkatKenaikanPegawaiForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            back: false,
            modalShow: false,
            pangkat: JSON.parse(this.props.location.state.body),
            documents: [],
            users: []
        }
        this.showListPegawai = this.showListPegawai.bind(this)
        this.cancel = this.cancel.bind(this)
        this.modalOnShow = this.modalOnShow.bind(this)
        this.modalClose = this.modalClose.bind(this)
        this.filterUser = this.filterUser.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount(props) {
        this.props.listDocument()
        this.props.listUserGolongan({filter: this.state.pangkat.golongan})
    }

    componentDidUpdate(props) {
        if (props.documents !== this.props.documents) {
            let document_pangkat = []
            const {pangkat} = this.state
            const docs = this.props.documents.result.map((v, i) => {
                pangkat.document_pangkat.map((d, x) => {
                    if (d.value === v.value) {
                        v.check = true
                        document_pangkat.push(v)
                    }
                })
                return v
            })
            this.setState({documents: document_pangkat})
        }
        if (props.crud !== this.props.crud) {
            swal("Update dokumen berhasil!", {icon: "success",}).then((willDelete) => {
                this.setState({back: true})
            });
        }
    }

    onCheckDocument(checked, v) {
        // var docs = this.state.documents.map((o, i) => {
        //     if (o.value === v.value) {
        //         o.check = checked
        //     }
        //     return o
        // })
        // this.setState({documents: docs})
    }

    showListPegawai() {
        this.setState({modalShow: true})
    }

    modalOnShow() {
        this.props.pageUser({filter: "", page: 0})
    }

    modalClose() {
        this.setState({modalShow: false})
    }

    filterUser(event) {
        this.props.pageUser({filter: event.target.value, page: 0})
    }

    submitForm(event) {
        event.preventDefault()
        var docs = []
        for (var i = 0; i < this.state.documents.length; i++) {
            var tmp = this.state.documents[i]
            if (tmp.check) {
                docs.push(tmp)
            }
        }
        const {pangkat} = this.state;
        const param = {
            id: pangkat.id,
            document_pangkat: docs
        }
        this.props.mergePangkatDocument(param)
    }

    cancel(event) {
        event.preventDefault()
        this.setState({back: true})
    }

    addUser(o) {
        // .push(o);
        let found = false
        for (let i = 0; i < this.state.users.length; i++) {
            let tmp = this.state.users[i];
            if (tmp.nip === o.nip) {
                found = true
                break
            }
        }
        if (!found) {
            this.state.users.push(o)
            this.setState({users: this.state.users, modalShow: false})
        } else {
            this.setState({modalShow: false})
        }
    }

    hapusCandidate(o) {
        swal({
            title: "Hapus Pengawai",
            text: "hapus pegawai dari kenaikan pangkat?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let index = -1
                let found = false
                for (let i = 0; i < this.state.users.length; i++) {
                    let tmp = this.state.users[i];
                    if (tmp.nip === o.nip) {
                        found = true
                        index = i
                        break
                    }
                }
                this.state.users.splice(index, 1)
                this.setState({users: this.state.users})
            }
        });
    }

    renderRedirect() {
        if (this.state.back) {
            return <Redirect to={{
                pathname: '/pangkat/kenaikan/pegawai'
            }}/>
        }
    }

    renderDocument(o, index, col) {
        const {documents} = this.props
        const sisa = documents.result.length % 4
        var perPage = 0;
        var min = 0;
        var max = 0;
        if (sisa === 0) {
            perPage = documents.result.length / 4;
        } else {
            perPage = (documents.result.length + (4 - sisa)) / 4;
        }
        min = perPage * col;
        max = (perPage * col + perPage) - 1;
        if (index >= min && index <= max) {
            return (
                <div className="form-group" key={index}>
                    <div className="form-check form-check-flat">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input"
                                   onChange={(event) => {
                                       this.onCheckDocument(event.target.checked, o)
                                   }}
                                   checked={o.check}/>
                            {o.label}
                            <i className="input-helper"/>
                        </label>
                    </div>
                </div>
            )
        }
    }

    render() {
        const {pangkat, documents, users} = this.state
        const {usersPage, usersList} = this.props
        console.log(usersList)
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">{pangkat.nama} ({pangkat.golongan})</h4>
                                <p className="card-description">
                                    Pegawai ({pangkat.golongan})
                                </p>
                                <form className="forms-sample">
                                    <div className="row">
                                        <div className="col-md-3">
                                            {documents.map((o, i) => this.renderDocument(o, i, 0))}
                                        </div>
                                        <div className="col-md-3">
                                            {documents.map((o, i) => this.renderDocument(o, i, 1))}
                                        </div>
                                        <div className="col-md-3">
                                            {documents.map((o, i) => this.renderDocument(o, i, 2))}
                                        </div>
                                        <div className="col-md-3">
                                            {documents.map((o, i) => this.renderDocument(o, i, 3))}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Pegawai</h4>
                                <div className="col">
                                    <button type="submit" style={{marginTop: -10}}
                                            onClick={this.showListPegawai}
                                            className="btn btn-success btn-sm mr-2 float-right">Add
                                    </button>
                                </div>
                                <p className="card-description">
                                    List pegawai ke pangkat {pangkat.nama} ({pangkat.golongan})
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                NIP
                                            </th>
                                            <th>
                                                Nama
                                            </th>
                                            <th>
                                                Tempat, Tgl Lahir
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            usersList.result.map((o, i) =>
                                                <tr className="clickable" key={i}>
                                                    <td className="py-1">
                                                        <button type="button"
                                                                className="btn btn-danger btn-sm btn-option"
                                                                onClick={() => this.hapusCandidate(o)}>
                                                            <i className="mdi mdi-24px mdi-delete-circle"/>
                                                        </button>
                                                    </td>
                                                    <td>{o.nip}</td>
                                                    <td>{o.nama}</td>
                                                    <td>{o.tempat_lahir}, {formatDate(o.tanggal_lahir)}</td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}

                <Modal size="lg" show={this.state.modalShow} onHide={this.modalClose} onShow={this.modalOnShow}
                       animation={false} centered>
                    <Modal.Header closeButton style={{backgroundColor: "white"}}>
                        <Modal.Title>List Pegawai</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "white"}}>
                        <div className="form-group row">
                            <div className="col-md-3">
                                <p className="card-description">
                                    Pangkat golongan
                                </p>
                            </div>
                            <div className="col-md-6"/>
                            <div className="col-md-3">
                                <input type="text" className="form-control" placeholder="Search"
                                       onChange={this.filterUser}
                                />
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>
                                        NIP
                                    </th>
                                    <th>
                                        Nama
                                    </th>
                                    <th>
                                        Tempat, Tgl Lahir
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    usersPage.result.values.map((o, i) =>
                                        <tr className="clickable" key={i} onClick={() => {
                                            this.addUser(o)
                                        }}>
                                            <td>{o.nip}</td>
                                            <td>{o.nama}</td>
                                            <td>{o.tempat_lahir}, {formatDate(o.tanggal_lahir)}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "white"}}>

                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }

}


function mapStateToProps(state) {
    return {
        usersPage: (state[USER_PAGE_RESPONSE] ? state[USER_PAGE_RESPONSE] : emptyContentPage),
        usersList: (state[USER_LIST_RESPONSE] ? state[USER_LIST_RESPONSE] : emptyContentList)
    }
}

export default connect(mapStateToProps, {pageUser, listUserGolongan, listDocument})(PangkatKenaikanPegawaiForm);
