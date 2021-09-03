import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";

class BaseComponent extends Component {

    // REDUX HELPER
    isUpdate(props, key) {
        return (props[key] !== this.props[key])
    }

    // CONVERTER
    paramsToArray(...args) {
        const params = []
        args.forEach((o, i) => {
            params.push(o)
        })
        return params[0]
    }

    isEmpty(value, ...keys) {
        const params = this.paramsToArray(keys)
        console.log("param length", params.length)
        if (params.length === 0) {
            if (value) return true
        }
        const exist = this.nestedValue(value, params)
        if (exist) {
            return true
        }
        return false

    }

    // START TABLE
    tableColumn(title, key = '', formatter = null) {
        return {
            title: title,
            key: key,
            format: formatter
        }
    }

    tableColumnKey(title, ...keys) {
        const params = this.paramsToArray(keys)
        return {
            title: title,
            key: '',
            format: (row, o) => {
                return this.nestedValue(row, 0, params)
            }
        }
    }

    nestedValue(row, index = 0, keys = []) {
        if (keys.length - 1 < index) return ""
        const key = keys[index]
        const value = row[key]
        if (typeof value === 'object') {
            return this.nestedValue(value, index + 1, keys)
        }
        console.log("nested", value)
        return value
    }

    // END TABLE


    // ROUTING

    direct(path = '') {
        const {direct, direct_body} = this.state
        console.log(direct_body)
        if (!direct) return
        if (direct_body) {
            return <Redirect to={{
                pathname: path,
                state: {body: JSON.stringify(direct_body)}
            }}/>
        }
        return <Redirect to={{
            pathname: path
        }}/>
    }

    // END ROUTING

    // FIELD

    valueField(event) {
        return event?.target?.value
    }

    // END FIELD

    // FORM

    cancelForm() {
        this.setState({direct: true})
    }

    // END FORM

    // HTTP HANDLER
    httpHandler(title, key, success = null, show_alert_on_error = true) {
        const response = this.props[key]
        console.log(key, response)
        if (response.status && response.error) {
            // handler error http code
            if (show_alert_on_error) swal(title, response.error, "error")
        } else {
            // handler error http code from body
            if (response && response.status_code && response.status_code > 201) {
                if (show_alert_on_error) swal(title, response.status_message, "error")
            } else {
                if (success !== null) {
                    success(response.status_code)
                }
            }
        }
    }

    // END HTTP HANDLER

    // ALERT

    alertQuestion(title = "Are you sure?", text = "Are you sure that you want to leave this page?", action = null, param = null) {
        swal({
            title: title,
            text: text,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete && action !== null) {
                action(param)
            }
        })
    }

    // END ALERT

}

export default BaseComponent