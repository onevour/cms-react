import React, {Component, Fragment} from "react";
import {Button, Modal} from 'react-bootstrap';
import Datetime from 'react-datetime';
import swal from 'sweetalert';
import "react-datetime/css/react-datetime.css";
import {connect} from "react-redux";
import {clearInput, cutiLabel, disableBeforeDay, formatDate, formatStatusCuti} from "../../application/AppCommons";
import {loadHolidays, removeDateHoliday, submitDateHoliday} from "../../redux/actions/reduxActionCuti";
import {defList} from "../../application/AppConstant";
import {
    HOLIDAYS_LOAD_RESPONSE,
    HOLIDAYS_REMOVE_RESPONSE,
    HOLIDAYS_SUBMIT_RESPONSE
} from "../../redux/constants/reducActionTypes";

class CalendarHoliday extends Component {

    constructor(props) {
        super(props);
        require("moment-business-days")
        this.state = {
            showHide: false,
            // form variable
            date: null,
            description: '',
            // valid
            errorDate: '',
            errorDescription: ''
            // table

        }
        this.formRef = null;
        this.startDateRef = React.createRef();
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectDate = this.handleSelectDate.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.submitHoliday = this.submitHoliday.bind(this)
        // load cuti
        this.props.loadHolidays();
    }

    handleChange(value, formattedValue) {
        this.setState({
            value: value,                   // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    handleSelectDate(e) {
        this.setState({date: e})
    }

    handleChangeDescription(event) {
        // console.log(event.target.value)
        this.setState({description: event.target.value});
    }

    handleModalShowHide(id) {
        // console.log("id, ", id)
        // this.setState({showHide: !this.state.showHide})
        const request = {
            id: id,
        }
        // console.log("request form")
        this.props.removeDateHoliday(request);
    }

    submitHoliday(event) {
        event.preventDefault()
        // console.log("submit ")
        // error
        var hasError = false
        if (null === this.state.date) {
            this.setState({errorDate: 'Date cannot be empty!'});
            hasError = true
        } else this.setState({errorDate: null})

        if (null === this.state.description || '' === this.state.description.trim()) {
            this.setState({errorDescription: 'Input keterangan!'});
            hasError = true
        } else this.setState({errorDescription: null})

        if (hasError) return false
        const request = {
            date: this.state.date,
            description: this.state.description
        }
        // console.log("request form")
        this.props.submitDateHoliday(request);
    }

    componentDidUpdate(props) {
        // if(prevProps.value !== this.props.value){ alert(prevProps.value) }
        if (props.holidaySubmitResponse !== this.props.holidaySubmitResponse) {
            // console.log("update redux trigger")
            swal("Hari libur", "Penambahan tanggal berhasil!", "success");
            // clear
            this.setState({
                loading: true,
                date: '',
                description: '',
            })
            this.formRef.reset();
            clearInput(this.startDateRef)
            this.props.loadHolidays()
        }
        if (props.holidayRemoveResponse !== this.props.holidayRemoveResponse) {
            swal("Hari libur", "Tanggal berhasil dihapus!", "success");
            this.props.loadHolidays()
        }
    }

    render() {
        const {holidaysResponse} = this.props
        const {date, description} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-3 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Libur form</h4>
                                <p className="card-description">
                                    Input hari libur
                                </p>
                                <form className="forms-sample" ref={(ref) => this.formRef = ref}
                                      onSubmit={this.submitHoliday}
                                      noValidate>
                                    <div className="form-group">
                                        <label>Tanggal</label>
                                        <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}
                                                  isValidDate={disableBeforeDay}
                                                  value={date}
                                                  ref={this.startDateRef}
                                                  onChange={this.handleSelectDate}/>
                                        <span className="text-danger">{this.state.errorDate}</span>

                                    </div>
                                    <div className="form-group">
                                        <label>Keterangan</label>
                                        <textarea className="form-control" rows="4" value={description}
                                                  onChange={this.handleChangeDescription}/>
                                        <span className="text-danger">{this.state.errorDescription}</span>
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
                                <h4 className="card-title">Hari libur</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                Option
                                            </th>
                                            <th>
                                                Tanggal
                                            </th>
                                            <th>
                                                Keterangan
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            holidaysResponse.result.map((o, i) =>
                                                <tr key={i}>
                                                    <td className="py-1">
                                                        <button type="button"
                                                                className="btn btn-danger btn-sm btn-option"
                                                                onClick={() => this.handleModalShowHide(o.id)}>
                                                            <i className="mdi mdi-24px mdi-delete-circle"/>
                                                        </button>
                                                    </td>
                                                    <td>{formatDate(o.date)}</td>
                                                    <td>{o.description}</td>
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
    // console.log("state holiday form", state)
    return {
        holidayRemoveResponse: defList(state, HOLIDAYS_REMOVE_RESPONSE),
        holidaySubmitResponse: defList(state, HOLIDAYS_SUBMIT_RESPONSE),
        holidaysResponse: defList(state, HOLIDAYS_LOAD_RESPONSE),
    }
}

export default connect(mapStateToProps, {submitDateHoliday, removeDateHoliday, loadHolidays})(CalendarHoliday);