import React, {Component, Fragment} from "react";
import {Button, Modal} from 'react-bootstrap';
import swal from 'sweetalert';
import "react-datetime/css/react-datetime.css";
import {connect} from "react-redux";
import {
    clearInput,
    cutiLabel,
    disableBeforeDay,
    formatDate,
    formatStatusCuti,
    selectedTabClass
} from "../../application/AppCommons";
import {Redirect} from "react-router-dom";
import {loadCutiUserApproval, loadCutiUserLogin, requestCuti} from "../../redux/actions/reduxActionCuti";
import {defList} from "../../application/AppConstant";
import {CUTI_LOAD_USER_RESPONSE} from "../../redux/constants/reducActionTypes";
import EmployeeMutasi from "../profile/riwayat/EmployeeMutasi";
import EmployeePangkat from "../profile/riwayat/EmployeePangkat";
import EmployeeSKP from "../profile/riwayat/EmployeeSKP";
import EmployeeCredit from "../profile/riwayat/EmployeeCredit";
import EmployeeLencana from "../profile/riwayat/EmployeeLencana";
import EmployeeDisplin from "../profile/riwayat/EmployeeDisiplin";
import EmployeePelatihan from "../profile/riwayat/EmployeePelatihan";

class CutiTableAtasan extends Component {

    constructor(props) {
        super(props);
        require("moment-business-days")
        this.state = {
            direct: false,
            directBody: null,
            showHide: false,
            tabs: [
                {
                    selected: true,
                    label: "Pending",
                    content: 0,
                },
                {
                    selected: false,
                    label: "Approve",
                    content: 1,

                },
                {
                    selected: false,
                    label: "Cancel",
                    content: 2,

                }
            ],
            content: 0,
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
        this.submitFormCuti = this.submitFormCuti.bind(this)
        // load cuti
    }

    handleChangeCuti(event) {
        // console.log(event)
        this.setState({jenisCuti: event.value})
    }

    handleTypeSelect(e) {
        // console.log("handle selected")
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
                pathname: '/cuti_approval_atasan_detail',
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
        // console.log(event.target.value)
        this.setState({description: event.target.value});
    }

    handleChangeTelepon(event) {
        // console.log(event.target.value)
        this.setState({tlpAddress: event.target.value});
    }

    handleChangeAddress(event) {
        // console.log(event.target.value)
        this.setState({cutiAddress: event.target.value});
    }

    submitFormCuti(event) {
        event.preventDefault()
        // error
        var hasError = false
        if (null === this.state.startDate) {
            this.setState({errorStartDate: 'Start date cannot be empty!'});
            hasError = true
        } else this.setState({errorStartDate: null})

        if (null === this.state.finishDate) {
            this.setState({errorFinishDate: 'Finish date cannot be empty!'});
            hasError = true
        } else this.setState({errorFinishDate: null})

        if (0 >= this.state.totalDays) {
            this.setState({errorFinishDate: 'Finish date after start Date!'});
            hasError = true
        }
        if (null === this.state.description || '' === this.state.description.trim()) {
            this.setState({errorDescription: 'Input keterangan cuti!'});
            hasError = true
        } else this.setState({errorDescription: null})

        if (null === this.state.tlpAddress || '' === this.state.tlpAddress.trim()) {
            this.setState({errorPhone: 'Please input phone number!'});
            hasError = true
        } else this.setState({errorPhone: null})

        if (null === this.state.cutiAddress || '' === this.state.cutiAddress.trim()) {
            this.setState({errorAddress: 'Please input alamat cuti!'});
            hasError = true
        } else this.setState({errorAddress: null})

        if (hasError) return false
        const request = {
            start_date: this.state.startDate,
            finish_date: this.state.finishDate,
            total_days: this.state.totalDays,
            jenis_cuti: this.state.jenisCuti,
            description: this.state.description,
            tlp_address: this.state.tlpAddress,
            cuti_address: this.state.cutiAddress,
        }
        this.props.submitCuti(request);

    }

    componentDidUpdate(props) {
        // if(prevProps.value !== this.props.value){ alert(prevProps.value) }
        if (props.cutiResponse !== this.props.cutiResponse) {
            // console.log("update redux trigger")
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

    selectedTab(index) {
        var content = null
        const tabs = this.state.tabs.map((val, i) => {
            val.selected = index === i
            if (val.selected) {
                content = val.content;
            }
            return val
        })
        this.setState({tabs: tabs, content: content})
    }

    render() {
        const {user_cuties} = this.props
        const {tabs, content} = this.state
        const filter_cuti = user_cuties.result.filter(item => {
            // console.log(item)
            if (0 === content) {
                return item.cuti_status === 3
            }
            if (1 === content) {
                return item.cuti_status > 3
            }
            if (2 === content) {
                return item.cuti_status < 3
            }
            return false
        })
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Pengajuan Cuti</h4>
                                <p className="card-description">
                                    Verifikasi cuti pegawai (Atasan)
                                </p>
                                <ul className="nav nav-tabs">
                                    {tabs.map((o, i) =>
                                        <li className="nav-item" key={i}>
                                            <a className={selectedTabClass(o)}
                                               onClick={(e) => {
                                                   e.preventDefault();
                                                   this.selectedTab(i)
                                               }} href="#">{o.label}</a>
                                        </li>
                                    )}
                                </ul>
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
                                        {
                                            filter_cuti.map((o, i) =>
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
                                        }
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
    // console.log("state cuti form", state)
    return {
        cutiResponse: state.cutiResponse,
        user_cuties: defList(state, CUTI_LOAD_USER_RESPONSE),
    }
}

export default connect(mapStateToProps, {submitCuti: requestCuti, loadCutiUserApproval})(CutiTableAtasan);