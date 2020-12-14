import React, {Component, Fragment} from "react";
import {Bar} from "react-chartjs-2";
import {defCrud, defList} from "../../application/AppConstant";
import {
    CUTI_CALCULATE_DAY_RESPONSE,
    CUTI_LOAD_USER_RESPONSE,
    CUTI_QUOTA_RESPONSE,
    CUTI_SUBMIT_RESPONSE, DASHBOARD_JENIS_JABATAN_JENIS_KELAMIN_RESPONSE, HOLIDAYS_LOAD_FUTURE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {connect} from "react-redux";
import {
    calculateDays,
    cutiQuota,
    loadCutiUserLogin,
    loadHolidaysFuture,
    requestCuti
} from "../../redux/actions/reduxActionCuti";
import {dashboardJenisJabatanJenisKelamin} from "../../redux/actions/reduxActionDashboard";
import AddIcon from "@material-ui/icons/Add";

class JenisJabatanJenisKelamin extends Component {

    componentDidMount() {
        this.props.dashboardJenisJabatanJenisKelamin()
    }

    buildLabel(data) {
        let labels = ['Laki-Laki', 'Perempuan', 'Jumlah']
        // data.result.map(o => {
        //     labels.push(o.jenis_jabatan)
        // })
        return labels
    }

    buildData(data) {
        const colors = [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)'
        ]
        let dataset = []
        data.result.map((o, i) => {
            dataset.push({
                label: o.jenis_jabatan,
                data: [o.laki_laki, o.perempuan, (o.laki_laki + o.perempuan)],
                backgroundColor: colors[i]
            })
        })
        return dataset
    }

    buildTableRow() {
        const {data} = this.props
        return (
            <Fragment>
                {
                    data.result.map((o, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{o.jenis_jabatan}</td>
                            <td>{o.laki_laki}</td>
                            <td>{o.perempuan}</td>
                            <td>{(o.perempuan + o.laki_laki)}</td>
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
                                        <h4 className="card-title">Rekapitulasi Jumlah PNS Direktorat SMA Berdasarkan Jenis Jabatan dan Jenis Kelamin</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Jabatan</th>
                                                    <th>Laki-Laki</th>
                                                    <th>Perempuan</th>
                                                    <th>Jumlah</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.buildTableRow()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <Bar data={values}
                                             width={100}
                                             height={50}
                                             options={options}
                                        />
                                        <p className="text-muted mt-3 mb-0">
                                            <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"/>
                                            Rekapitulasi Jumlah PNS Direktorat SMA Berdasarkan Jenis Jabatan dan Jenis Kelamin
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
        data: defList(state, DASHBOARD_JENIS_JABATAN_JENIS_KELAMIN_RESPONSE)
    }
}

export default connect(mapStateToProps, {
    dashboardJenisJabatanJenisKelamin
})(JenisJabatanJenisKelamin);