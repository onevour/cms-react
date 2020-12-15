import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {connect} from "react-redux";
import {mergeDocument, pageDocument, removeDocument} from "../../redux/actions/reduxActionMasterDocument";
import {DOCUMENT_CRUD_RESPONSE, DOCUMENT_PAGE_RESPONSE} from "../../redux/constants/reducActionTypes";
import {emptyContentPage, emptyCrud} from "../../application/AppConstant";

class MasterDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            id: 0,
            name: ''
        };
        this.changePage = this.changePage.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    componentDidMount() {
        this.props.pageDocument({filter: "", page: 0})
    }

    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.setState({id: 0, name: ''})
            this.props.pageDocument({filter: "", page: this.state.page})
        }
        if (props.documents !== this.props.documents) {


        }
    }

    changePage(page) {
        this.setState({page: page - 1});
        this.props.pageDocument({filter: "", page: page - 1})
    }

    handleChangeName(event) {
        // console.log(event.target.value)
        this.setState({name: event.target.value})
    }

    cancel() {
        this.setState({id: 0, name: ''})
    }

    delete(o) {
        const request = {
            id: o.value
        }
        // console.log("request form")
        this.props.removeDocument(request);
    }

    update(o) {
        this.setState({id: o.value, name: o.label})
    }

    submitForm(event) {
        event.preventDefault()
        const request = {
            id: this.state.id,
            name: this.state.name
        }
        // console.log("submit")
        this.props.mergeDocument(request)
    }

    render() {
        const {page, name} = this.state
        const {documents} = this.props
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-3 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Dokumen</h4>
                                <form className="forms-sample" ref={(ref) => this.formRef = ref}
                                      onSubmit={this.submitForm}
                                      noValidate>
                                    <div className="form-group">
                                        <label>Nama Dokumen</label>
                                        <input type="text" className="form-control" placeholder="Nama dokumen"
                                               value={name}
                                               onChange={this.handleChangeName}/>
                                        <span className="text-danger">{this.state.errorjenisCuti}</span>
                                    </div>
                                    <button type="submit" className="btn btn-success mr-2">Submit</button>
                                    <button className="btn" onClick={this.cancel}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Document Type</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                Opsi
                                            </th>
                                            <th>
                                                Dokumen
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            documents.result.values.map((o, i) =>
                                                <tr className="clickable" key={i}>
                                                    <td>
                                                        <button type="button"
                                                                className="btn btn-danger btn-sm btn-option mr-2"
                                                                onClick={() => this.delete(o)}>
                                                            <i className="mdi mdi-24px mdi-delete-circle"/>
                                                        </button>
                                                        <button type="button"
                                                                className="btn btn-warning btn-sm btn-option"
                                                                onClick={() => this.update(o)}>
                                                            <i className="mdi mdi-24px mdi-pencil"/>
                                                        </button>
                                                    </td>
                                                    <td>{o.label}</td>
                                                </tr>
                                            )
                                        }
                                        </tbody>

                                    </table>
                                </div>
                                <Pagination
                                    totalPages={documents.result.page_total}
                                    currentPage={(page + 1)}
                                    showMax={5}
                                    onClick={this.changePage}
                                />

                            </div>
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        documents: (state[DOCUMENT_PAGE_RESPONSE] ? state[DOCUMENT_PAGE_RESPONSE] : emptyContentPage),
        crud: (state[DOCUMENT_CRUD_RESPONSE] ? state[DOCUMENT_CRUD_RESPONSE] : emptyCrud)
    }
}

export default connect(mapStateToProps, {pageDocument, mergeDocument, removeDocument})(MasterDocument);