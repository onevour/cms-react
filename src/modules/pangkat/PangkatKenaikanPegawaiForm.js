import React, {Component, Fragment} from "react";
import {Modal} from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import {
    USER_HISTORY_PANGKAT_CRUD_RESPONSE,
    USER_LIST_RESPONSE,
    USER_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentList, emptyContentPage, emptyCrud} from "../../application/AppConstant";
import {connect} from "react-redux";
import {listDocument} from "../../redux/actions/reduxActionMasterDocument";
import {mergePangkatDocument} from "../../redux/actions/reduxActionMasterPangkat";
import {addPangkat, listUserGolongan, pageUser, removePangkat} from "../../redux/actions/reduxActionUser";
import {disableBeforeDay, formatDate} from "../../application/AppCommons";
import Button from "react-bootstrap/Button";
import moment from "moment-timezone";
import Datetime from "react-datetime";

class PangkatKenaikanPegawaiForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            back: false,
            modalShow: false,
            pangkat: JSON.parse(this.props.location.state.body),
            errorTMT: '',
            documents: [],
            users: [],
            // modal state
            modalState: 0,
            tmtDate: null,
            modalUserSelected: [],
        }
        this.showListPegawai = this.showListPegawai.bind(this)
        this.cancel = this.cancel.bind(this)
        this.modalOnShow = this.modalOnShow.bind(this)
        this.modalClose = this.modalClose.bind(this)
        this.filterUser = this.filterUser.bind(this)
        this.submitForm = this.submitForm.bind(this)
        // modal
        this.modalNext = this.modalNext.bind(this)
        this.selectTMT = this.selectTMT.bind(this)
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
        if (props.usersCrud !== this.props.usersCrud) {
            this.setState({
                back: false,
                modalShow: false,
                users: [],
                // modal state
                modalState: 0,
                tmt: null,
                errorTMT: '',
                modalUserSelected: []
            })
            this.props.listUserGolongan({filter: this.state.pangkat.golongan})
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
        this.setState({modalShow: false, modalState: 0})
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

    // ini jadi array
    addUser(newUsers) {
        // .push(o);
        let found = false
        let removeIndex = []
        for (let i = 0; i < this.state.users.length; i++) {
            let tmp = this.state.users[i];
            for (let x = 0; x < newUsers.length; x++) {
                let tmpNew = newUsers[x];
                if (tmpNew.nip === tmp.nip) {
                    removeIndex.push(removeIndex)
                    break
                }
            }
        }
        // clear user already exist
        for (let x = 0; x < removeIndex.length; x++) {
            newUsers.splice(x, 1)
        }
        if (newUsers.length === 0) {
            // reset and return false
            this.setState({
                back: false,
                modalShow: false,
                users: [],
                // modal state
                modalState: 0,
                errorTMT: '',
                tmt: null,
                modalUserSelected: [],
            })
        }

        let pangkat = this.state.pangkat
        // pangkat.tmt = this.state.tmtDate.format()
        pangkat.sumber_data = 'TEMAN_DAWAI'
        const param = {
            pangkat: pangkat,
            users: newUsers
        }
        this.props.addPangkat(param)
        console.log(param)
        /*
        if (this.state.tmtDate) {
            let pangkat = this.state.pangkat
            pangkat.tmt = this.state.tmtDate.format()
            pangkat.sumber_data = 'TEMAN_DAWAI'
            const param = {
                pangkat: pangkat,
                users: newUsers
            }
            this.props.addPangkat(param)
            console.log(param)
        } else {
            this.setState({errorTMT: 'pilih tanggal tmt'})
        }
         */

        // push to server, reset default

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
                /*
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
                 */
                const param = {
                    pangkat: this.state.pangkat,
                    nip: o.nip,
                }
                this.props.removePangkat(param)
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

    findSumberData(o) {
        const {pangkat} = this.state
        let sumberData = '-';
        for (let i = 0; i < o.pangkats.length; i++) {
            let tmp = o.pangkats[i];
            if (tmp.pangkat_golongan && tmp.pangkat_golongan.id === pangkat.id) {
                sumberData = tmp.sumber_data
                break
            }
        }
        return sumberData;
    }

    renderOption(o) {
        if ('SIMPEG' === this.findSumberData(o)) {
            return (<></>)
        }
        return (
            <button type="button"
                    className="btn btn-danger btn-sm btn-option"
                    onClick={() => this.hapusCandidate(o)}>
                <i className="mdi mdi-24px mdi-delete-circle"/>
            </button>
        )
    }

    renderSumberData(o) {
        if (!(o.pangkats)) {
            return (<>-</>)
        }
        let sumberData = this.findSumberData(o);
        return (<>{sumberData.replace(/_/g, ' ')}</>)

    }

    renderDocument(o, index, col) {
        const {pangkat} = this.state
        const sisa = pangkat.document_pangkat.length % 4
        var perPage = 0;
        var min = 0;
        var max = 0;
        if (sisa === 0) {
            perPage = pangkat.document_pangkat.length / 4;
        } else {
            perPage = (pangkat.document_pangkat.length + (4 - sisa)) / 4;
        }
        min = perPage * col;
        max = (perPage * col + perPage) - 1;
        if (index >= min && index <= max) {
            return (
                <div className="form-group" key={index}>
                    <div className="form-check form-check-flat">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" checked={true}/>
                            {o.label}
                            <i className="input-helper"/>
                        </label>
                    </div>
                </div>
            )
        }
    }


    // modal action

    modalNext() {
        if (this.state.modalState === 0) {
            this.setState({modalState: 1})
            return true
        }
        this.addUser(this.state.modalUserSelected)
    }

    addUserSelected(o) {
        if (this.userIsSelected(o)) {
            let users = this.state.modalUserSelected
            let index = -1;
            for (var i = 0; i < users.length; i++) {
                let tmp = users[i];
                if (tmp.nip === o.nip) {
                    index = i
                    break
                }
            }
            if (index >= 0) {
                users.splice(index, 1)
                this.setState({modalUserSelected: users})
                return true
            }
        }
        this.state.modalUserSelected.push(o)
        this.setState({modalUserSelected: this.state.modalUserSelected})
    }

    userIsSelected(o) {
        const users = this.state.modalUserSelected
        for (var i = 0; i < users.length; i++) {
            let tmp = users[i];
            if (tmp.nip === o.nip) {
                return true
            }
        }
        return false
    }

    selectTMT(e) {
        this.setState({tmtDate: e})
    }

    // modal rendered

    renderModalContent(usersPage) {
        const {modalState, modalUserSelected} = this.state
        if (modalState > 0) {
            return (
                <>
                    <div className="form-group row">
                        <div className="col-md-4">
                            <div className="form-group row">
                                <label className="col-sm-12 col-form-label">Jumlah pegawai kenaikan pangkat</label>
                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">TMT</label>
                                <div className="col-sm-9">
                                    <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}
                                              ref={this.finishDateRef}
                                              onChange={this.selectTMT}/>

                                </div>
                                <span className="text-danger">{this.state.errorTMT}</span>
                            </div>
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
                                modalUserSelected.map((o, i) =>
                                    <tr className="clickable" key={i} onClick={() => {
                                        //this.addUser(o)
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
                </>
            )


            //
        }

        return (
            <>
                <div className="form-group row">
                    <div className="col-md-4">
                        <div className="form-group row">
                            <label className="col-sm-12 col-form-label">Pilih pegawai kenaikan pangkat
                                ({modalUserSelected.length})</label>
                        </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label"/>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" placeholder="Search"
                                       onChange={this.filterUser}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>
                                Pilih
                            </th>
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
                                    this.addUserSelected(o)
                                }}>
                                    <td>
                                        <input style={{height: 22, width: 22, marginTop: -10, marginLeft: 10}}
                                               type="radio" className="form-check-input"
                                               checked={this.userIsSelected(o)}/>
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
            </>
        )
    }

    render() {
        const {pangkat} = this.state
        const {usersPage, usersList} = this.props
        console.log(pangkat)
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">{pangkat.nama} ({pangkat.golongan})</h4>
                                <p className="card-description">
                                    Pegawai ({pangkat.golongan}), Jumlah dokument yang dibutuhkan
                                    ({pangkat.document_pangkat.length})
                                </p>
                                <form className="forms-sample">
                                    <div className="row">
                                        <div className="col-md-3">
                                            {pangkat.document_pangkat.map((o, i) => this.renderDocument(o, i, 0))}
                                        </div>
                                        <div className="col-md-3">
                                            {pangkat.document_pangkat.map((o, i) => this.renderDocument(o, i, 1))}
                                        </div>
                                        <div className="col-md-3">
                                            {pangkat.document_pangkat.map((o, i) => this.renderDocument(o, i, 2))}
                                        </div>
                                        <div className="col-md-3">
                                            {pangkat.document_pangkat.map((o, i) => this.renderDocument(o, i, 3))}
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
                                                Opsi
                                            </th>
                                            <th>
                                                NIP
                                            </th>
                                            <th>
                                                Nama
                                            </th>
                                            <th>
                                                Tempat, Tgl Lahir
                                            </th>
                                            <th>
                                                Sumber
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            usersList.result.map((o, i) =>
                                                <tr className="clickable" key={i}>
                                                    <td className="py-1">
                                                        {this.renderOption(o)}
                                                    </td>
                                                    <td>{o.nip}</td>
                                                    <td>{o.nama}</td>
                                                    <td>{o.tempat_lahir}, {formatDate(o.tanggal_lahir)}</td>
                                                    <td>{this.renderSumberData(o)}</td>
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
                       animation={false} backdrop="static">
                    <Modal.Header closeButton style={{backgroundColor: "white"}}>
                        <Modal.Title>List Pegawai</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "white"}}>
                        {this.renderModalContent(usersPage)}
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: "white"}}>
                        <Button variant="secondary" onClick={() => {
                            const stateModal = this.state.modalState
                            if (stateModal === 1) {
                                this.setState({modalState: 0})
                            } else {
                                this.modalClose()
                            }

                        }}>{this.state.modalState === 0 ? 'CLOSE' : 'BACK'}</Button>
                        <Button variant="primary"
                                onClick={this.modalNext}>{this.state.modalState === 0 ? 'NEXT' : 'SAVE'}</Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }

}


function mapStateToProps(state) {
    return {
        usersPage: (state[USER_PAGE_RESPONSE] ? state[USER_PAGE_RESPONSE] : emptyContentPage),
        usersList: (state[USER_LIST_RESPONSE] ? state[USER_LIST_RESPONSE] : emptyContentList),
        usersCrud: (state[USER_HISTORY_PANGKAT_CRUD_RESPONSE] ? state[USER_HISTORY_PANGKAT_CRUD_RESPONSE] : emptyCrud)
    }
}

export default connect(mapStateToProps, {
    pageUser,
    listUserGolongan,
    addPangkat,
    removePangkat,
    listDocument
})(PangkatKenaikanPegawaiForm);
