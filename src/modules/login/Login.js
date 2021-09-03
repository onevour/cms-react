import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {login} from "../../application/plugins/redux/actions/reduxActionLogin";
import {defCrud} from "../../application/AppConstant";
import swal from "sweetalert";
import {LOGIN_RESPONSE} from "../../application/plugins/redux/constants/reducActionTypes";
import {field, formColumnSingle} from "../../application/commons/form/AppFormBuilder";
import AppForm from "../../application/commons/form/AppForm";
import AppFormHandler from "../../application/commons/form/AppFormHandler";

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.dismissError = this.dismissError.bind(this)
    }

    componentDidUpdate(props) {
        const handler = new AppFormHandler(this, props)
        if (handler.isUpdate('login')) {
            console.log("update")
        } else console.log("no update")
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
        this.props.login(form.param())
    }

    render() {
        const {login} = this.props
        if (login.code === 200 && login.result) {
            localStorage.setItem('user', JSON.stringify(login.result))
            return (
                <Redirect to='/dashboard'/>
            )
        }
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
                                            <p className="text-danger">{login.code > 200 ? login.message : ""}</p>
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: defCrud(state, LOGIN_RESPONSE)
    }
}

export default connect(
    mapStateToProps, {login}
)(Login)