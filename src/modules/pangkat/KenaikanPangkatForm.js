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
import {formatDate} from "../../application/AppCommons";
import moment from "moment";

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
        console.log("load history pangkat")
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

    renderTableKenaikanPangkat(pangkats) {
        // get last but not pensiun
        if (!pangkats.result) return
        const pangkats_no_pensiun = pangkats.result.filter(o => 18 !== o.pangkat_golongan.id)
        const last_pangkat = pangkats_no_pensiun[0]
        if (!last_pangkat) return
        if (moment(last_pangkat.tmt).isBefore(moment())) {
            return (<></>)
        } else {
            const last_pangkats = [last_pangkat]
            return (
                <>
                    {
                        last_pangkats.map((o, i) =>
                            <tr className="clickable" key={i} onClick={() => {
                                this.showDocument(o)
                            }}>
                                <td>{i + 1}</td>
                                <td>{formatDate(o.tmt)}</td>
                                <td>{o.pangkat_golongan.nama}</td>
                                <td>{o.pangkat_golongan.golongan}</td>
                            </tr>
                        )
                    }
                </>
            )
        }

    }

    renderTableKenaikanPangkatHis(pangkats) {
        if (!pangkats.result) {
            return
        }
        //
        const pangkats_history = pangkats.result.filter(o => {
            if (o.tmt) {
                if ( 18 === o.pangkat_golongan.id) {
                    return false
                }
                // moment(o.tmt)
                const today = moment(o.tmt);
                return  moment().isAfter(today);
                // if (isBefore) {
                // }
            }
            return false;
            // return 18 !== o.pangkat_golongan.id && (o.tmt)
        })
        return (
            <>
                {
                    pangkats_history.map((o, i) =>
                        <tr className="clickable" key={i} onClick={() => {
                            this.showDocument(o)
                        }}>
                            <td>{i + 1}</td>
                            <td>{formatDate(o.tmt)}</td>
                            <td>{(o.pangkat_golongan ? o.pangkat_golongan.nama : '')}</td>
                            <td>{(o.pangkat_golongan ? o.pangkat_golongan.golongan : '')}</td>
                        </tr>
                    )
                }
            </>
        )
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
                                    Kenaikan Pangkat Anda
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                No.
                                            </th>
                                            <th>
                                                TMT
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
                                        {this.renderTableKenaikanPangkat(pangkats)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">History Kenaikan Pangkat</h4>
                                <p className="card-description">
                                    History Kenaikan Pangkat Anda
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                No.
                                            </th>
                                            <th>
                                                TMT
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
                                        {this.renderTableKenaikanPangkatHis(pangkats)}
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

function mapStateToProps(state) {
    return {
        pangkats: (state[USER_HISTORY_PANGKAT_LIST_RESPONSE] ? state[USER_HISTORY_PANGKAT_LIST_RESPONSE] : emptyContentList)
    }
}

export default connect(mapStateToProps, {listUserHistoryPangkat})(KenaikanPangkatForm);