import {JENIS_CUTI} from "./AppConstant";
import moment from "moment";
import React from "react";

export function cutiLabel(index) {
    return JENIS_CUTI.map((o, i) => {
        if (index === o.value) {
            return o.label;
        }
    })
}

export function formatDate(value) {
    if (null === value || undefined === value) return '-'
    return moment(value).format('DD-MM-YYYY')
}

export function formatStatusCuti(value) {
    if (undefined === value) return <label className="badge badge-info">Unknown</label>
    if (value === 1 || value === 2) {
        return <label className="badge badge-warning">In progress</label>
    } else return <label className="badge badge-success">Success</label>
    // return <label className="badge badge-danger">Suspend</label>
}

export function usernameTrim(value) {
    if (null === value || undefined === value) return 'Unknown'
    const max = 18
    if (value.length > max) {
        return value.substr(0, max - 3).concat("...");
    }
    return value
}

export function jabatanTrim(value) {
    if (null === value || undefined === value) return 'Unknown'
    const max = 15
    if (value.length > max) {
        return value.substr(0, max - 3).concat("...");
    }
    return value
}