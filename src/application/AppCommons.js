import React from "react";
import moment from "moment";
import ReactDOM from "react-dom";

export function formatYear(value) {
    if (null === value || undefined === value) return '-'
    return moment(value).format('YYYY') //dd mmm yyyy
}

export function formatDate(value) {
    if (null === value || undefined === value) return '-'
    return moment(value).format('DD MMM YYYY') //dd mmm yyyy
}

export function formatDateTime(value) {
    if (null === value || undefined === value) return '-'
    return moment(value).format('DD MMM YYYY hh:mm') //dd mmm yyyy
}

export function usernameTrim(value) {
    if (null === value || undefined === value) return 'Unknown'
    const max = 18
    if (value.length > max) {
        return value.substr(0, max - 3).concat("...");
    }
    return value
}

export function clearInput(domRef) {
    const native = (element, value) => {
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set
        const prototype = Object.getPrototypeOf(element)
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set
        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value)
        } else {
            valueSetter.call(element, value)
        }
    }
    var node = ReactDOM.findDOMNode(domRef.current)
    if (node instanceof HTMLElement) {
        const element = node.querySelector('input')
        var event = new Event('input', {bubbles: true});
        native(element, null)
        element.dispatchEvent(event)
    }

}

// siable before and weekend
export function disableBeforeDay(current) {
    const today = moment();
    const isAfter = current.isAfter(today);
    const isWeekend = current.day() !== 0 && current.day() !== 6;
    const result = (isAfter && isWeekend)
    return result
}

export function disableBeforeDayAndHoliday(current) {
    const today = moment();
    return current.isAfter(today) && current.day() !== 0 && current.day() !== 6;
}

// cuti template
export function selectedTabClass(o) {
    if (o) {
        return o.selected ? "nav-link active" : "nav-link";
    }

}

export function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export function numberOnly(value) {
    return Number(value) || '' === value
}

export function color() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

export class jabatanTrim {
}