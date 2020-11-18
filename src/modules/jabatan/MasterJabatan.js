import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {connect} from "react-redux";
import {mergeDocument, pageDocument, removeDocument} from "../../redux/actions/reduxActionMasterDocument";
import {
    DOCUMENT_CRUD_RESPONSE,
    DOCUMENT_PAGE_RESPONSE, JABATAN_CRUD_RESPONSE,
    JABATAN_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentPage, emptyCrud} from "../../application/AppConstant";
import {mergeJabatan, pageJabatan, removeJabatan} from "../../redux/actions/reduxActionMasterJabatan";

class MasterJabatan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            id: 0,
            name: '',
            jenis_jabatan: '',
            kelas_jabatan: '0',
            kebutuhan: '0',
            errorName: '',
            errorJenis: '',
            errorKelas: '',
        };
        this.changePage = this.changePage.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeJenis = this.handleChangeJenis.bind(this)
        this.handleChangeKelas = this.handleChangeKelas.bind(this)
        this.handleChangeKebutuhan = this.handleChangeKebutuhan.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.cancel = this.cancel.bind(this)
        this.filterJabatan = this.filterJabatan.bind(this)
    }

    componentDidMount() {
        this.props.pageJabatan({filter: "", page: 0})
    }

    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.setState({id: 0, name: ''})
            this.props.pageJabatan({filter: "", page: this.state.page})
        }
        if (props.documents !== this.props.documents) {


        }
    }

    filterJabatan(event) {
        this.setState({filter: event.target.value})
        this.props.pageJabatan({filter: event.target.value, page: 0})
    }

    changePage(page) {
        this.setState({page: page - 1});
        this.props.pageJabatan({filter: "", page: page - 1})
    }

    handleChangeName(event) {
        console.log(event.target.value)
        this.setState({name: event.target.value})
    }

    handleChangeJenis(event) {
        console.log(event.target.value)
        this.setState({jenis_jabatan: event.target.value})
    }

    handleChangeKelas(event) {
        console.log(event.target.value)
        this.setState({kelas_jabatan: event.target.value})
    }

    handleChangeKebutuhan(event) {
        console.log(event.target.value)
        this.setState({kebutuhan: event.target.value})
    }

    cancel(event) {
        event.preventDefault()
        this.setState({
            id: 0,
            name: '',
            jenis_jabatan: '',
            kelas_jabatan: '0',
            kebutuhan: '0',
            errorName: '',
            errorJenis: '',
            errorKelas: '',
        })
    }

    delete(o) {
        const request = {
            id: o.value
        }
        console.log("request form")
        this.props.removeJabatan(request);
    }

    update(o) {
        this.setState({
            id: o.id,
            name: o.name,
            jenis_jabatan: o.jenis_jabatan,
            kelas_jabatan: o.kelas_jabatan,
            kebutuhan: (o.kebutuhan ? o.kebutuhan : '0')
        })
    }

    submitForm(event) {
        event.preventDefault()
        const {id, name, jenis_jabatan, kelas_jabatan, kebutuhan} = this.state
        console.log(kebutuhan)
        if (!(name) || '' === name) {
            this.setState({errorName: 'nama jabatan harus diisi'})
            return true
        }
        if (!(jenis_jabatan) || '' === jenis_jabatan) {
            this.setState({errorJenis: 'jenis jabatan harus diisi'})
            return true
        }
        if (0 === kelas_jabatan) {
            this.setState({errorKelas: 'kelas jabatan tidak boleh 0!'})
            return true
        }
        const request = {
            id: id,
            name: name,
            jenis_jabatan: jenis_jabatan,
            kelas_jabatan: parseInt(kelas_jabatan),
            kebutuhan: parseInt(kebutuhan)
        }
        console.log("submit", request)
        this.props.mergeJabatan(request)
    }

    render() {
        const {page, name, jenis_jabatan, kelas_jabatan, kebutuhan} = this.state
        const {jabatans} = this.props
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-3 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Jabatan</h4>
                                <form className="forms-sample" ref={(ref) => this.formRef = ref}
                                      onSubmit={this.submitForm}
                                      noValidate>
                                    <div className="form-group">
                                        <label>Nama</label>
                                        <input type="text" className="form-control" placeholder="Nama jabatan"
                                               value={name}
                                               onChange={this.handleChangeName}/>
                                        <span className="text-danger">{this.state.errorName}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Jenis</label>
                                        <input type="text" className="form-control" placeholder="Jenis jabatan"
                                               value={jenis_jabatan}
                                               onChange={this.handleChangeJenis}/>
                                        <span className="text-danger">{this.state.errorJenis}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Kelas</label>
                                        <input type="number" className="form-control" placeholder="Kelas jabatan"
                                               value={kelas_jabatan}
                                               onChange={this.handleChangeKelas}/>
                                        <span className="text-danger">{this.state.errorKelas}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Kebutuhan</label>
                                        <input pattern="[0-9]*" type="number" className="form-control"
                                               placeholder="Kebutuhan"
                                               value={kebutuhan}
                                               onChange={this.handleChangeKebutuhan}/>
                                    </div>
                                    <button type="submit" className="btn btn-success mr-2">Submit</button>
                                    <button className="btn" onClick={this.cancel}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Jabatan</h4>
                                <div className="form-group row">
                                    <div className="col-md-3">
                                        <p className="card-description">
                                            Jabatan pegawai
                                        </p>
                                    </div>
                                    <div className="col-md-6"/>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" placeholder="Search"
                                               onChange={this.filterJabatan}
                                        />
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                Opsi
                                            </th>
                                            <th>
                                                Jabatan
                                            </th>
                                            <th>
                                                JJ
                                            </th>
                                            <th>
                                                KJ
                                            </th>
                                            <th>
                                                K
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            jabatans.result.values.map((o, i) =>
                                                <tr className="clickable" key={i}>
                                                    <td>
                                                        <button type="button"
                                                                className="btn btn-danger btn-sm btn-option mr-2"
                                                                onClick={() => this.delete(o)}>
                                                            <i className="mdi mdi-24px mdi-delete-circle"/>
                                                        </button>
                                                        <button type="button"
                                                                className="btn btn-warning btn-sm btn-option"
                                                                onClick={() => this.update(o)}>
                                                            <i className="mdi mdi-24px mdi-pencil"/>
                                                        </button>
                                                    </td>
                                                    <td>{o.name}</td>
                                                    <td>{o.jenis_jabatan}</td>
                                                    <td>{o.kelas_jabatan}</td>
                                                    <td>{(o.kebutuhan ? o.kebutuhan : 0)}</td>
                                                </tr>
                                            )
                                        }
                                        </tbody>

                                    </table>
                                </div>
                                <Pagination
                                    totalPages={jabatans.result.page_total}
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
        jabatans: (state[JABATAN_PAGE_RESPONSE] ? state[JABATAN_PAGE_RESPONSE] : emptyContentPage),
        crud: (state[JABATAN_CRUD_RESPONSE] ? state[JABATAN_CRUD_RESPONSE] : emptyCrud)
    }
}

export default connect(mapStateToProps, {pageJabatan, mergeJabatan, removeJabatan})(MasterJabatan);