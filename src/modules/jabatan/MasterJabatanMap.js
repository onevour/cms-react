import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {connect} from "react-redux";
import {mergeDocument, pageDocument, removeDocument} from "../../redux/actions/reduxActionMasterDocument";
import {
    DOCUMENT_CRUD_RESPONSE,
    DOCUMENT_PAGE_RESPONSE, JABATAN_CRUD_RESPONSE, JABATAN_LIST, JABATAN_LIST_RESPONSE,
    JABATAN_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentList, emptyContentPage, emptyCrud} from "../../application/AppConstant";
import {listJabatanMap, mergeJabatan, pageJabatan, removeJabatan} from "../../redux/actions/reduxActionMasterJabatan";

class MasterJabatanMap extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.filterJabatan = this.filterJabatan.bind(this)
    }

    componentDidMount() {
        this.props.listJabatanMap({filter: "", page: 0})
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

    renderTable(jabatans, key) {
        let newArray = jabatans.result.filter(item => item.jenis_jabatan === key);
        return (
            newArray.map((o, i) =>
                <tr className="clickable" key={i}>
                    <td>{i + 1}</td>
                    <td>{o.name}</td>
                    <td>{o.kelas_jabatan}</td>
                    <td>{o.ketersediaan}</td>
                    <td>{o.kebutuhan}</td>
                    <td>{o.total}</td>
                </tr>
            )
        )
    }

    render() {
        const {jabatans} = this.props
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Peta Jabatan Fungsional</h4>
                                <div className="form-group row">
                                    <div className="col-md-3">
                                        <p className="card-description">
                                            Direktur SMA (kelas 15)
                                        </p>
                                    </div>
                                    <div className="col-md-6"/>
                                    <div className="col-md-3">
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                No.
                                            </th>
                                            <th>
                                                Jabatan
                                            </th>
                                            <th>
                                                KLS
                                            </th>
                                            <th>
                                                B
                                            </th>
                                            <th>
                                                K
                                            </th>
                                            <th>
                                                +/-
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderTable(jabatans, 'JF')}
                                        </tbody>

                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Peta Jabatan Pelaksana</h4>
                                <div className="form-group row">
                                    <div className="col-md-3">
                                        <p className="card-description">
                                            Kepala Tata Usaha (kelas 15)
                                        </p>
                                    </div>
                                    <div className="col-md-6"/>
                                    <div className="col-md-3">
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                No.
                                            </th>
                                            <th>
                                                Jabatan
                                            </th>
                                            <th>
                                                KLS
                                            </th>
                                            <th>
                                                B
                                            </th>
                                            <th>
                                                K
                                            </th>
                                            <th>
                                                +/-
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderTable(jabatans, 'P')}
                                        </tbody>

                                    </table>
                                </div>

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
        jabatans: (state[JABATAN_LIST_RESPONSE] ? state[JABATAN_LIST_RESPONSE] : emptyContentList),
        crud: (state[JABATAN_CRUD_RESPONSE] ? state[JABATAN_CRUD_RESPONSE] : emptyCrud)
    }
}

export default connect(mapStateToProps, {listJabatanMap, mergeJabatan, removeJabatan})(MasterJabatanMap);