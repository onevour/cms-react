import React, {Component, Fragment} from "react";
import {Route} from "react-router-dom";
import Navigation from "../modules/navigation/Navigation";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import SampleTable from "../modules/dashboard/SampleTable";
import Employee from "../modules/profile/Employee";
import CutiForm from "../modules/cuti/CutiForm";
import KenaikanPangkatForm from "../modules/pangkat/KenaikanPangkatForm";
import KenaikanPangkatDokumenForm from "../modules/pangkat/KenaikanPangkatDokumenForm";
import ProyeksiGaji from "../modules/proyeksigaji/ProyeksiGaji";
import Pensiun from "../modules/pensiun/Pensiun";
import CalendarHoliday from "../modules/calendar/CalendarHoliday";
import CutiDetail from "../modules/cuti/CutiDetail";
import CutiTableAtasan from "../modules/cuti/CutiTableAtasan";
import CutiTablePejabat from "../modules/cuti/CutiTablePejabat";
import CutiDetailAtasan from "../modules/cuti/CutiDetailAtasan";
import CutiDetailPejabat from "../modules/cuti/CutiDetailPejabat";
import EmployeeDataDigitalForm from "../modules/profile/EmployeeDataDigitalForm";
import MasterDocument from "../modules/documents/MasterDocument";
import Pangkat from "../modules/pangkat/Pangkat";
import PangkatDokumen from "../modules/pangkat/PangkatDokumen";
import PangkatKenaikanPegawai from "../modules/pangkat/PangkatKenaikanPegawai";
import PangkatKenaikanPegawaiForm from "../modules/pangkat/PangkatKenaikanPegawaiForm";
import MasterJabatan from "../modules/jabatan/MasterJabatan";
import MasterJabatanMap from "../modules/jabatan/MasterJabatanMap";
import EmployeeDUK from "../modules/profile/EmployeeDUK";
import CutiUser from "../modules/cuti/CutiUser";
import DocumentPending from "../modules/documents/DocumentPending";
import User from "../modules/user/User";
import UserRoleForm from "../modules/user/UserRoleForm";
import EmployeeForm from "../modules/profile/form/EmployeeForm";
import CutiUserAdmin from "../modules/cuti/CutiUserAdmin";
import CutiDetailAdmin from "../modules/cuti/CutiDetailAdmin";
import UserPensiun from "../modules/user/UserPensiun";
import UserNaikPangkatContainer from "../modules/user/UserNaikPangkatContainer";
import Dashboard from "../modules/dashboard/Dashboard";

class AppHome extends Component {

    render() {
        return (
            <Fragment>
                <AppHeader/>
                <div className="container-fluid page-body-wrapper">
                    <nav className="sidebar sidebar-offcanvas" id="sidebar">
                        <Navigation/>
                    </nav>
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <Route path="/dashboard" component={Dashboard} exact/>
                            <Route path="/user" component={User} exact/>
                            <Route path="/user/pensiun" component={UserPensiun} exact/>
                            <Route path="/user/naikpangkat" component={UserNaikPangkatContainer} exact/>
                            <Route path="/user/update" render={(props) => <UserRoleForm {...props}/>} exact/>
                            <Route path="/document" component={MasterDocument} exact/>
                            <Route path="/document/pending" component={DocumentPending} exact/>
                            <Route path="/profile" component={Employee} exact/>
                            <Route path="/profile/update" component={EmployeeForm} exact/>
                            <Route path="/profile/digital" render={(props) => <EmployeeDataDigitalForm {...props}/>}
                                   exact/>
                            <Route path="/sample_table" component={SampleTable} exact/>
                            <Route path="/cuti" component={CutiForm} exact/>
                            <Route path="/cuti/user" component={CutiUser} exact/>
                            <Route path="/cuti/user/admin" component={CutiUserAdmin} exact/>
                            <Route path="/cuti/user/admin/detail"
                                   render={(props) => <CutiDetailAdmin {...props} />} exact/>
                            <Route path="/cuti_approval_atasan" component={CutiTableAtasan} exact/>
                            <Route path="/cuti_approval_pejabat" component={CutiTablePejabat} exact/>
                            <Route path="/cuti_detail" render={(props) => <CutiDetail {...props}/>} exact/>
                            <Route path="/cuti_approval_atasan_detail"
                                   render={(props) => <CutiDetailAtasan {...props}/>} exact/>
                            <Route path="/cuti_approval_pejabat_detail"
                                   render={(props) => <CutiDetailPejabat {...props}/>} exact/>
                            <Route path="/kenaikan_pangkat_dokumen"
                                   render={(props) => <KenaikanPangkatDokumenForm {...props}/>} exact/>
                            <Route path="/kenaikan_pangkat" component={KenaikanPangkatForm}/>
                            <Route path="/pensiun" component={Pensiun} exact/>
                            <Route path="/pangkat/dokumen" render={(props) => <PangkatDokumen {...props}/>} exact/>
                            <Route path="/pangkat" component={Pangkat} exact/>
                            <Route path="/pangkat/kenaikan/user" component={PangkatKenaikanPegawai} exact/>
                            <Route path="/pangkat/kenaikan/user/candidate"
                                   render={(props) => <PangkatKenaikanPegawaiForm {...props}/>} exact/>
                            <Route path="/proyeksi_gaji" component={ProyeksiGaji} exact/>
                            <Route path="/calendar" component={CalendarHoliday} exact/>
                            <Route path="/jabatan" component={MasterJabatan} exact/>
                            <Route path="/jabatan/map" component={MasterJabatanMap} exact/>
                            <Route path="/duk" component={EmployeeDUK} exact/>
                        </div>
                        <AppFooter/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AppHome;