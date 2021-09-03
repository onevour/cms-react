import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import moment from "moment";

class TableView extends Component {

    /**
     * basic mode
     {
        fields:[]
        values: rows,
        element_total: 100,
        page: 1,
        page_total: 5,
        changePage: this.changePage
     }
     * */
    renderTable(model = {
        fields: [],
        values: [],
        element_total: 1,
        page: 1,
        page_total: 1,
        changePage: (row, o) => {
            console.warn("not implement paging callback")
        }
    }) {
        return (
            <Fragment>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>{this.renderTableHeader(model)}</thead>
                        <tbody>{this.renderTableRows(model)}</tbody>
                    </table>
                </div>

                <Pagination
                    totalPages={model.element_total}
                    currentPage={(model.page + 1)}
                    showMax={model.page_total}
                    onClick={(page) => {
                        model.changePage(page)
                    }}
                />
            </Fragment>
        )
    }

    // 2
    renderTableHeader(model = []) {
        if (!model.fields) {
            return <></>
        }
        return (
            <tr>
                {model.fields.map((o, i) => {
                    return <th key={i}>{o.title}</th>
                })}
            </tr>
        )
    }

    // 3
    renderTableRows(model) {
        return (
            <Fragment>
                {model.values.map((o, i) => {
                    return <tr key={i}>
                        {
                            model.fields.map((x, y) => {
                                //console.log(o.path)
                                // is moments
                                if (moment.isMoment(o[x.key])) {
                                    if (x.format) {
                                        return <td key={y}>{x.format(o, o[x.key])}</td>
                                    } else {
                                        return <td key={y}>Invalid format</td>
                                    }
                                }
                                // has format
                                if (x.format) {
                                    if (x.key) {
                                        return <td key={y}>{x.format(o, o[x.key])}</td>
                                    }
                                    return <td key={y}>{x.format(o, null)}</td>
                                }
                                return <td key={y}>{o[x.key]}</td>
                            })
                        }
                    </tr>
                })}
            </Fragment>
        )
    }

    render() {
        const {model} = this.props
        return this.renderTable(model)
    }
}

export default TableView