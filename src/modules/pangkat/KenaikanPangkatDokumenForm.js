import React, {Component, Fragment} from "react";
import {Button, Modal} from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import {Redirect} from "react-router-dom";

class KenaikanPangkatDokumenForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            back: false,
            pangkat: JSON.parse(this.props.location.state.body),
            showHide: false,
            startDate: new Date().toISOString(),
            documents: [
                {id: 1, name: "KTP", path: "download"},
                {id: 2, name: "SKCK", path: "download"},
                {id: 3, name: "Sertitikat I", path: "download"},
                {id: 4, name: "Sertitikat II", path: "download"},
                {id: 5, name: "Sertitikat III", path: "download"}
            ]
        }
        this.cancel = this.cancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.handleModalShowHide = this.handleModalShowHide.bind(this)
    }

    componentDidMount(props) {
        if (this.props.location.state === undefined) {
            return true
        }
        // const param = JSON.parse(this.props.location.state.body)
        // console.log("body", param);
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

    }

    cancel() {
        this.setState({back: true})
    }

    renderRedirect() {
        if (this.state.back) {
            return <Redirect to={{
                pathname: '/kenaikan_pangkat'
            }}/>
        }
    }

    renderTableData() {
        return this.state.pangkat.pangkat_golongan.document_pangkat.map((o, i) => {

            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{o.label}</td>
                    <td><input type="file"/></td>
                    <td><a className="mr-3" href="#">Download</a><a href="#">Preview</a></td>
                </tr>
            )
        })
    }

    render() {
        const {pangkat} = this.state
        console.log(pangkat)
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Dokumen Pomosi</h4>
                                <p className="card-description">
                                    Dokumen promosi pegawai
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                No
                                            </th>
                                            <th>
                                                Dokumen
                                            </th>
                                            <th>
                                                File
                                            </th>
                                            <th>
                                                Status
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderTableData()}
                                        </tbody>
                                    </table>
                                </div>
                                <button className="btn mt-3" onClick={this.cancel}>Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
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
export default KenaikanPangkatDokumenForm;