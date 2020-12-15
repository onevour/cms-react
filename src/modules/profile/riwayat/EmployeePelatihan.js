import React, {Component} from "react";
import {formatDate, formatYear} from "../../../application/AppCommons";

class EmployeePelatihan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    renderTable(user, pelatihans) {
        const {type} = this.props
        let result = pelatihans.filter((item) => {
            if (type === 1) {
                return item.type === 'JABATAN'
            }
            if (type === 2) {
                return item.type === 'TEKNIS'
            }
            return false
        })
        return (
            result.map((o, i) =>
                <tr key={i}>
                    <td>{formatYear(o.tahun)}</td>
                    <td>{formatYear(o.tmt)}</td>
                    <td>{o.diklat}</td>
                </tr>
            )
        )
    }

    render() {
        const {type} = this.props
        // console.log(type)
        const {user} = this.state
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Tahun</th>
                        <th>TMT</th>
                        <th>Diklat</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTable(user, user.pelatihans)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeePelatihan;