import React, {Component, Fragment, useState} from "react";
import {Button, Modal} from 'react-bootstrap'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

class CutiForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHide: false,
            startDate: new Date().toISOString()
        }
        this.handleChange = this.handleChange.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.handleModalShowHide = this.handleModalShowHide.bind(this)
    }

    handleModalShowHide() {
        this.setState({showHide: !this.state.showHide})
    }

    handleChange(value, formattedValue) {
        this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    componentDidUpdate() {
        // Access ISO String and formatted values from the DOM.
        // var hiddenInputElement = document.getElementById("example-datepicker");
        // console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
        // console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
    }

    render() {
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
                                <form className="forms-sample">
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect2">Jenis Cuti</label>
                                        <select className="form-control" id="exampleFormControlSelect2">
                                            <option>Sakit</option>
                                            <option>Cuti Tahunan</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail3">Tgl. Mulai</label>
                                        <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword4">Tgl. Selesai</label>
                                        <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleTextarea1">Keterangan</label>
                                        <textarea className="form-control" rows="4"/>
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
                                                Approve Date
                                            </th>
                                            <th>
                                                Approve By
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr onClick={() => this.handleModalShowHide()}>
                                            <td>Nama</td>
                                            <td>22-10-2020</td>
                                            <td>23-10-2020</td>
                                            <td>
                                                2 hari
                                            </td>
                                            <td>
                                                <label className="badge badge-danger">Pending</label>
                                            </td>
                                        </tr>
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

// <Modal show={this.state.show} onHide={handleClose}>
//     <Modal.Header closeButton>
//         <Modal.Title>Modal heading</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//     <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//             Close
//         </Button>
//         <Button variant="primary" onClick={handleClose}>
//             Save Changes
//         </Button>
//     </Modal.Footer>
// </Modal>
export default CutiForm;