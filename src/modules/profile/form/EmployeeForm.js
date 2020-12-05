import React, {Component, Fragment} from "react";
import Select from "react-select";
import {JENIS_CUTI} from "../../../application/AppConstant";
import Datetime from "react-datetime";
import {disableBeforeDay, selectedTabClass} from "../../../application/AppCommons";
import moment from "moment-timezone";
import EmployeePendidikan from "../datapribadi/EmployeePendidikan";
import EmployeeDataKeluargaV2 from "../datapribadi/EmployeeDataKeluargaV2";
import EmployeeDataDigital from "../datapribadi/EmployeeDataDigital";
import EmployeeDataPribadi from "../datapribadi/EmployeeDataPribadi";
import EmployeeDataKepegawaian from "../kepegawaian/EmployeeDataKepegawaian";
import EmployeeDataRiwayat from "../riwayat/EmployeeDataRiwayat";
import EmployeeProfileForm from "./EmployeeProfileForm";
import EmployeeSKPForm from "./EmployeeSKPForm";
import EmployeeAngkaKreditForm from "./EmployeeAngkaKreditForm";
import EmployeeSatyaLencanaForm from "./EmployeeSatyaLencanaForm";
import EmployeeHukumanDisiplinForm from "./EmployeeHukumanDisiplinForm";
import EmployeePelatihanJabatanForm from "./EmployeePelatihanJabatanForm";
import EmployeePelatihanTeknisForm from "./EmployeePelatihanTeknisForm";

class EmployeeForm extends Component {

    constructor(props) {
        super(props);
        require("moment-business-days")
        this.state = {
            tabs: [
                {
                    selected: true,
                    label: "Profile",
                    content: <EmployeeProfileForm/>
                }, {
                    selected: false,
                    label: "SKP",
                    content: <EmployeeSKPForm/>
                }, {
                    selected: false,
                    label: "Angka kredit",
                    content: <EmployeeAngkaKreditForm/>
                }, {
                    selected: false,
                    label: "Satya Lancana",
                    content: <EmployeeSatyaLencanaForm/>
                }, {
                    selected: false,
                    label: "Hukuman Disiplin",
                    content: <EmployeeHukumanDisiplinForm/>
                }, {
                    selected: false,
                    label: "Pelatihan Jabatan",
                    content: <EmployeePelatihanJabatanForm/>
                }, {
                    selected: false,
                    label: "Pelatihan Teknis",
                    content: <EmployeePelatihanTeknisForm/>
                }
            ],
            content: <EmployeeProfileForm/>,
            direct: false,
            nik: '',
            kk: '',
            errorServer: '',
            // table

        }
    }

    selectedTab(index) {
        const newTabs = this.state.tabs.map((val, i) => {
            val.selected = index === i
            if (val.selected) {
                this.setState({content: val.content})
            }
            return val

        })
        this.setState({tabs: newTabs})
    }

    renderBAK() {
        const {user, tabs, content} = this.state
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Form Profile</h4>
                                <p className="card-description">
                                    Update profile
                                </p>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{marginTop: 20}}>
                    <div className="col-md-12">
                        <ul className="nav nav-tabs">
                            {tabs.map((o, i) =>
                                <li key={i} className="nav-item">
                                    <a className={selectedTabClass(o)}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           this.selectedTab(i)
                                       }} href="#">{o.label}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    {content}
                </div>
            </div>
        )
    }

    render() {
        const {user, tabs, content} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h4 className="card-title">Update Data Pribadi</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="nav nav-tabs">
                                            {tabs.map((o, i) =>
                                                <li key={i} className="nav-item">
                                                    <a className={selectedTabClass(o)}
                                                       onClick={(e) => {
                                                           e.preventDefault();
                                                           this.selectedTab(i)
                                                       }} href="#">{o.label}</a>
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                </div>
                                <div className="row" style={{marginTop: 20}}>
                                    {content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default EmployeeForm