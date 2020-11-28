import React, {Component} from "react";
import {formatDate, formatYear} from "../../../application/AppCommons";

class EmployeeDisplin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    render() {
        const {user} = this.state
        const {disiplins} = user
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Tahun</th>
                        <th>Hukuman Disiplin</th>
                    </tr>
                    </thead>
                    <tbody>
                    {disiplins.map((o, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{formatYear(o.tahun)}</td>
                            <td>{o.hukuman}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeeDisplin;