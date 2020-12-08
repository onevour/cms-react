import React, {Component} from "react";
import {formatDate} from "../../../application/AppCommons";
import moment from "moment";

class EmployeePangkat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    renderTable() {
        const {user} = this.state
        if (!user) return;
        if (!user.pangkats) return;
        if (!user.pangkats) return;
        const pangkats_no_pensiun = user.pangkats.filter(o =>
            18 !== o.pangkat_golongan.id && (o.tmt) && moment(o.tmt).isBefore(moment())
        )
        return (
            pangkats_no_pensiun.map((o, i) =>
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{formatDate(o.tmt)}</td>
                    <td>{(o.pangkat_golongan ? o.pangkat_golongan.golongan : '')}</td>
                    <td>{(o.pangkat_golongan ? o.pangkat_golongan.nama : '')}</td>
                </tr>
            )
        )
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>TMT</th>
                        <th>Gol</th>
                        <th>Pangkat</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeePangkat;