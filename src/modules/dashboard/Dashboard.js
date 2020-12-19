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
import KodeJabatanJenisKelamin from "./KodeJabatanJenisKelamin";

class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                <KodeJabatanJenisKelamin/>
                <JenisJabatanJenisKelamin/>
                <div className="row">
                    <DashboardJabatanPendidikan/>
                    <DashboardPensiun/>
                </div>
                <div className="row">
                    <DashboardKenaikanPangkat/>
                    <JabatanJenisKelamin/>
                </div>
                <JabatanPangkat/>
                <DashboardJabatanUsia/>
            </Fragment>
        );
    }
}

export default Dashboard;