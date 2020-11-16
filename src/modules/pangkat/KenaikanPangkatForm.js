import React, {Component, Fragment} from "react";
import "react-datetime/css/react-datetime.css";
import {Redirect} from "react-router-dom";
import {
    DOCUMENT_LIST_RESPONSE,
    PANGKAT_DOCUMENT_CRUD_RESPONSE,
    USER_HISTORY_PANGKAT_LIST, USER_HISTORY_PANGKAT_LIST_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentList, emptyCrud} from "../../application/AppConstant";
import {connect} from "react-redux";
import {listDocument} from "../../redux/actions/reduxActionMasterDocument";
import {mergePangkatDocument} from "../../redux/actions/reduxActionMasterPangkat";
import {listUserHistoryPangkat} from "../../redux/actions/reduxActionUser";

class KenaikanPangkatForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            siapa: '',
            showHide: false,
            direct: false,
            startDate: new Date().toISOString(),
            pangkat: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.handleModalShowHide = this.handleModalShowHide.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
    }

    componentDidMount(props) {
        this.props.listUserHistoryPangkat()
    }

    showDocument(o) {
        this.setState({direct: true, pangkat: o})
    }

    handleModalShowHide() {
        this.setState({direct: true})
        this.renderRedirect()
    }

    renderRedirect() {
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/kenaikan_pangkat_dokumen',
                state: {body: JSON.stringify(this.state.pangkat)}
            }}/>
        }
    }

    handleChange(value, formattedValue) {
        this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    handleChangeText(e) {
        console.log(e)
        this.setState({siapa: e.target.value})
    }

    componentDidUpdate() {
    }

    render() {
        const {pangkats} = this.props
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Kenaikan Pangkat</h4>
                                <p className="card-description">
                                    History Kenaikan Pangkat
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                No.
                                            </th>
                                            <th>
                                                Pangkat
                                            </th>
                                            <th>
                                                Golongan
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            pangkats.result.map((o, i) =>
                                                <tr className="clickable" key={i} onClick={() => {
                                                    this.showDocument(o)
                                                }}>
                                                    <td>{i + 1}</td>
                                                    <td>{o.pangkat_golongan.nama}</td>
                                                    <td>{o.pangkat_golongan.golongan}</td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}

            </Fragment>
        );
    }
}

// <tr onClick={this.handleModalShowHide}>
//     <td>2020</td>
//     <td>Kenaikan Jabatan</td>
//     <td>10 Dokumen</td>
//     <td>
//         <label className="badge badge-danger">Pending</label>
//     </td>
// </tr>

function mapStateToProps(state) {
    return {
        pangkats: (state[USER_HISTORY_PANGKAT_LIST_RESPONSE] ? state[USER_HISTORY_PANGKAT_LIST_RESPONSE] : emptyContentList)
    }
}

export default connect(mapStateToProps, {listUserHistoryPangkat})(KenaikanPangkatForm);