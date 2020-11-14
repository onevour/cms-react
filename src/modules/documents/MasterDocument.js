import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {connect} from "react-redux";
import {mergeDocument, pageDocument} from "../../redux/actions/reduxActionMasterDocument";
import {DOCUMENT_CRUD_RESPONSE, DOCUMENT_PAGE_RESPONSE} from "../../redux/constants/reducActionTypes";
import {emptyContent, emptyCrud} from "../../application/AppConstant";

class MasterDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            name: ''
        };
        this.changePage = this.changePage.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.submitForm = this.submitForm.bind(this)
        // this.props.pageDocument({filter: "", page: 0})
    }

    changePage(page) {
        this.setState({page: page - 1});
        this.props.pageDocument({filter: "", page: page - 1})
    }

    componentDidMount() {
        this.props.pageDocument({filter: "", page: 0})
    }

    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.setState({name: ''})
            this.props.pageDocument({filter: "", page: this.state.page})
        }
        if (props.documents !== this.props.documents) {


        }
    }

    handleChangeName(event) {
        console.log(event.target.value)
        this.setState({name: event.target.value})
    }

    submitForm(event) {
        event.preventDefault()
        const request = {
            name: this.state.name
        }
        console.log("submit")
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

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Document Type</h4>
                                <p className="card-description">
                                    Add class
                                    <code>.table-striped</code>
                                </p>
                                <div className="form-group row">
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-primary btn-sm">
                                            Add
                                        </button>
                                    </div>
                                    <div className="col-md-6"/>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" id="exampleInputName1"
                                               placeholder="Name"/>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                No.
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
                                                    <td>{i + 1}</td>
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
        documents: (state[DOCUMENT_PAGE_RESPONSE] ? state[DOCUMENT_PAGE_RESPONSE] : emptyContent),
        crud: (state[DOCUMENT_CRUD_RESPONSE] ? state[DOCUMENT_CRUD_RESPONSE] : emptyCrud)
    }
}

export default connect(mapStateToProps, {pageDocument, mergeDocument})(MasterDocument);