import React, {Component, Fragment} from "react";
import {Bar} from "react-chartjs-2";
import {defCrud, defList} from "../../application/AppConstant";
import {
    CUTI_CALCULATE_DAY_RESPONSE,
    CUTI_LOAD_USER_RESPONSE,
    CUTI_QUOTA_RESPONSE,
    CUTI_SUBMIT_RESPONSE,
    DASHBOARD_JABATAN_NAIK_PANGKAT,
    DASHBOARD_JABATAN_NAIK_PANGKAT_RESPONSE,
    DASHBOARD_JABATAN_PENDIDIKAN_RESPONSE,
    DASHBOARD_JABATAN_USIA_RESPONSE,
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
import {
    dashboardJabatanNaikPangkat,
    dashboardJabatanPendidikan, dashboardJabatanUsia,
    dashboardJenisJabatanJenisKelamin
} from "../../redux/actions/reduxActionDashboard";
import AddIcon from "@material-ui/icons/Add";
import {color} from "../../application/AppCommons";
import moment from "moment";
import {colors} from "@material-ui/core";

class DashboardJabatanUsia extends Component {

    componentDidMount() {
        this.props.dashboardJabatanUsia()
    }

    buildLabel(data) {
        let labels = []
        for (let i = 21; i <= 65; i++) {
            labels.push(i + ' Tahun')
        }
        return labels
    }

    buildData(data) {

        const colors = []
        for (let i = 0; i < data.result.length; i++) {
            colors.push(color())
        }
        let dataset = []
        data.result.map((o, i) => {
            dataset.push({
                label: o.jabatan.jenis_jabatan,
                data: []
            })
        })
        data.result.map((o, i) => {
            let tmp = []
            o.jabatans.map((p, x) => {
                tmp.push(p.jumlah)
            })

            dataset[i].data = tmp
            dataset[i].backgroundColor = colors[i]
        })
        console.log(dataset)
        return dataset

        // const colors = []
        // if (data.result.length > 0) {
        //     for (let x = 0; x < data.result[0].jabatans.length; x++) {
        //         colors.push(color())
        //     }
        // } else {
        //     return []
        // }
        // let dataset = [];
        // data.result.map((o, i) => {
        //     // dataset.push({
        //     //     label: o.usia,
        //     //     data: [],
        //     //     backgroundColor: colors[i]
        //     // })
        // })
        // data.result.map((o, i) => {
        //     let tmp = []
        //     o.jabatans.map((p, x) => {
        //         tmp.push(p.jumlah)
        //     })
        //     // console.log(o.jabatan.name, tmp)
        //     // dataset[i].data = tmp
        //     // dataset[i].backgroundColor = colors[i]
        // })
        // return dataset;
        // let dataset = []
        // let dataset = []
        // data.result.map((o, i) => {
        //     let data = []
        //     o.jabatans.map((jabatan, x) => {
        //         data.push(jabatan)
        //     })
        //     dataset.push({
        //         label: o.usia,
        //         data: data,
        //         backgroundColor: colors[i]
        //     })
        // })
        // return dataset
        // let dataS = []
        // let dataF = []
        // let dataP = []
        // data.result.map((o, i) => {
        // dataS.push(o.jumlah_struktural)
        // dataF.push(o.jumlah_jft)
        // dataP.push(o.jumlah_pelaksana)
        // })
        // dataset.push({
        //     label: 'S',
        //     data: dataS,
        //     backgroundColor: colors[0]
        // })
        // dataset.push({
        //     label: 'FT',
        //     data: dataF,
        //     backgroundColor: colors[1]
        // })
        // dataset.push({
        //     label: 'P',
        //     data: dataP,
        //     backgroundColor: colors[2]
        // })
        // return dataset
    }

    buildDataTahun(data) {
        let dataset = []
        dataset.push(data.jumlah_struktural)
        dataset.push(data.jumlah_jft)
        dataset.push(data.jumlah_pelaksana)
        return dataset
    }

    buildTableHeader() {
        const {data} = this.props
        let tahuns = []
        let tahun = moment().year();
        return (
            <Fragment>
                <th>No</th>
                <th>Usia</th>
                <th>Struktural</th>
                <th>JFT</th>
                <th>Pelaksana</th>
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
                            <td>{o.usia} Tahun</td>
                            <td>{o.jumlah_struktural}</td>
                            <td>{o.jumlah_jft}</td>
                            <td>{o.jumlah_pelaksana}</td>
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
        console.log(values)
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
                                        <h4 className="card-title">Rekapitulasi Jumlah PNS Direktorat SMA Berdasarkan
                                            Usia</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12" hidden={true}>
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
                                            Rekapitulasi Jumlah PNS Direktorat SMA Berdasarkan Usia
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
        data: defList(state, DASHBOARD_JABATAN_USIA_RESPONSE)
    }
}

export default connect(mapStateToProps, {
    dashboardJabatanUsia
})(DashboardJabatanUsia);