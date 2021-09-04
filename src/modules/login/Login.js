import React from "react";
import {connect} from "react-redux";
import {defCrud} from "../../application/AppConstant";
import swal from "sweetalert";
import {LOGIN_RESPONSE} from "../../application/plugins/redux/constants/reducActionTypes";
import {field, formColumnSingle} from "../../application/commons/form/AppFormBuilder";
import AppForm from "../../application/commons/form/AppForm";
import BaseComponent from "../../application/base/BaseComponent";
import {loginUser} from "../../application/plugins/redux/actions/reduxActionUser";

class Login extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.dismissError = this.dismissError.bind(this)
    }

    componentDidMount() {
        localStorage.removeItem('token')
    }

    componentDidUpdate(props) {
        if (this.isUpdate(props, "user_login")) {
            this.httpHandler("User", "user_login", () => {
                const {user_login} = this.props
                // if (user_login.status_code == 200 && user_login.data) {
                localStorage.setItem('user', JSON.stringify(user_login.data))
                localStorage.setItem('token', user_login.data.access_token)
                this.setState({direct: true})
                // }
            }, false)
            console.log("props is update")
        }
    }

    dismissError() {
        this.setState({error: ''})
    }

    handleSubmit(event) {
        const form = new AppForm(this, event);
        form.validateEmpty("username")
        form.validateEmpty("password")
        if (form.isError()) {
            swal("Update profile", form.errorMessage(), "error")
            return
        }
        form.errorMessageClear()
        this.props.loginUser(form.param())
    }

    render() {
        const {user_login} = this.props
        const fields = [
            field('Username', 'text', 'username', 'Username'),
            field('Password', 'password', 'password', 'Password')
        ]
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper auth-page">
                    <div className="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
                        <div className="row w-100">
                            <div className="col-lg-4 mx-auto">
                                <div className="auto-form-wrapper">
                                    <form onSubmit={this.handleSubmit}>
                                        {formColumnSingle(this, fields)}
                                        <div className="form-group" style={{marginTop: 30, marginBottom: 30}}>
                                            <p className="text-danger">{user_login.status_code > 201 ? user_login.status_message : ""}</p>
                                            <button className="btn btn-primary submit-btn btn-block">Login</button>
                                        </div>
                                    </form>
                                </div>

                                <ul className="auth-footer">

                                </ul>
                                <p className="footer-text text-center" style={{color: "#8BBBD1"}}>Copyright © 2020
                                    SphereDevOps. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {this.direct('/dashboard')}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_login: defCrud(state, LOGIN_RESPONSE)
    }
}

export default connect(
    mapStateToProps, {loginUser}
)(Login)