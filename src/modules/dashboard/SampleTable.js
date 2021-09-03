import React, {Component, Fragment} from "react"
import {dummyData} from "../../application/AppDummyJson";
import {formatDate} from "../../application/AppCommons";
import TableView from "../../application/plugins/ui/TableView";

class SampleTable extends Component {

    constructor() {
        super();
        this.state = {
            page: 1,
            position: 1,
            show: [1, 2, 3]
        };
        this.changePage = this.changePage.bind(this);
    }

    /*
     * basic mode
     {
        fields:[]
        values: rows,
        totalPages: 100,
        currentPage: page,
        showMax: 5,
        changePage: this.changePage
     }
     * */
    sampleDataTable() {
        const {page} = this.state
        const rows = dummyData(10)
        return {
            fields: [
                {
                    title: "OPTION",
                    format: (row, o) => {
                        return (
                            <Fragment>
                                <button type="button" className="btn btn-primary btn-sm mr-2" onClick={(row) => {
                                    console.log("update")
                                }}><i className="mdi mdi-24px mdi-delete-circle"/>
                                </button>
                                <button type="button" className="btn btn-danger btn-sm" onClick={(row) => {
                                    console.log("delete")
                                }}><i className="mdi mdi-24px mdi-delete-circle"/>
                                </button>
                            </Fragment>
                        )
                    }
                },
                {
                    title: "ID",
                    key: "id"
                },
                {
                    title: "NAME",
                    key: "item"
                },
                {
                    title: "ITEM COUNT",
                    key: "item_total"
                },
                {
                    title: "PRICE",
                    key: "price"
                },
                {
                    title: "AGGREGATOR",
                    key: "price",
                    format: (row, o) => {
                        return row.item_total * row.price
                    }
                },
                {
                    title: "ORDER DATE",
                    key: "order_date",
                    format: (row, o) => {
                        return formatDate(o)
                    }
                }
            ],
            values: rows,
            element_total: 100,
            page: page,
            page_total: 5,
            changePage: this.changePage
        }
    }

    changePage(page) {
        this.setState({page: page})
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            {this.renderHeader()}
                            {this.renderHeaderOption()}
                            <TableView model={this.sampleDataTable()}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 2
    renderHeader() {
        return (
            <Fragment>
                <h4 className="card-title">Striped Table</h4>
                <p className="card-description">
                    Add class
                    <code>.table-striped</code>
                </p>
            </Fragment>
        )
    }

    // 3
    renderHeaderOption() {
        return (
            <div className="form-group row">
                <div className="col-md-3">
                    <button type="button" className="btn btn-primary btn-sm">
                        Add
                    </button>
                </div>
                <div className="col-md-6"/>
                <div className="col-md-3">
                    <input type="text" className="form-control" id="exampleInputName1"
                           placeholder="Name"/>
                </div>
            </div>
        )
    }

// <div className="row h-100 justify-content-center align-items-center">
// <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={60000}/>
// </div>

}

export default SampleTable;