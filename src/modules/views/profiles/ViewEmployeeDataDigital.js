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

class ViewEmployeeDataDigital extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user-view'))
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
                   fetch(BASE_URL + '/user/download/digital/' + user.nip + '/' + o.id)
                       .then(response => {
                           if (response.ok) {
                               response.blob().then(blob => {
                                   let url = window.URL.createObjectURL(blob);
                                   let a = document.createElement('a');
                                   a.href = url;
                                   a.download = user.nip + '-' + o.document.label + '.' + getFileExtension(o.path);
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

    renderTable(userDocument) {
        let result = userDocument.result.filter(item => item.approval === 2)
        // console.log(result)
        return (
            result.map((o, i) =>
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{o.document.label}</td>
                    <td>{this.downloadDocument(o)}</td>
                </tr>
            )
        )
    }

    renderRedirect() {
        const body = {}
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/profile/digital',
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
                        {this.renderTable(userDocument)}
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
)(ViewEmployeeDataDigital);