import React, {Component} from "react";
import {formatDate, formatYear} from "../../../application/AppCommons";

class ViewEmployeeSKP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user-view'))
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

export default ViewEmployeeSKP;