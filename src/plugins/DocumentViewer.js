import React, {Component, Fragment} from "react";
import {Modal} from "react-bootstrap";
import {getFileExtension} from "../application/AppCommons";
import {PDFReader} from "reactjs-pdf-reader";
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';

class DocumentViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            path: '',
            callback: null,
            modalShow: props.modalShow, modalState: 0,
        }
        this.modalOnShow = this.modalOnShow.bind(this)
        this.modalClose = this.modalClose.bind(this)
    }

    componentWillReceiveProps(props) {
        // console.log(props.path, props.url)
        this.setState({modalShow: props.modalShow, url: props.url, path: props.path, callback: props.callback})
    }

    modalOnShow() {
        //this.props.pageUserJabatan({filter: "", jenis_jabatan: "JF", id: (this.state.pangkat.id - 1), page: 0})
    }

    modalClose() {
        this.setState({modalShow: false, modalState: 0, url: '', path: ''})
        this.state.callback()
    }

    renderContent() {
        const {url, path} = this.props
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
        const {modalShow} = this.state
        return (
            <Fragment>
                <Modal size="lg" show={modalShow} onHide={this.modalClose} onShow={this.modalOnShow}
                       animation={false} backdrop="static" scrollable={true}>
                    <Modal.Header closeButton style={{backgroundColor: "white"}}>
                        <Modal.Title>View Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "#f2f8f9"}}>
                        {this.renderContent()}
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}

export default DocumentViewer