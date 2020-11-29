import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {getData, login} from "../../redux/actions/reduxAction";
import {defCrud} from "../../application/AppConstant";
import {LOGIN_RESPONSE} from "../../redux/constants/reducActionTypes";

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

    handleUserChange(e) {
        this.setState({username: e.target.value})
    }

    handlePassChange(e) {
        this.setState({password: e.target.value})
    }

    render() {
        const {login_response} = this.props
        console.log(login_response)
        if (login_response.code === 200 && login_response.result) {
            localStorage.setItem('user', JSON.stringify(login_response.result))
            console.log("redirect to home")
            return (
                <Redirect to='/profile'/>
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
                                                        <i className="mdi mdi-check-circle-outline"/>
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
                                                    <i className="mdi mdi-check-circle-outline"/>
                                                  </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group" style={{marginTop: 30, marginBottom: 30}}>
                                            <p className="text-danger">{login.code > 200 ? login.message : ""}</p>
                                            <button className="btn btn-primary submit-btn btn-block">Login</button>
                                        </div>
                                    </form>
                                </div>

                                <ul className="auth-footer">

                                </ul>
                                <p className="footer-text text-center" style={{color: "#8BBBD1"}}>copyright © 2020
                                    Direktorat SMA. All rights
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
    return {
        login_response: defCrud(state, LOGIN_RESPONSE)
    }
}

// export default Login

export default connect(
    mapStateToProps, {login}
)(Login);