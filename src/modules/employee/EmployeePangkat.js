import React, {Component} from "react";
import {formatDate} from "../../application/AppCommons";

class EmployeePangkat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    render() {
        const {user} = this.state
        const {pangkats} = user
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
                    {pangkats.map((o, i) =>
                        <tr>
                            <td>{i + 1}</td>
                            <td>{formatDate(o.tmt)}</td>
                            <td>{o.gol}</td>
                            <td>{o.pangkat}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeePangkat;