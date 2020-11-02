import React, {Component, Fragment} from "react";
import swal from 'sweetalert';
import {cancelCuti, loadCutiUserLogin} from "../../redux/actions/index";
import {connect} from "react-redux";
import {cutiLabel, formatDate, formatStatusCuti} from "../../application/AppCommons";
import {Redirect} from "react-router-dom";

class CutiDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backAction: false,
            description: '',
            cuti: JSON.parse(this.props.location.state.body)
        }
        this.formRef = null;
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.cancelPage = this.cancelPage.bind(this)
        this.cancelExistCuti = this.cancelExistCuti.bind(this)
    }

    cancelPage(e) {
        e.preventDefault()
        this.setState({backAction: true})
    }

    renderRedirect() {
        if (this.state.backAction) {
            return <Redirect to={{
                pathname: '/cuti'
            }}/>
        }
    }

    renderForm() {
        const {description} = this.state
        if (this.state.cuti.cuti_status === 3) {
            return (
                <form className="forms-sample" ref={(ref) => this.formRef = ref}
                      onSubmit={this.cancelExistCuti}
                      noValidate>
                    <div className="form-group">
                        <label>Keterangan</label>
                        <textarea className="form-control" rows="4" value={description}
                                  onChange={this.handleChangeDescription}/>
                        <span className="text-danger">{this.state.errorDescription}</span>
                    </div>
                    <button type="submit" className="btn btn-danger mr-2">Batal
                    </button>
                    <button className="btn btn-light" onClick={this.cancelPage}>Cancel</button>
                </form>
            )
        } else return (<button className="btn btn-light" onClick={this.cancelPage}>Cancel</button>)
    }

    componentDidUpdate(props) {
        if (props.cutiUpdateResponse !== this.props.cutiUpdateResponse) {
            swal("Pembatalan cuti berhasil!", {icon: "success",}).then((willDelete) => {
                this.setState({backAction: true})
            });
        }
    }

    cancelExistCuti(e) {
        e.preventDefault()
        swal({
            title: "Hapus Cuti",
            text: "batalkan pengajuan cuti anda?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const payload = {
                    id: this.state.cuti.id
                }
                this.props.cancelCuti(payload)
            }
        });
    }

    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    componentDidMount(props) {
        if (this.props.location.state === undefined || this.props.location.state === null) {
            console.log("location state is null")
            // return true
        } else {
            const param = JSON.parse(this.props.location.state.body)
            this.setState({cuti: param})
        }
    }

    render() {
        const {cuti, description} = this.state
        return (
            <Fragment>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Pengajuan Cuti</h4>
                                <p className="card-description">

                                </p>
                                <hr/>


                                <article>
                                    <address className="norm">
                                        <h4>{cuti.user.name}</h4>
                                        <p> {cuti.user.nip} <br/>
                                            {cuti.cuti_address} <br/>
                                            {cuti.tlp_address}</p>
                                    </address>
                                    <table className="table table-borderless table-sm">
                                        <tbody>
                                        <tr>
                                            <td><span>Cuti</span></td>
                                            <td><span>{cutiLabel(cuti.jenis_cuti)}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Tanggal</span></td>
                                            <td>
                                                <span>{formatDate(cuti.start_date)} s.d. {formatDate(cuti.finish_date)} </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span>Jumlah Hari</span></td>
                                            <td><span>{cuti.total_days}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>No Telp.</span></td>
                                            <td><span>{cuti.tlp_address} </span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Alamat</span></td>
                                            <td><span>{cuti.cuti_address} </span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Keterangan</span></td>
                                            <td><span>{cuti.description} </span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Status</span></td>
                                            <td><span>{formatStatusCuti(cuti.cuti_status)} </span></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </article>
                                <hr/>
                                <p className="card-description">

                                </p>
                                {this.renderForm()}
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
        cutiUpdateResponse: state.cutiUpdateResponse
    }
}

export default connect(mapStateToProps, {cancelCuti})(CutiDetail);
// export default CutiDetail;