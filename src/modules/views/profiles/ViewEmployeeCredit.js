import React, {Component} from "react";
import {formatDate, formatYear} from "../../../application/AppCommons";

class ViewEmployeeCredit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user-view'))
        }
    }

    render() {
        const {user} = this.state
        const {credit_scores} = user
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
                    {credit_scores.map((o, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{formatYear(o.tahun)}</td>
                            <td>{o.nilai}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ViewEmployeeCredit;