import React, {Component, Fragment} from "react";
import Pagination from "../../../plugins/Pagination";
import moment from 'moment';
import EmployeeDataPribadi from "./EmployeeDataPribadi";
import EmployeeDataKepegawaian from "../kepegawaian/EmployeeDataKepegawaian";
import EmployeeDataKeluarga from "./EmployeeDataKeluarga";
import EmployeeDataRiwayat from "../riwayat/EmployeeDataRiwayat";

class EmployeePendidikan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
    }

    render() {
        const {user} = this.state
        if (user === null) {
            return (<></>)
        }
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Jenjang</th>
                        <th>Nama Instansi</th>
                        <th>TMT</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.educations.map((o, i) =>
                        <tr>
                            <td>{i + 1}</td>
                            <td>{o.type}</td>
                            <td>{o.value}</td>
                            <td>{o.graduated}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EmployeePendidikan;