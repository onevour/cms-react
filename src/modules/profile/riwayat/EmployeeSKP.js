import React, {Component} from "react";
import {formatDate, formatYear} from "../../../application/AppCommons";

class EmployeeSKP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    render() {
        const {user} = this.state
        const {skps} = user
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Tahun</th>
                        <th>Nilai</th>
                    </tr>
                    </thead>
                    <tbody>
                    {skps.map((o, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{formatYear(o.tahun)}</td>
                            <td>{o.nilai_rata}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeeSKP;