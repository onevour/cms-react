import React, {Component, Fragment} from "react";
import swal from 'sweetalert';
import {connect} from "react-redux";
import {cutiLabel, formatDate, formatDateTime, formatStatusCuti} from "../../application/AppCommons";
import {Redirect} from "react-router-dom";
import {BASE_URL} from "../../redux/constants/reducActionTypes";
import {approvePejabatCuti} from "../../redux/actions/reduxActionCuti";

class CutiDetailPejabat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backAction: false,
            approveAction: false,
            description: '',
            cuti: JSON.parse(this.props.location.state.body)
        }
        this.formRef = null;
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.rejectCuti = this.rejectCuti.bind(this)
        this.cancelPage = this.cancelPage.bind(this)
        this.cancelExistCuti = this.cancelExistCuti.bind(this)
        this.downloadCuti = this.downloadCuti.bind(this)
    }

    cancelPage(e) {
        e.preventDefault()
        this.setState({backAction: true})
    }

    renderRedirect() {
        if (this.state.backAction) {
            return <Redirect to={{
                pathname: '/cuti_approval_pejabat'
            }}/>
        }
    }


    componentDidUpdate(props) {
        if (props.cutiUpdateResponse !== this.props.cutiUpdateResponse) {
            var message = "Pembatalan cuti berhasil!";
            if (this.state.approveAction) {
                message = "Approve cuti berhasil!";
            }
            swal(message, {icon: "success",}).then((willDelete) => {
                this.setState({backAction: true})
            });
        }
    }

    cancelExistCuti(e) {
        e.preventDefault()
        this.setState({approveAction: true})
        swal({
            title: "Approve Cuti",
            text: "approve pengajuan cuti?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((willDelete) => {
            if (willDelete) {
                const payload = {
                    id: this.state.cuti.id,
                    approve_status: 5,
                    description_approve: this.state.description
                }
                this.props.approvePejabatCuti(payload)
            }
        });
    }

    rejectCuti(e) {
        e.preventDefault()
        this.setState({approveAction: false})
        swal({
            title: "Tolak Cuti",
            text: "tolak pengajuan cuti?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const payload = {
                    id: this.state.cuti.id,
                    approve_status: 2,
                    description_approve: this.state.description
                }
                this.props.approvePejabatCuti(payload)
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

    downloadCuti() {
        const {cuti} = this.state
        console.log(cuti)
        fetch(BASE_URL + '/api/v1/download/cuti/' + cuti.user.nip + '/' + cuti.id)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = cuti.user.nip + '-cuti-' + formatDate(cuti.start_date) + cuti.user.nama + '.pdf';
                    a.click();
                });
            });
    }

    renderApprovalAtasan() {
        const {cuti} = this.state
        if (cuti) {
            const {atasan} = cuti
            if (atasan) {
                return (
                    <Fragment>
                        <address className="norm">
                            <h5>{atasan.name}</h5>
                            <p> {atasan.nip} <br/>
                                {formatDateTime(cuti.approve_atasan_date)} <br/><br/>
                                {cuti.description_atasan}
                            </p>
                        </address>
                        <hr/>
                    </Fragment>
                )
            }
        }
    }

    renderApprovalPejabat() {
        const {cuti} = this.state
        if (cuti) {
            const {pejabat} = cuti
            if (pejabat) {
                return (
                    <Fragment>
                        <address className="norm">
                            <h5>{pejabat.name}</h5>
                            <p> {pejabat.nip} <br/>
                                {formatDateTime(cuti.approve_pejabat_date)} <br/><br/>
                                {cuti.description_pejabat}</p>
                        </address>
                        <hr/>
                    </Fragment>
                )
            }
        }
    }

    renderForm() {
        const {description} = this.state
        if (this.state.cuti.cuti_status === 4) {
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
                    <button type="submit" className="btn btn-success mr-2">Approve</button>
                    <button className="btn btn-danger mr-2" onClick={this.rejectCuti}>Tolak</button>
                    <button className="btn btn-light" onClick={this.cancelPage}>Cancel</button>
                </form>
            )
        } else return (<button className="btn btn-light" onClick={this.cancelPage}>Cancel</button>)
    }


    render() {
        const {cuti} = this.state
        return (
            <Fragment>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Pengajuan Cuti</h4>
                                <div className="col">
                                    <button type="submit" style={{marginTop: -30}}
                                            onClick={this.downloadCuti}
                                            className="btn btn-success btn-sm mr-2 float-right">Cetak
                                    </button>
                                </div>
                                <p className="card-description">
                                </p>
                                <hr/>
                                <article>
                                    <address className="norm">
                                        <h5>{cuti.user.name}</h5>
                                        <p> {cuti.user.nip} <br/>
                                            {formatDateTime(cuti.created_date)}</p>
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
                                {this.renderApprovalAtasan()}
                                {this.renderApprovalPejabat()}
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

export default connect(mapStateToProps, {approvePejabatCuti})(CutiDetailPejabat);