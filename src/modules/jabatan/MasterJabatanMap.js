import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {connect} from "react-redux";
import {mergeDocument, pageDocument, removeDocument} from "../../redux/actions/reduxActionMasterDocument";
import {
    DOCUMENT_CRUD_RESPONSE,
    DOCUMENT_PAGE_RESPONSE, JABATAN_CRUD_RESPONSE, JABATAN_LIST, JABATAN_LIST_RESPONSE,
    JABATAN_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentList, emptyContentPage, emptyCrud, JENIS_CUTI, STATUS_PEGAWAI} from "../../application/AppConstant";
import {listJabatanMap, mergeJabatan, pageJabatan, removeJabatan} from "../../redux/actions/reduxActionMasterJabatan";
import Select from "react-select";
import moment from "moment";

class MasterJabatanMap extends Component {


    constructor(props) {
        super(props);
        this.state = {}
        this.filterJabatan = this.filterJabatan.bind(this)
        this.handleChangeYear = this.handleChangeYear.bind(this)
    }

    handleChangeYear(event){
        this.props.listJabatanMap({year: event.value})
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

    totalType(jabatans, type, key) {
        let count = 0
        jabatans.result.filter(item => {
            if (item.jenis_jabatan === type) {
                count = count + item[key]
                return true
            }
            return false
        })
        return count
    }

    renderTableSummary(jabatans,) {
        //let newArray = jabatans.result.filter(item => item.jenis_jabatan === key);
        let values = [
            {
                name: "JPT Pratama",
                ketersediaan: 0,
                kebutuhan: 0
            },
            {
                name: "Jabatan Fungsional",
                ketersediaan: this.totalType(jabatans, 'JF', 'ketersediaan'),
                kebutuhan: this.totalType(jabatans, 'JF', 'kebutuhan')
            },
            {
                name: "Pengawas",
                ketersediaan: 0,
                kebutuhan: 0
            },
            {
                name: "Pelaksana",
                ketersediaan: this.totalType(jabatans, 'P', 'ketersediaan'),
                kebutuhan: this.totalType(jabatans, 'P', 'kebutuhan')
            }
        ]
        return (
            values.map((o, i) =>
                <tr className="clickable" key={i}>
                    <td>{i + 1}</td>
                    <td>{o.name}</td>
                    <td>{o.ketersediaan}</td>
                    <td>{o.kebutuhan}</td>
                    <td>{o.ketersediaan- o.kebutuhan}</td>
                </tr>
            )
        )
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

    selectValue() {
        let years = []
        let year = moment().year()
        for (let i = year; i < year + 35; i++) {
            years.push({
                value: i,
                label: i
            })
        }

        return years
    }

    render() {
        const {jabatans} = this.props
        console.log(jabatans)
        return (
            <Fragment>

                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Summary</h4>
                                <div className="form-group row">
                                    <div className="col-md-3">
                                        <p className="card-description">
                                        </p>
                                    </div>
                                    <div className="col-md-6"/>
                                    <div className="col-md-3">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Tahun</label>
                                            <div className="col-sm-9">
                                                <Select className="form-control select-tmd" options={this.selectValue()}
                                                        onChange={this.handleChangeYear}
                                                        label="Pilih Tahun"/>
                                            </div>
                                        </div>
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
                                                Kelas
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
                                        {this.renderTableSummary(jabatans)}
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
        jabatans: (state[JABATAN_LIST_RESPONSE] ? state[JABATAN_LIST_RESPONSE] : emptyContentList)
    }
}

export default connect(mapStateToProps, {listJabatanMap, mergeJabatan, removeJabatan})(MasterJabatanMap);