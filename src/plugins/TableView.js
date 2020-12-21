import React, {Component, Fragment} from "react";
import Pagination from "react-bootstrap-4-pagination";
import moment from "moment";

class TableView extends Component {

    // 1
    renderTable(model) {
        return (
            <Fragment>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>{this.renderTableHeader(model)}</thead>
                        <tbody>{this.renderTableRows(model)}</tbody>
                    </table>
                </div>

                <Pagination
                    totalPages={model.totalPages}
                    currentPage={model.currentPage}
                    showMax={model.showMax}
                    onClick={(page) => {
                        model.changePage(page)
                    }}
                />
            </Fragment>
        )
    }

    // 2
    renderTableHeader(model = []) {
        return (
            <tr>
                {model.fields.map((o, i) => {
                    return <th key={i}>{o.title}</th>
                })}
            </tr>
        )
    }

    // 3
    renderTableRows(model = []) {
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
        console.log(model)
        return this.renderTable(model)
    }
}

export default TableView