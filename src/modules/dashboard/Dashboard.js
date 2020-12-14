import React, {Component, Fragment} from "react";
import Purchase from "./Purchase";
import Summary from "./Summary";
import JenisJabatanJenisKelamin from "./JenisJabatanJenisKelamin";
import JabatanJenisKelamin from "./JabatanJenisKelamin";
import DashboardKenaikanPangkat from "./DashboardKenaikanPangkat";
import DashboardJabatanPendidikan from "./DashboardJabatanPendidikan";
import DashboardJabatanUsia from "./DashboardJabatanUsia";

class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                <JenisJabatanJenisKelamin/>
                <DashboardJabatanPendidikan/>
                <DashboardKenaikanPangkat/>
                <JabatanJenisKelamin/>
                <DashboardJabatanUsia/>
            </Fragment>
        );
    }
}

export default Dashboard;