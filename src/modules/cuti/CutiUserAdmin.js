import React, {Component, Fragment} from "react";
import moment from "moment";
import Pagination from "react-bootstrap-4-pagination";
import {connect} from "react-redux";
import {
    CUTI_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentPage} from "../../application/AppConstant";
import {loadCutiUserApproval, pageUserCuti, requestCuti} from "../../redux/actions/reduxActionCuti";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import {clearInput, cutiLabel, formatDate, formatStatusCuti} from "../../application/AppCommons";
import {Button, Modal} from "react-bootstrap";

class CutiUserAdmin extends Component {

    constructor(props) {
        super(props);
        require("moment-business-days")
        this.state = {
            direct: false,
            directBody: null,
            showHide: false,
        }
        this.formRef = null;
        this.startDateRef = React.createRef();
        this.finishDateRef = React.createRef();
        this.handleChange = this.handleChange.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.handleChangeCuti = this.handleChangeCuti.bind(this)
        this.handleTypeSelect = this.handleTypeSelect.bind(this)
        this.handleSelectStartDate = this.handleSelectStartDate.bind(this)
        this.handleSelectFinishDate = this.handleSelectFinishDate.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangeTelepon = this.handleChangeTelepon.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.renderInput = this.renderInput.bind(this)
    }

    handleChangeCuti(event) {
        console.log(event)
        this.setState({jenisCuti: event.value})
    }

    handleTypeSelect(e) {
        console.log("handle selected")
        return e.value;
    }

    handleSelectStartDate(e) {
        this.setState({startDate: e})
        const {finishDate} = this.state
        if (finishDate) {
            const totalDays = (finishDate.businessDiff(e, 'days')) + 1
            this.setState({totalDays: totalDays})
            if (0 >= totalDays) {
                this.setState({errorFinishDate: 'Finish date after start Date!'});
            } else this.setState({errorFinishDate: null});
        }
    }

    handleSelectFinishDate(e) {
        this.setState({finishDate: e})
        const {startDate} = this.state
        if (startDate) {
            const totalDays = (e.businessDiff(startDate, 'days')) + 1
            this.setState({totalDays: totalDays})
            if (0 >= totalDays) {
                this.setState({errorFinishDate: 'Finish date after start Date!'});
            } else this.setState({errorFinishDate: null});
        }
    }

    handleModalShowHide(body) {
        this.setState({direct: true, directBody: body})
        this.renderRedirect()
    }

    renderRedirect() {
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/cuti/user/admin/detail',
                state: {body: JSON.stringify(this.state.directBody)}
            }}/>
        }
    }

    handleChange(value, formattedValue) {
        this.setState({
            value: value,                   // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    handleChangeDescription(event) {
        console.log(event.target.value)
        this.setState({description: event.target.value});
    }

    handleChangeTelepon(event) {
        console.log(event.target.value)
        this.setState({tlpAddress: event.target.value});
    }

    handleChangeAddress(event) {
        console.log(event.target.value)
        this.setState({cutiAddress: event.target.value});
    }

    componentDidUpdate(props) {
        if (props.cutiResponse !== this.props.cutiResponse) {
            console.log("update redux trigger")
            swal("Cuti", "Pengajuan cuti berhasil!", "success");
            // clear
            this.setState({
                loading: true,
                startDate: '',
                startDateValue: '',
                finishDate: null,
                totalDays: 0,
                jenisCuti: null,
                description: '',
                tlpAddress: '',
                cutiAddress: ''
            })
            this.formRef.reset();
            clearInput(this.startDateRef)
            clearInput(this.finishDateRef)
            this.props.loadCutiUserApproval()
        }
    }

    componentDidMount() {
        this.props.loadCutiUserApproval();
    }

    renderInput(props, openCalendar, closeCalendar) {
        function clear() {
            props.onChange({target: {value: ''}});
        }

        return (
            <div>
                <input {...props} />
            </div>
        );
    }

    renderTableCuti(values) {
        let result = values.filter((item) => {
            if (item.cuti_status > 3) {
                return moment(item.start_date).isAfter()
            }
            return false
        })
        return (
            result.map((o, i) =>
                <tr className="clickable" key={i}
                    onClick={() => this.handleModalShowHide(o)}>
                    <td>{cutiLabel(o.jenis_cuti)}</td>
                    <td>{formatDate(o.start_date)}</td>
                    <td>{formatDate(o.finish_date)}</td>
                    <td>{o.total_days}</td>
                    <td>{formatStatusCuti(o.cuti_status)}</td>
                    <td>{formatDate(o.approve_atasan_date)}</td>
                    <td>{formatDate(o.approve_pejabat_date)}</td>
                </tr>
            )
        )
    }

    render() {
        const {cutiUserResponse} = this.props
        // console.log(cutiUserResponse)
        const {startDate, startDateValue, jenisCuti, description, totalDays, tlpAddress, cutiAddress} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Pengajuan Cuti</h4>
                                <p className="card-description">
                                    Verifikasi cuti pegawai
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                Jenis Cuti
                                            </th>
                                            <th>
                                                Tgl. Mulai
                                            </th>
                                            <th>
                                                Tgl. Selesai
                                            </th>
                                            <th>
                                                Total Hari
                                            </th>
                                            <th>
                                                Status
                                            </th>
                                            <th>
                                                Approve Atasan
                                            </th>
                                            <th>
                                                Approve Pejabat
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderTableCuti(cutiUserResponse.result)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {this.renderRedirect()}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    console.log("state cuti form", state)
    return {
        cutiResponse: state.cutiResponse,
        cutiUserResponse: state.cutiUserResponse,
    }
}

export default connect(mapStateToProps, {submitCuti: requestCuti, loadCutiUserApproval})(CutiUserAdmin);