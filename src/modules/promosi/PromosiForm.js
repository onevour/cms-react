import React, {Component, Fragment, useState} from "react";
import {Button, Modal} from 'react-bootstrap'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {Redirect} from "react-router-dom";

class PromosiForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHide: false,
            direct: false,
            startDate: new Date().toISOString()
        }
        this.handleChange = this.handleChange.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.handleModalShowHide = this.handleModalShowHide.bind(this)
    }

    handleModalShowHide() {
        this.setState({ direct: true })
        this.renderRedirect()
    }

    renderRedirect() {
        const body = {
            id: 123,
            username: "zuliadin"
        }
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/promosi_dokumen',
                state: {body: JSON.stringify(body)}
            }}/>
        }
    }

    handleChange(value, formattedValue) {
        this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Pomosi</h4>
                                <p className="card-description">
                                    History promosi pegawai
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                Tahun
                                            </th>
                                            <th>
                                                Promosi
                                            </th>
                                            <th>
                                                Dokumen
                                            </th>
                                            <th>
                                                Status
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr onClick={this.handleModalShowHide}>
                                            <td>2020</td>
                                            <td>Kenaikan Jabatan</td>
                                            <td>10 Dokumen</td>
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
                {this.renderRedirect()}
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
export default PromosiForm;