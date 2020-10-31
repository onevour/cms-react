import React, {Component, Fragment} from "react";
import {Route} from "react-router-dom";
import Navigation from "../modules/navigation/Navigation";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import SampleTable from "../modules/dashboard/SampleTable";
import Employee from "../modules/employee/Employee";
import CutiForm from "../modules/cuti/CutiForm";
import PromosiForm from "../modules/promosi/PromosiForm";
import PromosiDokumenForm from "../modules/promosi/PromosiDokumenForm";
import ProyeksiGaji from "../modules/proyeksigaji/ProyeksiGaji";
import Pensiun from "../modules/pensiun/Pensiun";
import CalendarHoliday from "../modules/calendar/CalendarHoliday";

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
                            <Route path="/employee" component={Employee} exact/>
                            <Route path="/sample_table" component={SampleTable} exact/>
                            <Route path="/cuti" component={CutiForm} exact/>
                            <Route path="/promosi_dokumen" render={(props) => <PromosiDokumenForm {...props}/>} exact/>
                            <Route path="/promosi" component={PromosiForm}/>
                            <Route path="/pensiun" component={Pensiun} exact/>
                            <Route path="/proyeksi_gaji" component={ProyeksiGaji} exact/>
                            <Route path="/calendar" component={CalendarHoliday} exact/>
                        </div>
                        <AppFooter/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AppHome;