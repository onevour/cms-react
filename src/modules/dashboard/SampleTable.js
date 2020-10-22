import React, {Component, Fragment} from "react";
import Pagination from "../../plugins/Pagination";
import AddIcon from '@material-ui/icons/Add';

class SampleTable extends Component {

    constructor() {
        super();
        this.state = {
            position: 1,
            show: [1, 2, 3]
        };
        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange = page => {
        this.setState({
            currentPage: page
        });
    };

    render() {
        const {currentPage} = this.state;
        return (
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Striped Table</h4>
                            <p className="card-description">
                                Add class
                                <code>.table-striped</code>
                            </p>
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
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>
                                            User
                                        </th>
                                        <th>
                                            First name
                                        </th>
                                        <th>
                                            Progress
                                        </th>
                                        <th>
                                            Amount
                                        </th>
                                        <th>
                                            Deadline
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="py-1">
                                            <button type="button" className="btn btn-primary btn-sm"><AddIcon style={{ fontSize: 15 }}/></button>
                                        </td>
                                        <td>
                                            Herman Beck
                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            $ 77.99
                                        </td>
                                        <td>
                                            May 15, 2015
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src="../../images/faces-clipart/pic-2.png" alt="image"/>
                                        </td>
                                        <td>
                                            Messsy Adam
                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            $245.30
                                        </td>
                                        <td>
                                            July 1, 2015
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src="../../images/faces-clipart/pic-3.png" alt="image"/>
                                        </td>
                                        <td>
                                            John Richards
                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            $138.00
                                        </td>
                                        <td>
                                            Apr 12, 2015
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src="../../images/faces-clipart/pic-4.png" alt="image"/>
                                        </td>
                                        <td>
                                            Peter Meggik
                                        </td>
                                        <td>


                                        </td>
                                        <td>
                                            $ 77.99
                                        </td>
                                        <td>
                                            May 15, 2015
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src="../../images/faces-clipart/pic-1.png" alt="image"/>
                                        </td>
                                        <td>
                                            Edward
                                        </td>
                                        <td>
                                            <div className="progress">

                                            </div>
                                        </td>
                                        <td>
                                            $ 160.25
                                        </td>
                                        <td>
                                            May 03, 2015
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src="../../images/faces-clipart/pic-2.png" alt="image"/>
                                        </td>
                                        <td>
                                            John Doe
                                        </td>
                                        <td>
                                            <div className="progress">

                                            </div>
                                        </td>
                                        <td>
                                            $ 123.21
                                        </td>
                                        <td>
                                            April 05, 2015
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">
                                            <img src="../../images/faces-clipart/pic-3.png" alt="image"/>
                                        </td>
                                        <td>
                                            Henry Tom
                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            $ 150.00
                                        </td>
                                        <td>
                                            June 16, 2015
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Pagination/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SampleTable;