import React, {Component, Fragment} from "react";
import {Button, Modal} from 'react-bootstrap'
import "react-datetime/css/react-datetime.css";
import {
    DOCUMENT_CRUD_RESPONSE,
    DOCUMENT_LIST_RESPONSE, PANGKAT_DOCUMENT_CRUD_RESPONSE,
    PANGKAT_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentPage, emptyContentList, emptyCrud} from "../../application/AppConstant";
import {connect} from "react-redux";
import {mergePangkatDocument, pagePangkat} from "../../redux/actions/reduxActionMasterPangkat";
import {listDocument} from "../../redux/actions/reduxActionMasterDocument";
import swal from "sweetalert";
import {Redirect} from "react-router-dom";

class PangkatDokumen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            back: false,
            pangkat: JSON.parse(this.props.location.state.body),
            documents: []
        }
        this.cancel = this.cancel.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount(props) {
        this.props.listDocument()
    }

    componentDidUpdate(props) {
        if (props.documents !== this.props.documents) {
            const {pangkat} = this.state
            const docs = this.props.documents.result.map((v, i) => {
                pangkat.document_pangkat.map((d, x) => {
                    if (d.value === v.value) {
                        v.check = true
                    }
                })
                return v
            })
            this.setState({documents: docs})
        }
        if (props.crud !== this.props.crud) {
            swal("Update dokumen berhasil!", {icon: "success",}).then((willDelete) => {
                this.setState({back: true})
            });
        }
    }

    onCheckDocument(checked, v) {
        var docs = this.state.documents.map((o, i) => {
            if (o.value === v.value) {
                o.check = checked
            }
            return o
        })
        this.setState({documents: docs})
    }

    submitForm(event) {
        event.preventDefault()
        var docs = []
        for (var i = 0; i < this.state.documents.length; i++) {
            var tmp = this.state.documents[i]
            if (tmp.check) {
                docs.push(tmp)
            }
        }
        const {pangkat} = this.state;
        const param = {
            id: pangkat.id,
            document_pangkat: docs
        }
        this.props.mergePangkatDocument(param)
    }

    cancel(event) {
        event.preventDefault()
        this.setState({back: true})
    }

    renderRedirect() {
        if (this.state.back) {
            return <Redirect to={{
                pathname: '/pangkat'
            }}/>
        }
    }

    renderDocument(o, index, col) {
        const {documents} = this.props
        const sisa = documents.result.length % 4
        var perPage = 0;
        var min = 0;
        var max = 0;
        if (sisa === 0) {
            perPage = documents.result.length / 4;
        } else {
            perPage = (documents.result.length + (4 - sisa)) / 4;
        }
        min = perPage * col;
        max = (perPage * col + perPage) - 1;
        if (index >= min && index <= max) {
            return (
                <div className="form-group" key={index}>
                    <div className="form-check form-check-flat">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input"
                                   onChange={(event) => {
                                       this.onCheckDocument(event.target.checked, o)
                                   }}
                                   checked={o.check}/>
                            {o.label}
                            <i className="input-helper"/>
                        </label>
                    </div>
                </div>
            )
        }
    }

    render() {
        const {pangkat, documents} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">{pangkat.nama} ({pangkat.golongan})</h4>
                                <p className="card-description">
                                    Dokumen Kenaikan Pangkat ({pangkat.golongan})
                                </p>
                                <form className="forms-sample" onSubmit={this.submitForm}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            {documents.map((o, i) => this.renderDocument(o, i, 0))}
                                        </div>
                                        <div className="col-md-3">
                                            {documents.map((o, i) => this.renderDocument(o, i, 1))}
                                        </div>
                                        <div className="col-md-3">
                                            {documents.map((o, i) => this.renderDocument(o, i, 2))}
                                        </div>
                                        <div className="col-md-3">
                                            {documents.map((o, i) => this.renderDocument(o, i, 3))}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success mr-2">Submit</button>
                                    <button className="btn" onClick={this.cancel}>Cancel</button>
                                </form>
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
        documents: (state[DOCUMENT_LIST_RESPONSE] ? state[DOCUMENT_LIST_RESPONSE] : emptyContentList),
        crud: (state[PANGKAT_DOCUMENT_CRUD_RESPONSE] ? state[PANGKAT_DOCUMENT_CRUD_RESPONSE] : emptyCrud)
    }
}

export default connect(mapStateToProps, {listDocument, mergePangkatDocument})(PangkatDokumen);