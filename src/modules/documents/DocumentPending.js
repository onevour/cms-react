import React, {Component, Fragment} from "react";
import swal from 'sweetalert';
import Pagination from "react-bootstrap-4-pagination";
import {connect} from "react-redux";
import {
    approveDocument,
    listDocumentPending,
    mergeDocument,
    pageDocument,
    removeDocument
} from "../../redux/actions/reduxActionMasterDocument";
import {
    BASE_URL,
    DOCUMENT_CRUD_RESPONSE,
    DOCUMENT_LIST_RESPONSE,
    DOCUMENT_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentList, emptyContentPage, emptyCrud} from "../../application/AppConstant";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getFileExtension} from "../../application/AppCommons";
//import {PDFReader} from "reactjs-pdf-reader/src/components/PDFReader/index";
import {PDFReader} from 'reactjs-pdf-reader'
// import PDFView from 'react.pdf.stream';
// import {Document, Page, pdfjs} from 'react-pdf';
// import { Document } from 'react-pdf/dist/esm/entry.webpack';


class DocumentPending extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            path: '',
            modalShow: false, modalState: 0,
            page: 0,
            id: 0,
            name: '',
            document: null
        }
        this.modalOnShow = this.modalOnShow.bind(this)
        this.modalClose = this.modalClose.bind(this)
    }

    componentDidMount() {
        this.props.listDocumentPending()
    }

    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.props.listDocumentPending()
            if (200 === this.props.crud.code) {
                swal("Dokumen", "Approve document berhasil!", "success");
            }
            if (201 === this.props.crud.code) {
                swal("Dokumen", "Tolak document berhasil!", "warning");
            }
        }
        if (props.documents !== this.props.documents) {


        }
    }

    delete(o) {

        // swal({
        //     title: "Tolak Dokumen",
        //     text: "Tolak Dokumen upload?",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // }).then((willDelete) => {
        //     if (willDelete) {
        //         const request = {
        //             id: o.id,
        //             approval: 1
        //         }
        //         // console.log("request form")
        //         this.props.approveDocument(request);
        //     }
        // });

        swal({
            text: 'Alasan penolakan dokumen',
            content: "input",
            icon: "warning",
            dangerMode: true,
            button: {
                text: "TOLAK!",
                closeModal: false,
            },
        }).then(name => {
            if (!name) {
                swal("Isi keterangan", "keterangan kosong!", "error");
                return true
            }
            const request = {
                id: o.id,
                approval: 1,
                message: name
            }
            // console.log("request form")
            this.props.approveDocument(request);
            //return true
            //return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
        })

    }

    update(o) {
        swal({
            title: "Approve Dokumen",
            text: "approve Dokumen?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((willDelete) => {
            if (willDelete) {
                const request = {
                    id: o.id,
                    approval: 2
                }
                // console.log("request form")
                this.props.approveDocument(request);
            }
        });
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

    modalOnShow() {
        //this.props.pageUserJabatan({filter: "", jenis_jabatan: "JF", id: (this.state.pangkat.id - 1), page: 0})
    }

    modalClose() {
        this.setState({modalShow: false, modalState: 0})
    }

    renderOptionBAK(o) {
        return (
            <>
                <button type="button"
                        className="btn btn-danger btn-sm btn-option mr-2"
                        onClick={() => this.delete(o)}>
                    <i className="mdi mdi-24px mdi-delete-circle"/>
                </button>
                <button type="button"
                        className="btn btn-success btn-sm btn-option mr-2"
                        onClick={() => this.update(o)}>
                    <i className="mdi mdi-24px mdi-check-circle-outline"/>
                </button>
                <a href={BASE_URL + '/user/view/digital/' + o.nip + '/' + o.id} download={true}
                   style={{marginTop: -10}}
                   className="ml-2" target={"_blank"}>download</a>

            </>
        )
    }

    renderOption(o) {
        return (
            <>
                <button type="button"
                        className="btn btn-danger btn-sm btn-option mr-2"
                        onClick={() => this.delete(o)}>
                    <i className="mdi mdi-24px mdi-delete-circle"/>
                </button>
                <button type="button"
                        className="btn btn-success btn-sm btn-option mr-2"
                        onClick={() => this.update(o)}>
                    <i className="mdi mdi-24px mdi-check-circle-outline"/>
                </button>
                <button type="button"
                        className="btn btn-success btn-sm btn-option mr-2"
                        onClick={() => {
                            fetch(BASE_URL + '/user/view/digital/' + o.nip + '/' + o.id)
                                .then(response => {
                                    if (response.ok) {
                                        response.blob().then(blob => {
                                            let url = window.URL.createObjectURL(blob);
                                            let a = document.createElement('a');
                                            a.href = url;
                                            a.download = o.nip + '-' + o.document + '.' + getFileExtension(o.path);
                                            a.click();
                                        });
                                    }
                                }).catch(function (err) {
                            });
                        }}>
                    <i className="mdi mdi-24px mdi-download"/>
                </button>
                <button type="button"
                        className="btn btn-success btn-sm btn-option mr-2"
                        onClick={() => {
                            this.setState({
                                url: BASE_URL + '/user/view/digital/' + o.nip + '/' + o.id,
                                modalShow: true,
                                path: o.path
                            })
                        }}>
                    <i className="mdi mdi-24px mdi-file-pdf-box"/>
                </button>
            </>
        )
    }

    viewFile(o) {
        if (o.path) {
            this.setState({document: o, modalShow: true})
        }
    }

    renderModalContent() {
        const {url, path} = this.state
        if (!path) return
        let ext = getFileExtension(path);
        if ('pdf' === ext || 'PDF' === ext) {
            return (<PDFReader url={url} showAllPage={true}/>)
        } else {
            return (
                <div className="text-center">
                    <img src={url} className="img-fluid" alt="view"/>
                </div>
            )
        }
    }

    render() {
        const {url, page, name} = this.state
        // const url = BASE_URL +'/user/view/digital/198909152014041001/5'
        // const url = "http://localhost:8081/api/v1/user/view/digital/196406241987032001/5"
        const {documents} = this.props
        // console.log(documents)
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Dokumen Pending</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                Opsi
                                            </th>
                                            <th>
                                                NIP
                                            </th>
                                            <th>
                                                Nama
                                            </th>
                                            <th>
                                                Dokumen
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            documents.result.map((o, i) =>
                                                <tr className="clickable" key={i}>
                                                    <td>{this.renderOption(o)}</td>
                                                    <td>{o.nip}</td>
                                                    <td>{o.nama}</td>
                                                    <td>{o.document}</td>
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

                <Modal size="lg" show={this.state.modalShow} onHide={this.modalClose} onShow={this.modalOnShow}
                       animation={false} backdrop="static">
                    <Modal.Header closeButton style={{backgroundColor: "white"}}>
                        <Modal.Title>View Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "#f2f8f9"}}>
                        {this.renderModalContent()}
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        documents: (state[DOCUMENT_LIST_RESPONSE] ? state[DOCUMENT_LIST_RESPONSE] : emptyContentList),
        crud: (state[DOCUMENT_CRUD_RESPONSE] ? state[DOCUMENT_CRUD_RESPONSE] : emptyCrud)
    }
}

export default connect(mapStateToProps, {listDocumentPending, approveDocument})(DocumentPending);