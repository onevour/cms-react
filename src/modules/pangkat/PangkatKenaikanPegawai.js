import React, {Component, Fragment} from "react";
import "react-datetime/css/react-datetime.css";
import {
    PANGKAT_PAGE_RESPONSE
} from "../../redux/constants/reducActionTypes";
import {emptyContentPage} from "../../application/AppConstant";
import {connect} from "react-redux";
import {pagePangkat} from "../../redux/actions/reduxActionMasterPangkat";
import {Redirect} from "react-router-dom";

class PangkatKenaikanPegawai extends Component {

    constructor(props) {
        super(props);
        this.state = {
            direct: false,
            pangkat: null,
            filter: ''
        }
        this.filterPangkat = this.filterPangkat.bind(this)
    }

    componentDidMount(props) {
        this.props.pagePangkat({filter: "", page: 0})
    }

    componentDidUpdate() {

    }

    filterPangkat(event) {
        this.setState({filter: event.target.value})
        this.props.pagePangkat({filter: event.target.value, page: 0})
    }

    showPangkat(o) {
        console.log(o)
        this.setState({direct: true, pangkat: o})
        this.renderToDetailDocument()
    }

    renderToDetailDocument() {
        if (this.state.direct) {
            return <Redirect to={{
                pathname: '/pangkat/kenaikan/user/candidate',
                state: {body: JSON.stringify(this.state.pangkat)}
            }}/>
        }
    }

    renderTable(pangkats) {
        if (pangkats.result && (pangkats.result.values)) {
            let result = pangkats.result.values.filter(item => item.id > 8)
            return (
                result.map((o, i) =>
                    <tr className="clickable" key={i} onClick={() => {
                        this.showPangkat(o)
                    }}>
                        <td>{i + 1}</td>
                        <td>{o.nama}</td>
                        <td>{o.golongan}</td>
                        <td>{o.document_pangkat.length}</td>
                    </tr>
                )
            )
        }
    }

    render() {
        const {pangkats} = this.props
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h4 className="card-title">Kenaikan Pangkat Pegawai</h4>

                                <div className="form-group row">
                                    <div className="col-md-3">
                                        <p className="card-description">
                                            Pangkat golongan
                                        </p>
                                    </div>
                                    <div className="col-md-6"/>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" placeholder="Search"
                                               onChange={this.filterPangkat}
                                        />
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>
                                                No
                                            </th>
                                            <th>
                                                Nama
                                            </th>
                                            <th>
                                                Golongan
                                            </th>
                                            <th>
                                                Jumlah Dokumen
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderTable(pangkats)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderToDetailDocument()}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        pangkats: (state[PANGKAT_PAGE_RESPONSE] ? state[PANGKAT_PAGE_RESPONSE] : emptyContentPage)
    }
}

export default connect(mapStateToProps, {pagePangkat})(PangkatKenaikanPegawai);