import React, {Component} from "react";
import {formatDate, formatYear} from "../../../application/AppCommons";

class EmployeeLencana extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    render() {
        const {user} = this.state
        const {lencanas} = user
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
                    {lencanas.map((o, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{formatYear(o.tahun)}</td>
                            <td>{o.satya_lencana}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeeLencana;