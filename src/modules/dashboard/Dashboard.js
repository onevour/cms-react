import React, {Component, Fragment} from "react";
import Purchase from "./Purchase";
import Summary from "./Summary";
import JenisJabatanJenisKelamin from "./JenisJabatanJenisKelamin";
import JabatanJenisKelamin from "./JabatanJenisKelamin";
import DashboardKenaikanPangkat from "./DashboardKenaikanPangkat";
import DashboardJabatanPendidikan from "./DashboardJabatanPendidikan";
import DashboardJabatanUsia from "./DashboardJabatanUsia";
import DashboardPensiun from "./DashboardPensiun";
import JabatanPangkat from "./JabatanPangkat";

class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                <JenisJabatanJenisKelamin/>
                <DashboardJabatanPendidikan/>
                <DashboardKenaikanPangkat/>
                <DashboardPensiun/>
                <JabatanJenisKelamin/>
                <JabatanPangkat/>
                <DashboardJabatanUsia/>
            </Fragment>
        );
    }
}

export default Dashboard;