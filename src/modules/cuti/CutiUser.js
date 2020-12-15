import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import {connect} from "react-redux";
import {
    CUTI_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentPage} from "../../application/AppConstant";
import {pageUserCuti} from "../../redux/actions/reduxActionCuti";
import {selectedTabClass} from "../../application/AppCommons";

class CutiUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            id: 0,
            name: '',
            tabs: [
                {
                    selected: true,
                    label: "Pending",
                    content: 0,
                },
                {
                    selected: false,
                    label: "Approve",
                    content: 1,

                },
                {
                    selected: false,
                    label: "Cancel",
                    content: 2,

                }
            ],
            content: 0,
        };
        this.changePage = this.changePage.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    componentDidMount() {
        this.props.pageUserCuti({filter: "", page: 0})
    }

    componentDidUpdate(props) {
        if (props.crud !== this.props.crud) {
            this.setState({id: 0, name: ''})
            this.props.pageUserCuti({filter: "", page: this.state.page})
        }
        if (props.documents !== this.props.documents) {


        }
    }

    changePage(page) {
        this.setState({page: page - 1});
        this.props.pageUserCuti({filter: "", page: page - 1})
    }

    handleChangeName(event) {
        // console.log(event.target.value)
        this.setState({name: event.target.value})
    }

    cancel() {
        this.setState({id: 0, name: ''})
    }

    delete(o) {
        const request = {
            id: o.value
        }
        // console.log("request form")
        this.props.removeDocument(request);
    }

    update(o) {
        this.setState({id: o.value, name: o.label})
    }

    submitForm(event) {
        event.preventDefault()
        const request = {
            id: this.state.id,
            name: this.state.name
        }
        // console.log("submit")
        this.props.mergeDocument(request)
    }

    renderMonth(o) {
        const {his_count} = o
        return (
            his_count.map((item, i) =>
                <td>{item.count}</td>
            )
        )
    }

    selectedTab(index) {
        var content = null
        const tabs = this.state.tabs.map((val, i) => {
            val.selected = index === i
            if (val.selected) {
                content = val.content;
            }
            return val
        })
        this.setState({tabs: tabs, content: content})
    }

    render() {
        const {page, name} = this.state
        const {cuties} = this.props
        const {tabs, content} = this.state
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Cuti Pegawai</h4>

                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>NIP</th>
                                            <th>Jabatan</th>
                                            <th>Sisa Cuti Tahun Lalu</th>
                                            <th>Kuota Cuti Tahun Berjalan</th>
                                            <th>Sisa Cuti Terakhir</th>
                                            <th>Jan</th>
                                            <th>Feb</th>
                                            <th>Mar</th>
                                            <th>Apr</th>
                                            <th>Mei</th>
                                            <th>Jun</th>
                                            <th>Jul</th>
                                            <th>Aug</th>
                                            <th>Sep</th>
                                            <th>Okt</th>
                                            <th>Nov</th>
                                            <th>Des</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            cuties.result.values.map((o, i) =>
                                                <tr className="clickable" key={i}>
                                                    <td>{o.user.employee.nama}</td>
                                                    <td>{o.user.employee.nip}</td>
                                                    <td>{o.user.employee.jabatan}</td>
                                                    <td>{o.cuti_summary.kuota_past_cuti}</td>
                                                    <td>{o.cuti_summary.kuota_cuti}</td>
                                                    <td>{o.cuti_summary.kuota_past_cuti + o.cuti_summary.kuota_cuti}</td>
                                                    {this.renderMonth(o)}
                                                </tr>
                                            )
                                        }
                                        </tbody>

                                    </table>
                                </div>
                                <Pagination
                                    totalPages={cuties.result.page_total}
                                    currentPage={(page + 1)}
                                    showMax={5}
                                    onClick={this.changePage}
                                />

                            </div>
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        cuties: (state[CUTI_PAGE_RESPONSE] ? state[CUTI_PAGE_RESPONSE] : emptyContentPage)
    }
}

export default connect(mapStateToProps, {pageUserCuti})(CutiUser);