import React, {Component, Fragment} from "react";
import {
    USER_CRUD_RESPONSE
} from "../../application/plugins/redux/constants/reducActionTypes";
import {defCrud, ROLES} from "../../application/AppConstant";
import {connect} from "react-redux";
import {deleteUser, saveUser} from "../../application/plugins/redux/actions/reduxActionUser";
import BaseComponent from "../../application/base/BaseComponent";
import {
    field,
    fieldBuildSpace, fieldBuildSubmit,
    formColumn
} from "../../application/commons/form/AppFormBuilder";

class UserForm extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {}
        this.cancelForm = this.cancelForm.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }


    componentDidMount() {
        // receive from param, and set to state
        this.setState(Object.assign({}, JSON.parse(this.props.location.state.body)))
    }

    componentDidUpdate(props) {
        if (this.isUpdate(props, "user_response")) {
            this.httpHandler("User", "user_response", () => {
                this.setState({direct: true})
            })
            console.log("props is update")
        }
    }

    submitForm(e) {
        e.preventDefault()
        const {is_create, full_name, username, password, phone, email} = this.state
        const request = {
            full_name: full_name,
            username: username,
            password: password,
            phone: phone,
            email: email,
            role_id: 1,
            hub_id: 2
        }
        this.props.saveUser((is_create), request);
        // console.log(request)
    }

    render() {
        const {user} = this.state
        const fields = [
            field('Full Name', 'text', 'full_name', 'Input full name'),
            field('Email', 'text', 'email', 'Input email'),
            field('Phone', 'text', 'phone', 'Input phone number'),
            fieldBuildSpace,
            field('Username', 'text', 'username', 'Username'),
            field('Password', 'password', 'password', 'Password'),
            fieldBuildSubmit('submit-cancel', "Submit", "Cancel", this.cancelForm)
        ]
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">User Form</h4>
                                <form className="forms-sample" ref={(ref) => this.formRef = ref}
                                      onSubmit={this.submitForm}
                                      noValidate>
                                    {formColumn(this, fields)}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {this.direct('/user')}
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_response: defCrud(state, USER_CRUD_RESPONSE)
    }
}

export default connect(mapStateToProps, {saveUser})(UserForm);