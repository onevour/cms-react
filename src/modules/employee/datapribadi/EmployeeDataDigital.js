import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {
    loadMasterDocument,
    loadUserDocument,
    removeUserDocument,
    userUploadDocument
} from "../../../redux/actions/reduxActionDataDigital";
import {BASE_URL} from "../../../redux/constants/reducActionTypes";
import {getFileExtension} from "../../../application/AppCommons";

class EmployeeDataDigital extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
        this.openDataDigital = this.openDataDigital.bind(this)
        this.props.loadUserDocument()
    }

    downloadDocument(o) {
        if (null === o.path) {
            return '-'
        }
        if ('' === o.path) {
            return '-'
        }
        return (
            <a href="#" style={{marginTop: -10}}
               onClick={() => {
                   const {user} = this.state
                   fetch(BASE_URL + '/api/v1/user/download/digital/' + user.nip + '/' + o.id)
                       .then(response => {
                           if (response.ok) {
                               response.blob().then(blob => {
                                   let url = window.URL.createObjectURL(blob);
                                   let a = document.createElement('a');
                                   a.href = url;
                                   a.download = user.nip + '-' + o.document.label + '.'+ getFileExtension(o.path);
                                   a.click();
                               });
                           }
                       }).catch(function (err) {
                   });
               }}>download</a>
        )
    }

    openDataDigital() {
        this.setState({direct: true})
        this.renderRedirect()
    }

    renderRedirect() {
        const body = {}
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/employee/digital',
                state: {body: JSON.stringify(body)}
            }}/>
        }
    }

    render() {
        const {user} = this.state
        if (user === null) {
            return (<></>)
        }
        const {documents} = user
        const {masterDocument, userDocument} = this.props
        return (
            <div className="col-12" style={{marginTop: 10}}>
                <div className="col">
                    <button type="submit" style={{marginTop: 10}}
                            onClick={this.openDataDigital}
                            className="btn btn-warning btn-sm mr-2">Update
                    </button>
                </div>
                <div className="table-responsive row">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Dokumen</th>
                            <th>Upload</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userDocument.result.map((o, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{o.document.label}</td>
                                <td>{this.downloadDocument(o)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                </div>
                {this.renderRedirect()}
            </div>
        )
    }

}

// export default EmployeeDataDigital;
function mapStateToProps(state) {
    return {
        masterDocument: state.masterDocument.result,
        uploadDocument: state.uploadDocument,
        userDocument: state.userDocument
    }
}

export default connect(
    mapStateToProps, {loadMasterDocument, userUploadDocument, loadUserDocument, removeUserDocument}
)(EmployeeDataDigital);