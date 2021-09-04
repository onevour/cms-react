import React, {Fragment} from "react";
import {
    ROLE_CRUD_RESPONSE,
    ROLE_PAGE_RESPONSE
} from "../../application/plugins/redux/constants/reducActionTypes";
import {defCrud, defPage} from "../../application/AppConstant";
import {pageRole, removeRole} from "../../application/plugins/redux/actions/reduxActionUser";
import {connect} from "react-redux";
import TableView, {} from "../../application/plugins/ui/TableView";
import BaseComponent from "../../application/base/BaseComponent";
import swal from "sweetalert";

class RoleTable extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {}
        this.renderOption = this.renderOption.bind(this)
        this.createRole = this.createRole.bind(this)
        this.updatePage = this.updatePage.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
    }

    componentDidMount() {
        this.updatePage(0)
    }

    componentDidUpdate(props) {
        if (this.isUpdate(props, "role_page")) {
            this.httpHandler("User", "role_page")
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
        this.props.pageRole(request)
    }

    createRole() {
        this.updateRole({is_create: true})
    }

    updateRole(o) {
        o.is_create = true
        this.setState({direct: true, direct_body: o})
    }

    deleteUser(o) {
        console.log(o.id)
        const message = "Are you sure that you want to delete user " + o.username + "?"
        this.alertQuestion("Remove user", message, () => {
            this.props.removeRole(o.id)
        })
    }

    buildTable() {
        const {role_page} = this.props
        if (this.isEmpty(role_page, "data", "users")) {
            console.log("no data")
            return
        }
        console.log("no data", role_page.data)
        const table = Object.assign({
                fields: [
                    this.tableColumn("OPTION", '', this.renderOption),
                    this.tableColumn("NAME", 'name')
                ],
            },
            role_page.data.users
        )
        // add collection row
        table.values = role_page.data.roles
        return table
    }

    renderOption(row, o) {
        return (
            <Fragment>
                <button type="button"
                        className="btn btn-warning btn-sm btn-option"
                        onClick={() => this.updateRole(row)}>
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
                                <h4 className="card-title">Data Role</h4>
                                <div className="row mb-3">
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-primary btn-sm"
                                                onClick={this.createRole}>Add
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
                {this.direct('role/form')}
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        role_page: defPage(state, ROLE_PAGE_RESPONSE),
        role_crud: defCrud(state, ROLE_CRUD_RESPONSE)
    }
}

export default connect(mapStateToProps, {pageRole, removeRole})(RoleTable)