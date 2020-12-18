import React, {Component, Fragment} from "react";
import EmployeeDataPribadi from "../../profile/datapribadi/EmployeeDataPribadi";
import EmployeeDataKepegawaian from "../../profile/kepegawaian/EmployeeDataKepegawaian";
import EmployeeDataRiwayat from "../../profile/riwayat/EmployeeDataRiwayat";
import ViewEmployeeDataPribadi from "./ViewEmployeeDataPribadi";
import ViewEmployeeDataKepegawaian from "./ViewEmployeeDataKepegawaian";

class ViewEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user-view'))
        }
    }

    render() {
        const {user} = this.state
        if (user === null) {
            return (<></>)
        }
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-2 mb-3">
                        <div className="card">
                            <div className="card-body text-center" style={{padding: 20}}>
                                <img className="img-fluid"
                                     src={user.photo}
                                     alt=""/>
                                <p style={{marginTop: 30, fontSize: 12}}>{user.nama}</p>
                                <p style={{fontSize: 12}}>{user.nip}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <div className="card mb-3">
                            <ViewEmployeeDataPribadi/>
                        </div>

                        <div className="card mb-3">
                            <ViewEmployeeDataKepegawaian/>
                        </div>

                        <div className="card mb-3">
                            <EmployeeDataRiwayat/>
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
}

export default ViewEmployee;