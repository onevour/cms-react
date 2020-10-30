import React, {Component, Fragment} from "react";
import {Button, Modal} from 'react-bootstrap'
import Datetime from 'react-datetime';
import Select from "react-select";
import "react-datetime/css/react-datetime.css";
import {JENIS_CUTI} from "../../application/AppConstant";
import {submitCuti, loadCutiUserLogin} from "../../redux/actions/index";
import {connect} from "react-redux";
import {cutiLabel, formatDate, formatStatusCuti} from "../../application/AppCommons";

class CutiForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHide: false,
            // form variable
            startDate: null,
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
            // table

        }
        this.handleChange = this.handleChange.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.handleChangeCuti = this.handleChangeCuti.bind(this)
        this.handleTypeSelect = this.handleTypeSelect.bind(this)
        this.handleSelectStartDate = this.handleSelectStartDate.bind(this)
        this.handleSelectFinishDate = this.handleSelectFinishDate.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangeTelepon = this.handleChangeTelepon.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.submitCuti = this.submitCuti.bind(this)
        // load cuti
        this.props.loadCutiUserLogin();
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
        console.log(e)
        this.setState({startDate: e})
    }

    handleSelectFinishDate(e) {
        const {startDate} = this.state
        this.setState({finishDate: e, totalDays: (e.diff(this.state.startDate, 'days')) + 1})
    }

    handleModalShowHide() {
        this.setState({showHide: !this.state.showHide})
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

    submitCuti(event) {
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
            console.log("update redux trigger")
            this.props.loadCutiUserLogin()
        }
    }

    render() {
        const {cutiUserResponse} = this.props
        console.log(cutiUserResponse)
        const {cutiUserList, jenisCuti, description, totalDays, tlpAddress, cutiAddress} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-3 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Cuti form</h4>
                                <p className="card-description">
                                    Sisa cuti anda(0)
                                </p>
                                <form className="forms-sample" onSubmit={this.submitCuti} noValidate>
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
                                                  onChange={this.handleSelectStartDate}/>
                                        <span className="text-danger">{this.state.errorStartDate}</span>

                                    </div>
                                    <div className="form-group">
                                        <label>Tgl. Selesai</label>
                                        <Datetime name="startDate" dateFormat="DD-MM-YYYY" timeFormat={false}
                                                  closeOnSelect={true}
                                                  onChange={this.handleSelectFinishDate}/>
                                        <span className="text-danger">{this.state.errorFinishDate}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Total Hari</label>
                                        <input readOnly type="text" className="form-control" placeholder="Durasi Cuti"
                                               value={totalDays}/>
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
                                    History cuti
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
                                                <tr key={i} onClick={() => this.handleModalShowHide()}>
                                                    <td>{cutiLabel(o.jenis_cuti)}</td>
                                                    <td>{formatDate(o.start_date)}</td>
                                                    <td>{formatDate(o.start_date)}</td>
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

export default connect(mapStateToProps, {submitCuti, loadCutiUserLogin})(CutiForm);