import React, {Component, Fragment} from "react";
import {Bar} from "react-chartjs-2";
import {defCrud, defList} from "../../application/AppConstant";
import {
    CUTI_CALCULATE_DAY_RESPONSE,
    CUTI_LOAD_USER_RESPONSE,
    CUTI_QUOTA_RESPONSE,
    CUTI_SUBMIT_RESPONSE,
    DASHBOARD_JABATAN_NAIK_PANGKAT, DASHBOARD_JABATAN_NAIK_PANGKAT_RESPONSE,
    DASHBOARD_JENIS_JABATAN_JENIS_KELAMIN_RESPONSE,
    HOLIDAYS_LOAD_FUTURE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {connect} from "react-redux";
import {
    calculateDays,
    cutiQuota,
    loadCutiUserLogin,
    loadHolidaysFuture,
    requestCuti
} from "../../redux/actions/reduxActionCuti";
import {dashboardJabatanNaikPangkat, dashboardJenisJabatanJenisKelamin} from "../../redux/actions/reduxActionDashboard";
import AddIcon from "@material-ui/icons/Add";
import {color} from "../../application/AppCommons";
import moment from "moment";

class DashboardKenaikanPangkat extends Component {

    componentDidMount() {
        this.props.dashboardJabatanNaikPangkat()
    }

    buildLabel(data) {
        let tahuns = []
        let tahun = moment().year();
        for (let i = tahun; i <= tahun + 5; i++) {
            tahuns.push(i)
        }
        // let labels = ['Laki-Laki', 'Perempuan', 'Jumlah']
        // data.result.map(o => {
        //     labels.push(o.jenis_jabatan)
        // })
        return tahuns
    }

    buildData(data) {
        const colors = []
        for (let i = 0; i < data.result.length; i++) {
            colors.push(color())
        }
        let dataset = []
        data.result.map((o, i) => {
            dataset.push({
                label: o.jabatan.name,
                data: this.buildDataTahun(o.naik_pangkat_tahuns),
                backgroundColor: colors[i]
            })
        })
        return dataset
    }

    buildDataTahun(data) {
        let dataset = []
        data.map((o, i) => {
            dataset.push(o.jumlah)
        })
        return dataset
    }

    buildTableHeader() {
        const {data} = this.props
        let tahuns = []
        let tahun = moment().year();
        for (let i = tahun; i <= tahun + 5; i++) {
            tahuns.push(i)
        }
        return (
            <Fragment>
                <th>No</th>
                <th>Jabatan</th>
                {tahuns.map((o, i) =>
                    <th>{o}</th>
                )}
                <th>Total</th>
            </Fragment>
        )
    }

    buildTableRow() {
        const {data} = this.props
        return (
            <Fragment>
                {
                    data.result.map((o, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{o.jabatan.name}</td>
                            {o.naik_pangkat_tahuns.map((np, i) =>
                                <td>{np.jumlah}</td>
                            )}
                        </tr>
                    )
                }
            </Fragment>
        )
    }

    render() {
        const {data} = this.props
        const values = {
            labels: this.buildLabel(data),
            datasets: this.buildData(data),
        }
        const options = {
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        }

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 col-sm-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h4 className="card-title">Rekapitulasi Jumlah PNS Direktorat SMA Naik
                                            Pangkat</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                <tr>
                                                    {this.buildTableHeader()}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.buildTableRow()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <Bar data={values}
                                             width={100}
                                             height={50}
                                             options={options}
                                        />
                                        <p className="text-muted mt-3 mb-0">
                                            <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"/>
                                            Rekapitulasi Jumlah PNS Direktorat SMA Naik Pangkat
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}

function mapStateToProps(state) {
    return {
        data: defList(state, DASHBOARD_JABATAN_NAIK_PANGKAT_RESPONSE)
    }
}

export default connect(mapStateToProps, {
    dashboardJabatanNaikPangkat
})(DashboardKenaikanPangkat);