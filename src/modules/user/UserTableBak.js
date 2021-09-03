import React, {Component, Fragment} from "react";
import {Redirect} from "react-router-dom";
import {
    USER_PAGE_RESPONSE
} from "../../application/plugins/redux/constants/reducActionTypes";
import {defPage} from "../../application/AppConstant";
import {pageUser} from "../../application/plugins/redux/actions/reduxActionUser";
import {connect} from "react-redux";
import TableView from "../../application/plugins/ui/TableView";

class UserTableBak extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            page: 0,
            filter: '',
            directBody: null,
            direct: false
        };
        this.changePage = this.changePage.bind(this)
        this.renderOption = this.renderOption.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
    }

    componentDidMount() {
        this.props.pageUser({
            filter: '',
            page: 0
        })
    }

    componentDidUpdate(props) {
        if (props.crud === this.props.crud) {
            return
        }
        this.setState({id: 0, name: ''})
        this.props.pageUser({filter: '', page: this.state.page})
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

    renderRedirect() {
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/user/update',
                state: {body: JSON.stringify(this.state.directBody)}
            }}/>
        }
    }

    updateUser(o) {
        this.setState({directBody: o, direct: true})
    }

    renderOption(row, o) {
        return (
            <button type="button"
                    className="btn btn-warning btn-sm btn-option"
                    onClick={() => this.updateUser(row)}>
                <i className="mdi mdi-24px mdi-pencil"/>
            </button>
        )
    }

    buildTable() {
        const {users} = this.props
        return Object.assign({
            fields: [
                {
                    title: "OPTION",
                    format: this.renderOption
                },
                {
                    title: "ROLE",
                    key: "role"
                },
                {
                    title: "NIP",
                    key: "nip"
                },
                {
                    title: "NAMA",
                    key: "nama"
                }
            ],
        }, users.result)
    }

    render() {
        const {name} = this.state
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
                                               value={name}
                                               onChange={this.handleChangeName}
                                               placeholder="Search"/>
                                    </div>
                                </div>
                                <TableView model={this.buildTable()}/>
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

export default connect(mapStateToProps, {pageUser})(UserTableBak);