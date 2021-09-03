import React, {Component, Fragment} from "react";
import {
    USER_CRUD_RESPONSE
} from "../../application/plugins/redux/constants/reducActionTypes";
import {defCrud, ROLES} from "../../application/AppConstant";
import {connect} from "react-redux";
import Select from "react-select";
import {pageUser, userUpdateRole} from "../../application/plugins/redux/actions/reduxActionUser";
import {Redirect} from "react-router-dom";

class UserRoleForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: null,
            direct: false,
            user: JSON.parse(this.props.location.state.body)
        };
        this.handleChangeRole = this.handleChangeRole.bind(this)
        this.cancel = this.cancel.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        let roleParam = this.state.user.role
        let role = {value: roleParam, label: roleParam}
        this.setState({role: role})
    }

    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.setState({direct: true})
        }
        if (props.documents !== this.props.documents) {

        }
    }

    cancel(event) {
        // console.log(event)
        this.setState({direct: true})
    }

    handleChangeRole(event) {
        // console.log(event)
        this.setState({role: event})
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

    submitForm(e) {
        e.preventDefault()
        // // console.log(this.state)
        const request = {
            role: this.state.role.value,
            nip: this.state.user.nip,
        }
        this.props.userUpdate(request);
        // console.log(request)
    }

    renderRedirect() {
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/user'
            }}/>
        }
    }

    render() {
        const {user} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-6 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">User Form</h4>
                                <form className="forms-sample" ref={(ref) => this.formRef = ref}
                                      onSubmit={this.submitForm}
                                      noValidate>
                                    <div className="form-group">
                                        <label>Role</label>
                                        <Select className="form-control select-tmd"
                                                options={ROLES}
                                                value={this.state.role}
                                                onChange={this.handleChangeRole}
                                                defaultValue={{label: 'PILIH ROLE', value: 0}}
                                                label="Single select"/>
                                    </div>
                                    <div className="form-group">
                                        <label>NIP</label>
                                        <input type="text" className="form-control" placeholder="NIP"
                                               value={user.nip}
                                               readOnly={true}/>
                                        <span className="text-danger">{this.state.errorJenis}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Nama</label>
                                        <input type="text" className="form-control" placeholder="Nama"
                                               value={user.nama}
                                               readOnly={true}/>
                                        <span className="text-danger">{this.state.errorKelas}</span>
                                    </div>
                                    <button type="submit" className="btn btn-success mr-2">Submit</button>
                                    <button className="btn" onClick={this.cancel}>Cancel</button>
                                </form>
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
        crud: defCrud(state, USER_CRUD_RESPONSE)
    }
}

export default connect(mapStateToProps, {pageUser, userUpdate: userUpdateRole})(UserRoleForm);