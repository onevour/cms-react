import React, {Component, Fragment} from "react";
import {Bar} from "react-chartjs-2";
import {defList} from "../../application/AppConstant";
import {
    DASHBOARD_JABATAN_JENIS_KELAMIN_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {connect} from "react-redux";
import {
    dashboardJabatanJenisKelamin
} from "../../redux/actions/reduxActionDashboard";
import {color} from "../../application/AppCommons";

class JabatanJenisKelamin extends Component {

    componentDidMount() {
        this.props.dashboardJabatanJenisKelamin()
    }

    buildLabel(data) {
        let labels = ['Laki-Laki', 'Perempuan', 'Jumlah']
        // data.result.map(o => {
        //     labels.push(o.jenis_jabatan)
        // })
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
        // console.log(data)
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 col-sm-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h4 className="card-title">Rekapitulasi Jumlah PNS Direktorat SMA Berdasarkan
                                            Jabatan dan Jenis Kelamin</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12">
                                        <Bar data={values}
                                             width={100}
                                             height={50}
                                             options={options}
                                        />
                                        <p className="text-muted mt-3 mb-0">
                                            <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"/>
                                            Rekapitulasi Jumlah PNS Direktorat SMA Berdasarkan Jabatan dan Jenis Kelamin
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

// <div className="col-md-12 col-sm-12">
//     <div className="table-responsive">
//         <table className="table table-hover">
//             <thead>
//             <tr>
//                 <th>No</th>
//                 <th>Jabatan</th>
//                 <th>Laki-Laki</th>
//                 <th>Perempuan</th>
//                 <th>Jumlah</th>
//             </tr>
//             </thead>
//             <tbody>
//             {this.buildTableRow()}
//             </tbody>
//         </table>
//     </div>
// </div>

function mapStateToProps(state) {
    return {
        data: defList(state, DASHBOARD_JABATAN_JENIS_KELAMIN_RESPONSE)
    }
}

export default connect(mapStateToProps, {
    dashboardJabatanJenisKelamin
})(JabatanJenisKelamin);