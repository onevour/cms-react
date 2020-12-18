import React, {Component} from "react";
import {formatDate} from "../../../application/AppCommons";

class ViewEmployeePNS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user-view'))
        }
    }

    mappnscpns(){
        /*
        "tgl_mulai_cpns": 1548954000000,
        "no_sk_cpns": "29241/A3/KP/2019",
        "tgl_sk_cpns": 1548867600000,

        "tgl_mulai_pns": 1580490000000,
        "no_sk_pns": "38509/A3.3/KP/2020",
        "tgl_sk_pns": 1579712400000
        * */
        const {user} = this.state
        var psncpns = []
        if(user.tgl_mulai_cpns) {
            psncpns.push({
                status: "CPNS",
                tgl_mulai :user.tgl_mulai_cpns,
                no_sk :user.no_sk_cpns,
                tgl_sk :user.tgl_sk_cpns
            })
        }
        if(user.tgl_mulai_pns) {
            psncpns.push({
                status: "PNS",
                tgl_mulai :user.tgl_mulai_pns,
                no_sk :user.no_sk_pns,
                tgl_sk :user.tgl_sk_pns
            })
        }
        return psncpns
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
                        <th>Status</th>
                        <th>Tgl. Mulai</th>
                        <th>No. SK</th>
                        <th>Tgl. SK</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.mappnscpns().map((o, i) =>
                        <tr>
                            <td>{i + 1}</td>
                            <td>{o.status}</td>
                            <td>{formatDate(o.tgl_mulai)}</td>
                            <td>{o.no_sk}</td>
                            <td>{formatDate(o.tgl_sk)}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ViewEmployeePNS;