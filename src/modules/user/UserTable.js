import React, {Fragment} from "react";
import {
    USER_CRUD_RESPONSE,
    USER_PAGE_RESPONSE
} from "../../application/plugins/redux/constants/reducActionTypes";
import {defCrud, defPage} from "../../application/AppConstant";
import {pageUser, removeUser} from "../../application/plugins/redux/actions/reduxActionUser";
import {connect} from "react-redux";
import TableView, {} from "../../application/plugins/ui/TableView";
import BaseComponent from "../../application/base/BaseComponent";
import swal from "sweetalert";

class UserTable extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {}
        this.renderOption = this.renderOption.bind(this)
        this.createUser = this.createUser.bind(this)
        this.updatePage = this.updatePage.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
    }

    componentDidMount() {
        this.updatePage(0)
    }

    componentDidUpdate(props) {
        if (this.isUpdate(props, "user_page")) {
            this.httpHandler("User", "user_page")
            console.log("props is update")
        }
        if (this.isUpdate(props, "user_crud")) {
            this.httpHandler("User", "user_crud", () => {
                swal("Remove user", "user removed success", "info")
                this.loadPage()

            })
            console.log("props is update")
        }
    }

    updateFilter(event) {
        this.setState({filter: this.valueField(event)}, () => this.loadPage())
    }

    updatePage(page) {
        this.setState({page: page}, () => this.loadPage())
    }

    loadPage() {
        const {filter, page} = this.state
        const request = {
            filter: filter || '',
            page: page
        }
        this.props.pageUser(request)
    }

    createUser() {
        this.updateUser({is_create: true})
    }

    updateUser(o) {
        o.is_create = false
        this.setState({direct: true, direct_body: o})
    }

    deleteUser(o) {
        console.log(o.id)
        const message = "Are you sure that you want to delete user " + o.username + "?"
        this.alertQuestion("Remove user", message, () => {
            this.props.removeUser(o.id)
        })
    }

    buildTable() {
        const {user_page} = this.props
        if (this.isEmpty(user_page, "data", "users")) {
            console.log("no data")
            return
        }
        console.log("no data", user_page.data)
        const table = Object.assign({
                fields: [
                    this.tableColumn("OPTION", '', this.renderOption),
                    this.tableColumn("USERNAME", 'username'),
                    this.tableColumnKey("ROLE", 'role', 'name'),
                    this.tableColumn("NAME", 'full_name'),
                    this.tableColumn("EMAIL", 'email'),
                    this.tableColumn("PHONE", 'phone'),
                    this.tableColumnKey("HUB", 'hub', 'name'),
                    this.tableColumnKey("AREA", 'hub', 'area'),
                ],
            },
            user_page.data.users
        )
        // add collection row
        table.values = user_page.data.users
        return table
    }

    renderOption(row, o) {
        return (
            <Fragment>
                <button type="button"
                        className="btn btn-warning btn-sm btn-option"
                        onClick={() => this.updateUser(row)}>
                    <i className="mdi mdi-24px mdi-pencil"/>
                </button>
                <button type="button"
                        className="btn btn-danger btn-sm btn-option ml-2"
                        onClick={() => this.deleteUser(row)}>
                    <i className="mdi mdi-24px mdi-delete-circle"/>
                </button>
            </Fragment>
        )
    }

    render() {
        const {filter} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Data User</h4>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-primary btn-sm"
                                                onClick={this.createUser}>Add
                                        </button>
                                    </div>
                                    <div className="col-md-6"/>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control"
                                               value={filter || ''}
                                               onChange={this.updateFilter}
                                               placeholder="Search"/>
                                    </div>
                                </div>
                                <TableView model={this.buildTable()}/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.direct('user/form')}
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_page: defPage(state, USER_PAGE_RESPONSE),
        user_crud: defCrud(state, USER_CRUD_RESPONSE)
    }
}

export default connect(mapStateToProps, {pageUser, removeUser})(UserTable)