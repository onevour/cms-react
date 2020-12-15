import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {
    BASE_URL, DUK_FILTER_PARAM, DUK_FILTER_PARAM_RESPONSE,
    DUK_PAGE_RESPONSE, USER_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {defPage, emptyContentPage, emptyCrud, MAX_PENSIUN, STATUS_PEGAWAI} from "../../application/AppConstant";
import {connect} from "react-redux";
import {listDuk, pageDuk, paramDuk} from "../../redux/actions/reduxActionMasterDUK";
import {formatDate} from "../../application/AppCommons";
import moment from "moment";
import Select from "react-select";
import {pageUser} from "../../redux/actions/reduxActionUser";
import {Redirect} from "react-router-dom";


class User extends Component {

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
            page: 0
        })
    }


    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.setState({id: 0, name: ''})
            this.props.pageUser({filter: "", page: this.state.page})
        }
    }

    changePage(page) {
        this.setState({page: page - 1})
        const request = {
            filter: this.state.name,
            page: page - 1
        }
        this.props.pageUser(request)
    }

    handleChangeName(event) {
        this.setState({name: event.target.value})
        const request = {
            filter: event.target.value,
            page: 0
        }
        this.props.pageUser(request)
    }

    renderHeader() {
        return (
            <thead>
            <tr>
                <th>Opsi</th>
                <th>Role</th>
                <th>NIP</th>
                <th>Nama</th>
            </tr>
            </thead>

        )
    }

    updateUser(o) {
        this.setState({directBody: o, direct: true})
    }

    renderRedirect() {
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/user/update',
                state: {body: JSON.stringify(this.state.directBody)}
            }}/>
        }
    }

    renderOption(o) {
        return (
            <button type="button"
                    className="btn btn-warning btn-sm btn-option"
                    onClick={() => this.updateUser(o)}>
                <i className="mdi mdi-24px mdi-pencil"/>
            </button>
        )
    }

    renderTable(users) {
        return (
            users.result.values.map((o, i) =>
                <tr className="clickable" key={i}>
                    <td>{this.renderOption(o)}</td>
                    <td>{o.role}</td>
                    <td>{o.nip}</td>
                    <td>{o.nama}</td>
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
                                <h4 className="card-title">Data Pegawai</h4>
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
                {this.renderRedirect()}
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: defPage(state, USER_PAGE_RESPONSE)
    }
}

export default connect(mapStateToProps, {pageUser, listDuk, paramDuk})(User);