import React, {Component, Fragment} from "react";
import {Bar} from "react-chartjs-2";
import {defList} from "../../application/AppConstant";
import {
    DASHBOARD_JABATAN_JENIS_KELAMIN_RESPONSE, DASHBOARD_JABATAN_PANGKAT_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {connect} from "react-redux";
import {
    dashboardJabatanJenisKelamin, dashboardJabatanPangkat
} from "../../redux/actions/reduxActionDashboard";
import {color} from "../../application/AppCommons";

class JabatanPangkat extends Component {

    componentDidMount() {
        this.props.dashboardJabatanPangkat()
    }

    buildLabel(data) {
        //let labels = ['iv/c', 'iv/b', 'iv/a', 'iii/d', 'iii/c', 'iii/b', 'iii/a', 'ii/d', 'ii/c', 'ii/b', 'ii/a']
        let labels = [
            'i/a', 'i/b', 'i/c', 'i/d',
            'ii/a', 'ii/b', 'ii/c', 'ii/d',
            'iii/a', 'iii/b', 'iii/c', 'iii/d',
            'iv/a', 'iv/b', 'iv/c', 'iv/d', 'iv/e',
        ]
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
                label: o.jabatan.name,
                data: []
            })
        })
        let a3 = 0;
        data.result.map((o, i) => {
            let tmp = []
            o.pangkats.map((p, x) => {
                if (x === 8) {
                    a3 = a3 + p.jumlah
                    console.log(o.jabatan.name,p.pangkat, p.jumlah)
                }
                tmp.push(p.jumlah)
            })
            // console.log(o.jabatan.name, tmp)
            dataset[i].data = tmp
            dataset[i].backgroundColor = colors[i]
        })
        console.log("total a3 ", a3)
        let labels = [
            'i/a', 'i/b', 'i/c', 'i/d',
            'ii/a', 'ii/b', 'ii/c', 'ii/d',
            'iii/a', 'iii/b', 'iii/c', 'iii/d',
            'iv/a', 'iv/b', 'iv/c', 'iv/d', 'iv/e',
        ]
        // let datasetVal = []
        // labels.map((o, i) => {
        //     datasetVal.push({
        //         label: o,
        //         data: dataset[i],
        //         backgroundColor: colors[i]
        //     })
        // })
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
            legend: {
                position: 'left',
                display: false
            },
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
                                            Jabatan dan Pangkat</h4>
                                    </div>
                                    <div className="col-md-12 col-sm-12">
                                        <div className="table-responsive" hidden={true}>
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
                                            Rekapitulasi Jumlah PNS Direktorat SMA Berdasarkan Jabatan dan Pangkat
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
        data: defList(state, DASHBOARD_JABATAN_PANGKAT_RESPONSE)
    }
}

export default connect(mapStateToProps, {
    dashboardJabatanPangkat
})(JabatanPangkat);