import React, {Component, Fragment} from "react";
import {Button, Modal} from 'react-bootstrap';
import Datetime from 'react-datetime';
import Select from "react-select";
import swal from 'sweetalert';
import "react-datetime/css/react-datetime.css";
import moment from "moment-timezone";
import {defCrud, defList, emptyContentList, emptyCrud, JENIS_CUTI} from "../../application/AppConstant";
import {
    requestCuti,
    loadCutiUserLogin,
    calculateDays,
    loadHolidaysFuture,
    cutiQuota
} from "../../redux/actions/reduxActionCuti";
import {connect} from "react-redux";
import {
    clearInput,
    cutiLabel,
    disableBeforeDay,
    formatDate,
    formatStatusCuti,
    getFileExtension, selectedTabClass
} from "../../application/AppCommons";
import {Redirect} from "react-router-dom";
import {
    BASE_URL, CUTI_CALCULATE_DAY_RESPONSE,
    CUTI_LOAD_USER, CUTI_LOAD_USER_RESPONSE,
    CUTI_QUOTA_RESPONSE, CUTI_SUBMIT_RESPONSE,
    DOCUMENT_CRUD_RESPONSE, HOLIDAYS_LOAD_FUTURE_RESPONSE
} from "../../redux/constants/reducActionTypes";

class CutiForm extends Component {

    constructor(props) {
        super(props);
        require("moment-business-days")
        const user = JSON.parse(localStorage.getItem('user'))
        let userTelepon = ''
        user.contacts.map((o, i) => {
            if (o.type === 1) {
                userTelepon = o.value
            }
        })
        this.state = {
            direct: false,
            directBody: null,
            showHide: false,
            // form variable
            startDate: null,
            startDateValue: null,
            finishDate: null,
            totalDays: 0,
            jenisCuti: '',
            description: '',
            tlpAddress: userTelepon,
            cutiAddress: user.alamat,
            file: null,
            ext: '',
            // valid
            errorjenisCuti: '',
            errorStartDate: '',
            errorFinishDate: '',
            errorDescription: '',
            errorPhone: '',
            errorAddress: '',
            errorServer: '',
            // table
            tabs: [
                {
                    selected: true,
                    label: "Pending",
                    content: 0,
                },
                {
                    selected: false,
                    label: "Approve",
                    content: 1,

                },
                {
                    selected: false,
                    label: "Cancel",
                    content: 2,

                }
            ],
            content: 0,

        }
        this.formRef = null;
        this.startDateRef = React.createRef();
        this.finishDateRef = React.createRef();
        this.handleChange = this.handleChange.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.handleChangeCuti = this.handleChangeCuti.bind(this)
        this.handleTypeSelect = this.handleTypeSelect.bind(this)
        this.handleSelectStartDate = this.handleSelectStartDate.bind(this)
        this.handleSelectFinishDate = this.handleSelectFinishDate.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleChangeTelepon = this.handleChangeTelepon.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.submitFormCuti = this.submitFormCuti.bind(this)
    }

    handleChangeCuti(event) {
        this.setState({jenisCuti: event.value})
    }

    handleTypeSelect(e) {
        console.log("handle selected")
        return e.value;
    }

    handleSelectStartDate(e) {
        this.setState({startDate: e})
        const {finishDate} = this.state
        if (finishDate) {
            // const totalDays = (finishDate.businessDiff(e, 'days')) + 1
            // this.setState({totalDays: totalDays})
            // if (0 >= totalDays) {
            //     this.setState({errorFinishDate: 'Finish date after start Date!'});
            // } else this.setState({errorFinishDate: null});
            const request = {
                start_date: e.format(),
                finish_date: finishDate.format()
            }
            this.props.calculateDays(request)
        }
    }

    handleSelectFinishDate(e) {
        this.setState({finishDate: e})
        const {startDate} = this.state
        if (startDate) {
            const request = {
                start_date: startDate.format(),
                finish_date: e.format()
            }
            this.props.calculateDays(request)
        }
    }

    handleModalShowHide(body) {
        this.setState({direct: true, directBody: body})
        this.renderRedirect()
    }

    renderRedirect() {
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/cuti_detail',
                state: {body: JSON.stringify(this.state.directBody)}
            }}/>
        }
    }

    handleChange(value, formattedValue) {
        this.setState({
            value: value,                   // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    handleChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    handleChangeTelepon(event) {
        this.setState({tlpAddress: event.target.value});
    }

    handleChangeAddress(event) {
        this.setState({cutiAddress: event.target.value});
    }

    handleChangeFile(file) {
        new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                this.setState({file: fileReader.result, ext: getFileExtension(file.name)})
            }
            fileReader.onerror = (error) => {
                this.setState({file: null})
                // reject(error);
            }
        })
    }

    submitFormCuti(event) {
        event.preventDefault()
        // error
        var hasError = false
        if (this.state.startDate !== null && this.state.finishDate !== null) {
            this.setState({errorStartDate: null, errorFinishDate: null})
            if (this.state.finishDate.isBefore(this.state.startDate)) {
                hasError = true
                this.setState({errorFinishDate: 'Tanggal selesai sebelum tgl mulai!'});
            }
        } else {
            if (null === this.state.startDate) {
                this.setState({errorStartDate: 'Start date cannot be empty!'});
                hasError = true
            } else this.setState({errorStartDate: null})

            if (null === this.state.finishDate) {
                this.setState({errorFinishDate: 'Finish date cannot be empty!'});
                hasError = true
            } else this.setState({errorFinishDate: null})
        }
        if (null === this.state.jenisCuti || '' === String(this.state.jenisCuti).trim()) {
            this.setState({errorjenisCuti: 'Please select jenis cuti!'});
            hasError = true
        } else this.setState({errorjenisCuti: null})
        if (null === this.state.description || '' === this.state.description.trim()) {
            this.setState({errorDescription: 'Input keterangan cuti!'});
            hasError = true
        } else this.setState({errorDescription: null})

        if (null === this.state.tlpAddress || '' === this.state.tlpAddress.trim()) {
            this.setState({errorPhone: 'Please input phone number!'});
            hasError = true
        } else this.setState({errorPhone: null})

        if (null === this.state.cutiAddress || '' === this.state.cutiAddress.trim()) {
            this.setState({errorAddress: 'Please input alamat cuti!'});
            hasError = true
        } else this.setState({errorAddress: null})

        if (hasError) return false
        const request = {
            start_date: this.state.startDate.format(),
            finish_date: this.state.finishDate.format(),
            total_days: this.state.totalDays,
            jenis_cuti: this.state.jenisCuti,
            description: this.state.description,
            tlp_address: this.state.tlpAddress,
            cuti_address: this.state.cutiAddress,
            file: this.state.file,
            ext: this.state.ext,
        }
        this.props.requestCuti(request);

    }

    componentDidUpdate(props) {
        if (props.cuti_submit !== this.props.cuti_submit) {
            if (this.props.cuti_submit.code === 200) {
                swal("Cuti", "Pengajuan cuti berhasil!", "success");
                // clear
                const user = JSON.parse(localStorage.getItem('user'))
                let userTelepon = ''
                user.contacts.map((o, i) => {
                    if (o.type === 1) {
                        userTelepon = o.value
                    }
                })
                this.setState({
                    loading: true,
                    startDate: '',
                    startDateValue: '',
                    finishDate: '',
                    totalDays: 0,
                    jenisCuti: '',
                    description: '',
                    tlpAddress: userTelepon,
                    cutiAddress: user.alamat,
                    file: null,
                    ext: ''
                })

                this.formRef.reset();
                clearInput(this.startDateRef)
                clearInput(this.finishDateRef)
                this.setState({errorServer: ''})
                this.props.calculateDays({})
            } else {
                this.setState({errorServer: this.props.cuti_submit.message})
            }
            setTimeout(() => {
                this.props.loadCutiUserLogin()
            }, 1500);

        }
        // holiday
    }

    componentDidMount() {
        this.props.loadCutiUserLogin()
        this.props.cutiQuota()
        this.props.loadHolidaysFuture()
        this.props.calculateDays({})
    }

    renderQuotaCuti(user_quota, flag) {
        if (!user_quota.result) return 0
        if ('A' === flag) {
            return (user_quota.result.kuota_cuti)
        }
        if ('P1' === flag) {
            return (user_quota.result.kuota_past_cuti)
        }
        return (user_quota.result.kuota_past_two_cuti)
    }

    donwloadLampiran(o) {
        fetch(BASE_URL + '/cuti/download/lampiran/' + o.id).then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'lampiran.pdf';
                a.click();
            })
        })
    }

    renderLampiran(o) {
        if (!o.file_name) {
            return true
        }
        return (
            <a href="#" style={{marginTop: -10}}
               onClick={() => {
                   const {user} = this.state
                   fetch(BASE_URL + '/cuti/download/lampiran/' + +o.id)
                       .then(response => {
                           if (response.ok) {
                               response.blob().then(blob => {
                                   let url = window.URL.createObjectURL(blob);
                                   let a = document.createElement('a');
                                   a.href = url;
                                   a.download = 'cuti.' + getFileExtension(o.path);
                                   a.click();
                               });
                           }
                       }).catch(function (err) {
                   });
               }}>download</a>
        )
    }

    selectedTab(index) {
        var content = null
        const tabs = this.state.tabs.map((val, i) => {
            val.selected = index === i
            if (val.selected) {
                content = val.content;
            }
            return val
        })
        this.setState({tabs: tabs, content: content})
    }

    render() {
        const {user_cuties, cuti_calculate_days, holidays, user_quota} = this.props
        const {tabs, content, startDate, jenisCuti, description, tlpAddress, cutiAddress} = this.state
        const filter_cuti = user_cuties.result.filter(item => {
            console.log(item)
            if (0 === content) {
                return item.cuti_status === 3 || item.cuti_status === 4
                    //|| item.cuti_status === 5
            }
            if (1 === content) {
                return item.cuti_status >= 5
            }
            if (2 === content) {
                return item.cuti_status < 3
            }
            return false
        })
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-3 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Pengajuan Cuti</h4>
                                <p className="card-description">
                                    Sisa cuti anda({this.renderQuotaCuti(user_quota, 'A')})
                                    1 tahun lalu({this.renderQuotaCuti(user_quota, 'P1')})
                                    2 tahun lalu({this.renderQuotaCuti(user_quota, 'P2')})
                                </p>
                                <form className="forms-sample" ref={(ref) => this.formRef = ref}
                                      onSubmit={this.submitFormCuti}
                                      noValidate>
                                    <div className="form-group">
                                        <label htmlFor="jenisCuti">Jenis Cuti</label>
                                        <Select className="form-control select-tmd" options={JENIS_CUTI}
                                                onChange={this.handleChangeCuti}
                                                value={JENIS_CUTI.filter(function (option) {
                                                    return option.value === jenisCuti
                                                })}
                                                label="Single select"
                                        />
                                        <span className="text-danger">{this.state.errorjenisCuti}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Tgl. Mulai</label>
                                        <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}
                                                  isValidDate={(current) => {
                                                      const isWeekend = disableBeforeDay(current);
                                                      if (isWeekend) {
                                                          for (let i = 0; i < holidays.result.length; i++) {
                                                              const o = holidays.result[i]
                                                              const holiday = moment(o.date)
                                                              if (holiday.isSame(current, 'day')) return false
                                                          }
                                                          return true
                                                      } else return false
                                                  }}
                                                  value={startDate}
                                                  ref={this.startDateRef}
                                                  onChange={this.handleSelectStartDate}/>

                                        <span className="text-danger">{this.state.errorStartDate}</span>

                                    </div>
                                    <div className="form-group">
                                        <label>Tgl. Selesai</label>
                                        <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} closeOnSelect={true}
                                                  isValidDate={(current) => {
                                                      const isWeekend = disableBeforeDay(current);
                                                      if (isWeekend) {
                                                          for (let i = 0; i < holidays.result.length; i++) {
                                                              const o = holidays.result[i]
                                                              const holiday = moment(o.date)
                                                              if (holiday.isSame(current, 'day')) return false
                                                          }
                                                          return true
                                                      } else return false
                                                  }}
                                                  ref={this.finishDateRef}
                                                  onChange={this.handleSelectFinishDate}/>
                                        <span className="text-danger">{this.state.errorFinishDate}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Total Hari</label>
                                        <input readOnly type="text" className="form-control" placeholder="Durasi Cuti"
                                               value={(cuti_calculate_days.result ? cuti_calculate_days.result : 0)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Keterangan</label>
                                        <textarea className="form-control" rows="4" value={description}
                                                  onChange={this.handleChangeDescription}/>
                                        <span className="text-danger">{this.state.errorDescription}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>No. Telp Selama Cuti</label>
                                        <input type="text" className="form-control" placeholder="No. Telp selama cuti"
                                               value={tlpAddress} onChange={this.handleChangeTelepon}/>
                                        <span className="text-danger">{this.state.errorPhone}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Alamat Selama Cuti</label>
                                        <textarea className="form-control" rows="4" value={cutiAddress}
                                                  onChange={this.handleChangeAddress}/>
                                        <span className="text-danger">{this.state.errorAddress}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Lampiran</label>
                                        <input type="file" className="form-control" placeholder="Lampiran"
                                               onChange={(e) => {
                                                   const file = e.target.files[0]
                                                   if (file) {
                                                       this.handleChangeFile(file)
                                                   }
                                               }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <span className="text-danger">{this.state.errorServer}</span>
                                    </div>
                                    <button type="submit" className="btn btn-success mr-2">Submit</button>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Cuti</h4>
                                <p className="card-description">
                                    Cuti Anda
                                </p>
                                <ul className="nav nav-tabs">
                                    {tabs.map((o, i) =>
                                        <li className="nav-item" key={i}>
                                            <a className={selectedTabClass(o)}
                                               onClick={(e) => {
                                                   e.preventDefault();
                                                   this.selectedTab(i)
                                               }} href="#">{o.label}</a>
                                        </li>
                                    )}
                                </ul>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                Jenis Cuti
                                            </th>
                                            <th>
                                                Tgl. Mulai
                                            </th>
                                            <th>
                                                Tgl. Selesai
                                            </th>
                                            <th>
                                                Total Hari
                                            </th>
                                            <th>
                                                Status
                                            </th>
                                            <th>
                                                Approve Atasan
                                            </th>
                                            <th>
                                                Approve Pejabat
                                            </th>
                                            <th>
                                                Lampiran
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            filter_cuti.map((o, i) =>
                                                <tr className="clickable" key={i}
                                                    onClick={() => this.handleModalShowHide(o)}>
                                                    <td>{cutiLabel(o.jenis_cuti)}</td>
                                                    <td>{formatDate(o.start_date)}</td>
                                                    <td>{formatDate(o.finish_date)}</td>
                                                    <td>{o.total_days}</td>
                                                    <td>{formatStatusCuti(o.cuti_status)}</td>
                                                    <td>{formatDate(o.approve_atasan_date)}</td>
                                                    <td>{formatDate(o.approve_pejabat_date)}</td>
                                                    <td>{this.renderLampiran(o)}</td>
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
                {this.renderRedirect()}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        cuti_submit: defCrud(state, CUTI_SUBMIT_RESPONSE),
        user_quota: defCrud(state, CUTI_QUOTA_RESPONSE),
        user_cuties: defList(state, CUTI_LOAD_USER_RESPONSE),
        holidays: defList(state, HOLIDAYS_LOAD_FUTURE_RESPONSE),
        cuti_calculate_days: defCrud(state, CUTI_CALCULATE_DAY_RESPONSE)
    }
}

export default connect(mapStateToProps, {
    loadHolidaysFuture,
    loadCutiUserLogin,
    cutiQuota,
    calculateDays,
    requestCuti
})(CutiForm);