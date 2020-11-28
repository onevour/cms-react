import React, {Component, Fragment} from "react";
import {formatDate, formatYear, getFileExtension} from "../../../application/AppCommons";
import swal from "sweetalert";
import {BASE_URL, USER_CRUD_RESPONSE, USER_RESPONSE} from "../../../redux/constants/reducActionTypes";
import Datetime from "react-datetime";
import {emptyCrud} from "../../../application/AppConstant";
import {connect} from "react-redux";
import {removePelatihan, updatePelatihan, userProfile} from "../../../redux/actions/reduxActionUser";

class EmployeePelatihanJabatanForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            request: 0,
            date: null,
            tmt: null,
            value: '',
            type: 1,
            ext: '',
            file: null,
            errorServer: ''
        }
        console.log("type: ", props.type)
        this.handleSelectDate = this.handleSelectDate.bind(this)
        this.handleSelectTmt = this.handleSelectTmt.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this.handleChangeFile = this.handleChangeFile.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount() {
        this.props.userProfile()
    }

    componentDidUpdate(props) {
        if (props.userUpdate !== this.props.userUpdate) {
            this.props.userProfile()
        }
        if (props.user !== this.props.user) {
            const user = this.props.user.result
            if (!user) return true
            localStorage.setItem('user', JSON.stringify(user))
            if (this.state.request === 1) {
                swal("Update profile", "Update data diri berhasil!", "success")
            }
            this.setState({
                request: 0,
                date: null,
                tmt: null,
                value: '',
                type: 1,
                ext: '',
                file: null,
                errorServer: ''
            })

        }
    }

    handleSelectDate(e) {
        this.setState({date: e})
    }

    handleSelectTmt(e) {
        this.setState({tmt: e})
    }

    onChangeValue(e) {
        let value = e.target.value
        this.setState({'value': value})
    }

    async handleChangeFile(e) {
        const file = e.target.files[0]
        if (!file) {
            this.setState({ext: '', file: ''})
            return true
        }
        await new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                this.setState({ext: getFileExtension(file.name), file: fileReader.result})
            }
            fileReader.onerror = (error) => {
                this.setState({ext: '', file: ''})
            }
        })
    }

    submitForm(e) {
        e.preventDefault()
        const {type, ext, file, date, tmt, value} = this.state
        if (value === '') {
            console.log('not a number', value)
            this.setState({errorServer: 'Hukuman disiplin empty'})
            return;
        }
        const param = {
            tahun: date,
            tmt: tmt,
            nilai: 0,
            diklat: value,
            type: type,
            diklat_type: (1 === type ? "JABATAN" : "TEKNIS"),
            ext: ext,
            file: file
        }
        this.props.updatePelatihan(param)
        this.setState({request: 1})
    }

    handleRemove(o, index) {
        swal({
            title: "Hapus Diklat",
            text: "hapus Diklat tahun " + formatYear(o.tahun) + ", " + o.diklat + "?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.removePelatihan(o)
            }
        });
    }

    renderDownloadView(user, index, o) {
        console.log(user)
        if (!user && !o) return
        if (!o.path) return
        return (
            <a href="#" style={{marginTop: -10}} target="_blank"
               onClick={(e) => {
                   e.preventDefault()
                   fetch(BASE_URL + '/user/download/profile/' + user.nip + '/' + o.path)
                       .then(response => {
                           if (response.ok) {
                               response.blob().then(blob => {
                                   let url = window.URL.createObjectURL(blob);
                                   let a = document.createElement('a');
                                   a.href = url;
                                   a.download = user.nip + '-skp-' + index + '.' + getFileExtension(o.path);
                                   a.click();
                               });
                           }
                       }).catch(function (err) {
                   });
               }}>download</a>
        )
    }

    renderTable(user, pelatihans) {
        let result = pelatihans.filter(item => item.type === 'JABATAN')
        return (
            result.map((o, i) =>
                <tr key={i}>
                    <td>
                        <button type="button"
                                className="btn btn-danger btn-sm btn-option"
                                onClick={() => this.handleRemove(o, (i + 1))}>
                            <i className="mdi mdi-24px mdi-delete-circle"/>
                        </button>
                    </td>
                    <td>{formatYear(o.tahun)}</td>
                    <td>{formatYear(o.tmt)}</td>
                    <td>{o.diklat}</td>
                    <td>{this.renderDownloadView(user, (i + 1), o)}</td>
                </tr>
            )
        )
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'))
        const {date, tmt, value} = this.state
        return (
            <Fragment>
                <div className="col-md-3">
                    <form className="forms-sample" ref={(ref) => this.formRef = ref}
                          onSubmit={this.submitForm}
                          noValidate>
                        <div className="form-group">
                            <label>Tahun</label>
                            <Datetime dateFormat="YYYY" timeFormat={false} closeOnSelect={true}
                                      value={date}
                                      initialViewMode={"years"}
                                      onChange={this.handleSelectDate}/>
                        </div>
                        <div className="form-group">
                            <label>TMT</label>
                            <Datetime dateFormat="YYYY" timeFormat={false} closeOnSelect={true}
                                      value={tmt}
                                      initialViewMode={"years"}
                                      onChange={this.handleSelectTmt}/>
                        </div>
                        <div className="form-group">
                            <label>Diklat</label>
                            <input type="text" className="form-control" placeholder="Diklat"
                                   value={value} onChange={this.onChangeValue}/>
                        </div>
                        <div className="form-group">
                            <label>Dokumen</label>
                            <input type="file" className="form-control" onChange={this.handleChangeFile}/>
                        </div>
                        <div className="form-group">
                            <span className="text-danger">{this.state.errorServer}</span>
                        </div>
                        <button type="submit" className="btn btn-success mr-2">ADD</button>
                    </form>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-8">
                    <div className="table-responsive" style={{marginTop: 20}}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Opsi</th>
                                <th>Tahun</th>
                                <th>TMT</th>
                                <th>Diklat</th>
                                <th>Dokumen</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTable(user, user.pelatihans)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: (state[USER_RESPONSE] ? state[USER_RESPONSE] : emptyCrud),
        userUpdate: (state[USER_CRUD_RESPONSE] ? state[USER_CRUD_RESPONSE] : emptyCrud)
    }
}

export default connect(mapStateToProps, {
    userProfile,
    updatePelatihan,
    removePelatihan
})(EmployeePelatihanJabatanForm)