import React, {Component, Fragment} from "react";
import {Button, Modal} from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";

class PromosiDokumenForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        this.handleChange = this.handleChange.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.handleModalShowHide = this.handleModalShowHide.bind(this)
    }

    componentDidMount(props) {
        if (this.props.location.state === undefined) {
            return true
        }
        const param = JSON.parse(this.props.location.state.body)
        console.log("body", param.username);
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

    renderTableData() {
        return this.state.documents.map((document, index) => {
            const {id, name, path} = document //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td><input type="file"/></td>
                    <td><label className="badge badge-success">Completed</label></td>
                </tr>
            )
        })
    }

    render() {
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
export default PromosiDokumenForm;