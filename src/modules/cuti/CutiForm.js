import React, {Component, Fragment} from "react";
import {Button, Modal} from 'react-bootstrap';
import Datetime from 'react-datetime';
import Select from "react-select";
import swal from 'sweetalert';
import "react-datetime/css/react-datetime.css";
import moment from "moment-timezone";
import {JENIS_CUTI} from "../../application/AppConstant";
import {submitCuti, loadCutiUserLogin, calculateDays} from "../../redux/actions/index";
import {connect} from "react-redux";
import {clearInput, cutiLabel, disableBeforeDay, formatDate, formatStatusCuti} from "../../application/AppCommons";
import {Redirect} from "react-router-dom";

class CutiForm extends Component {

    constructor(props) {
        super(props);
        moment.tz.setDefault("Asia/Jakarta");
        require("moment-business-days")
        this.state = {
            direct: false,
            directBody: null,
            showHide: false,
            // form variable
            startDate: null,
            startDateValue: null,
            finishDate: null,
            totalDays: 0,
            jenisCuti: null,
            description: '',
            tlpAddress: '',
            cutiAddress: '',
            // valid
            errorStartDate: '',
            errorFinishDate: '',
            errorDescription: '',
            errorPhone: '',
            errorAddress: '',
            errorServer: '',
            // table

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
            const request = {
                start_date: e.format(),
                finish_date: finishDate.format()
            }
            console.log(request)
            this.props.calculateDays(request)
        } else {
            this.setState({totalDays: 0})
        }
    }

    handleSelectFinishDate(e) {
        this.setState({finishDate: e})
        const {startDate} = this.state
        if (startDate) {
            // const totalDays = (e.businessDiff(startDate, 'days')) + 1
            // this.setState({totalDays: totalDays})
            // if (0 >= totalDays) {
            //     this.setState({errorFinishDate: 'Finish date after start Date!'});
            // } else this.setState({errorFinishDate: null});
            const request = {
                start_date: startDate.format(),
                finish_date: e.format()
            }
            this.props.calculateDays(request)
            console.log(request)
        } else {
            this.setState({totalDays: 0})
        }
    }

    handleModalShowHide(body) {
        this.setState({direct: true, directBody: body})
        this.renderRedirect()
    }

    renderRedirect() {
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/cuti_detail',
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
            if (this.props.cutiResponse.code === 200) {
                swal("Cuti", "Pengajuan cuti berhasil!", "success");
                // clear
                this.setState({
                    loading: true,
                    startDate: '',
                    startDateValue: '',
                    finishDate: '',
                    totalDays: 0,
                    jenisCuti: '',
                    description: '',
                    tlpAddress: '',
                    cutiAddress: ''
                })

                this.formRef.reset();
                clearInput(this.startDateRef)
                clearInput(this.finishDateRef)
                this.setState({errorServer: ''})
                this.props.loadCutiUserLogin()
                this.props.calculateDays({})
            } else {
                console.log("update redux trigger error message", this.props.cutiResponse)
                this.setState({errorServer: this.props.cutiResponse.message})
            }
        }
    }

    componentDidMount() {
        this.props.loadCutiUserLogin();
        this.props.calculateDays({})
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

    render() {
        const {cutiUserResponse, cutiDaysResponse} = this.props
        const {startDate, startDateValue, jenisCuti, description, totalDays, tlpAddress, cutiAddress} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-3 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Pengajuan Cuti</h4>
                                <p className="card-description">
                                    Sisa cuti anda(0)
                                </p>
                                <form className="forms-sample" ref={(ref) => this.formRef = ref}
                                      onSubmit={this.submitFormCuti}
                                      noValidate>
                                    <div className="form-group">
                                        <label htmlFor="jenisCuti">Jenis Cuti</label>
                                        <Select className="form-control select-tmd" options={JENIS_CUTI}
                                                onChange={this.handleChangeCuti}
                                                value={JENIS_CUTI.filter(function (option) {
                                                    return option.value === jenisCuti
                                                })}
                                                label="Single select"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tgl. Mulai</label>
                                        <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}
                                                  isValidDate={disableBeforeDay}
                                                  value={startDate}
                                                  ref={this.startDateRef}
                                                  onChange={this.handleSelectStartDate}/>
                                        <span className="text-danger">{this.state.errorStartDate}</span>

                                    </div>
                                    <div className="form-group">
                                        <label>Tgl. Selesai</label>
                                        <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}
                                                  isValidDate={disableBeforeDay}
                                                  ref={this.finishDateRef}
                                                  onChange={this.handleSelectFinishDate}/>
                                        <span className="text-danger">{this.state.errorFinishDate}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Total Hari</label>
                                        <input readOnly type="text" className="form-control" placeholder="Durasi Cuti"
                                               value={cutiDaysResponse.result}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Keterangan</label>
                                        <textarea className="form-control" rows="4" value={description}
                                                  onChange={this.handleChangeDescription}/>
                                        <span className="text-danger">{this.state.errorDescription}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>No. Telp Selama Cuti</label>
                                        <input type="text" className="form-control" placeholder="No. Telp selama cuti"
                                               value={tlpAddress} onChange={this.handleChangeTelepon}/>
                                        <span className="text-danger">{this.state.errorPhone}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Alamat Selama Cuti</label>
                                        <textarea className="form-control" rows="4" value={cutiAddress}
                                                  onChange={this.handleChangeAddress}/>
                                        <span className="text-danger">{this.state.errorAddress}</span>
                                    </div>
                                    <div className="form-group">
                                        <span className="text-danger">{this.state.errorServer}</span>
                                    </div>
                                    <button type="submit" className="btn btn-success mr-2">Submit</button>
                                    <button className="btn btn-light">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Cuti</h4>
                                <p className="card-description">
                                    Cuti Anda
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
                                        {
                                            cutiUserResponse.result.map((o, i) =>
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
    return {
        cutiResponse: state.cutiResponse,
        cutiDaysResponse: state.cutiDaysResponse,
        cutiUserResponse: state.cutiUserResponse,
    }
}

export default connect(mapStateToProps, {submitCuti, loadCutiUserLogin, calculateDays})(CutiForm);