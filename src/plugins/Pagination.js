import React, {Component, Fragment} from "react";


class Pagination extends Component {

    constructor() {
        super();
        this.state = {
            positionActive: 1,
            values: [1, 2, 3]
        };
        this.prevValue = this.prevValue.bind(this);
        this.decrementValue = this.decrementValue.bind(this);
        this.toValue = this.toValue.bind(this);
        this.incrementValue = this.incrementValue.bind(this);
        this.nextValue = this.nextValue.bind(this);
    }

    prevValue() {
        if (this.state.values[0] === 1) {
            this.state.positionActive = 1
            return true
        }
        --this.state.positionActive
        this.state.values = this.state.values.map((item) => --item)
    }

    decrementValue() {
        this.state.positionActive = this.state.values[0]
        if (this.state.positionActive === 1) {
            return true
        }
        this.state.values = this.state.values.map((item) => --item)
    }

    toValue() {
        this.state.positionActive = this.state.values[1]
    }

    incrementValue() {
        this.state.positionActive = this.state.values[2]
        this.state.values = this.state.values.map((item) => ++item)
    }

    nextValue() {
        ++this.state.positionActive
        if (this.state.positionActive === 2) return true
        this.state.values = this.state.values.map((item) => ++item)
    }

    render() {
        const {positionActive, values} = this.state;
        return (
            <>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={this.prevValue}>Prev</a>
                    </li>
                    <li className={values[0] === positionActive ? "page-item active" : "page-item"}>
                        <a className="page-link" href="#" onClick={this.decrementValue}>{values[0]}</a>
                    </li>
                    <li className={values[1] === positionActive ? "page-item active" : "page-item"}>
                        <a className="page-link" href="#" onClick={this.toValue}>{values[1]}</a>
                    </li>
                    <li className={values[2] === positionActive ? "page-item active" : "page-item"}>
                        <a className="page-link" href="#" onClick={this.incrementValue}>{values[2]}</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={this.nextValue}>Next</a>
                    </li>
                </ul>
            </>
        )
    }
}

export default Pagination;