import React, {Component} from "react";

class ViewEmployeePendidikan extends Component {

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
                        <tr key={i}>
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

export default ViewEmployeePendidikan;