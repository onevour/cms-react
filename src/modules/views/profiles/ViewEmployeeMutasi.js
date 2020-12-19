import React, {Component} from "react";
import {formatDate} from "../../../application/AppCommons";

class ViewEmployeeMutasi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user-view'))
        }
    }

    render() {
        const {user} = this.state
        const {mutasis} = user
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Tahun</th>
                        <th>TMT</th>
                        <th>Instansi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mutasis.map((o, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{o.tahun}</td>
                            <td>{formatDate(o.tmt)}</td>
                            <td>{o.pangkat}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ViewEmployeeMutasi;