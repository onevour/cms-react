import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {getData, login} from "../../redux/actions/index";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.redirectToTarget = this.redirectToTarget.bind(this);
    }

    dismissError() {
        this.setState({error: ''});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (!this.state.username) {
            return this.setState({error: 'Username is required'});
        }

        if (!this.state.password) {
            return this.setState({error: 'Password is required'});
        }
        const param = this.state;
        const request = {
            username: param.username,
            password: param.password,
        }
        this.props.login(request);
    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    redirectToTarget() {
        this.props.history.push("/");
    }

    render() {
        const {loginResponse} = this.props
        console.log("render response " + JSON.stringify(loginResponse))
        if (loginResponse.code === 200) {
            return (
                <Redirect to='/dashboard'/>
            )
        }
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper auth-page">
                    <div className="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
                        <div className="row w-100">
                            <div className="col-lg-4 mx-auto">
                                <div className="auto-form-wrapper">
                                    <form onSubmit={this.handleSubmit}>
                                        {this.state.error &&
                                        <label data-test="error" onClick={this.dismissError}>
                                            <button onClick={this.dismissError}>✖</button>
                                            {this.state.error}
                                        </label>
                                        }
                                        <div className="form-group">
                                            <label className="label">Username</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Username"
                                                       value={this.state.username}
                                                       onChange={this.handleUserChange}/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text">
                                                        <i className="mdi mdi-check-circle-outline"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="label">Password</label>
                                            <div className="input-group">
                                                <input type="password" className="form-control"
                                                       placeholder="*********"
                                                       value={this.state.password}
                                                       onChange={this.handlePassChange}/>
                                                <div className="input-group-append">
                                                  <span className="input-group-text">
                                                    <i className="mdi mdi-check-circle-outline"></i>
                                                  </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <p className="text-danger">{loginResponse.code > 200 ? loginResponse.message : ""}</p>
                                            <button className="btn btn-primary submit-btn btn-block">Login</button>
                                        </div>
                                        <div className="form-group d-flex justify-content-between">
                                            <div className="form-check form-check-flat mt-0">
                                                <label className="form-check-label">
                                                    <input type="checkbox" className="form-check-input"/> Keep
                                                    me
                                                    signed in
                                                </label>
                                            </div>
                                            <a href="#" className="text-small forgot-password text-black">Forgot
                                                Password</a>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-block g-login">
                                                <img className="mr-3" src="../../images/file-icons/icon-google.svg"
                                                     alt=""/>Log in with Google
                                            </button>
                                        </div>
                                        <div className="text-block text-center my-3">
                                            <span className="text-small font-weight-semibold">Not a member ?</span>
                                            <a href="register.html" className="text-black text-small">Create new
                                                account</a>
                                        </div>
                                    </form>
                                </div>
                                <ul className="auth-footer">
                                    <li>
                                        <a href="#">Conditions</a>
                                    </li>
                                    <li>
                                        <a href="#">Help</a>
                                    </li>
                                    <li>
                                        <a href="#">Terms</a>
                                    </li>
                                </ul>
                                <p className="footer-text text-center">copyright © 2018 Bootstrapdash. All rights
                                    reserved.</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    console.log("response from redux in component " + JSON.stringify(state.loginResponse))
    if(state.loginResponse.code === 200) {
        localStorage.setItem('user', JSON.stringify(state.loginResponse.result))
    }
    return {
        loginResponse: state.loginResponse
    }
}

// export default Login

export default connect(
    mapStateToProps, {login}
)(Login);