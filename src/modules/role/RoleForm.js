import React, {Component, Fragment} from "react";
import {
    USER_CRUD_RESPONSE
} from "../../application/plugins/redux/constants/reducActionTypes";
import {defCrud, ROLES} from "../../application/AppConstant";
import {connect} from "react-redux";
import {deleteUser, saveRole} from "../../application/plugins/redux/actions/reduxActionUser";
import BaseComponent from "../../application/base/BaseComponent";
import {
    field,
    fieldBuildSpace, fieldBuildSubmit,
    formColumn
} from "../../application/commons/form/AppFormBuilder";

class RoleForm extends BaseComponent {

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
        const {is_create, name} = this.state
        const request = {
            name: name
        }
        this.props.saveRole((is_create), request);
        // console.log(request)
    }

    render() {
        const {user} = this.state
        const fields = [
            field('Name', 'text', 'name', 'Input role name'),
            fieldBuildSpace,
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
                {this.direct('/role')}
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_response: defCrud(state, USER_CRUD_RESPONSE)
    }
}

export default connect(mapStateToProps, {saveRole})(RoleForm);