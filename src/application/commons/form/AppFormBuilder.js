import React, {Fragment} from "react";
import {
    updateFile,
    updateValueDate,
    updateValueNumber,
    updateValueSelect,
    updateValueSelected,
    updateValueSelectedDate,
    updateValueText
} from "./AppFormInputCommons";
import Select from "react-select";
import Datetime from "react-datetime";
import {customStyles} from "../../AppConstant";

export function fieldBuildType(label, type, key, options, placeholder) {
    return fieldBuild(label, type, key, false, options, placeholder)
}

export function field(label, type, key, placeholder, options, isNumber = false, callback, ref) {
    return {
        label: label,
        type: type,
        key: key,
        isNumber: isNumber,
        options: options,
        placeholder: placeholder,
        callback: callback,
        ref: ref
    }
}

export function fieldBuild(label, type, key, isNumber, options, placeholder, callback, ref) {
    return {
        label: label,
        type: type,
        key: key,
        isNumber: isNumber,
        options: options,
        placeholder: placeholder,
        callback: callback,
        ref: ref
    }
}

export function fieldBuildSpace() {
    return {
        type: 'space',
    }
}

export function fieldBuildSubmit(type = 'submit', label = 'Submit', cancel = 'Cancel', clearForm = null) {
    return {
        label: label,
        cancel: cancel,
        type: type,
        clearForm: clearForm
    }
}

// single column per row
export function formColumnSingle(state, values) {
    return formColumn(state, values, 1)
}

// render column
export function formColumn(state, values, count = 2) {
    if (1 === count) {
        return (
            <Fragment>
                {values.map((o, i) => {
                    return (
                        <div className="form-group" key={i}>
                            {formColumnSingleDetailField(state, o, i)}
                        </div>
                    )
                })}
            </Fragment>
        )
    }
    return (
        <div className="row">
            {values.map((o, i) => {
                return formColumnDetailField(state, o, i)
            })}
        </div>
    )
}

export function formColumnSingleDetailField(state, o, i) {
    if ('submit' === o?.type) {
        return (
            <Fragment>
                <button type="submit" className="btn btn-success">{o?.label}</button>
            </Fragment>)
    }
    if ('submit-cancel' === o?.type) {
        return (
            <Fragment>
                <button type="submit" className="btn btn-success mr-2">{o?.label}</button>
                <button type="cancel" className="btn mr-2" onClick={o?.clearForm}>{o?.cancel}</button>
            </Fragment>)
    }
    return (
        <Fragment>
            <label>{o?.label}</label>
            {'text' === o?.type ? textField(state, o?.type, o?.key, o?.isNumber, o?.placeholder) : null}
            {'password' === o?.type ? textField(state, o?.type, o?.key, o?.isNumber, o?.placeholder) : null}
            {'hidden' === o?.type ? textFieldHidden(state, o?.key) : null}
            {'textarea' === o?.type ? textareaField(state, o?.key, o?.isNumber, o?.placeholder) : null}
            {'select' === o?.type ? selectField(state, o?.key, o?.isNumber, o?.placeholder, o?.options, o.callback) : null}
            {'year' === o?.type ? textFieldYear(state, o?.key, o?.placeholder, o.ref) : null}
            {'date' === o?.type ? textFieldDate(state, o?.key, o?.placeholder, o.ref) : null}
            {'file' === o?.type ? textFieldFile(state, o?.key, o?.placeholder, o.ref) : null}
            {'space' === o?.type ? null : null}
            {error(state, o?.key)}
        </Fragment>
    )
}

export function formColumnDetailField(state, o, i) {
    if ('submit' === o?.type) {
        return (<div className="col-md-6 mt-2" key={i}>
            <div className="form-group row">
                <div className="col-sm-3"/>
                <div className="col-sm-9">
                    <button type="submit" className="btn btn-success mr-2">{o?.label}</button>
                </div>
            </div>
        </div>)
    }
    if ('submit-cancel' === o?.type) {
        return (
            <div className="col-md-6 mt-2" key={i}>
                <div className="form-group row">
                    <div className="col-sm-3"/>
                    <div className="col-sm-9">
                        <button type="submit" className="btn btn-success mr-2">{o?.label}</button>
                        <button type="cancel" className="btn mr-2" onClick={o?.clearForm}>{o?.cancel}</button>
                    </div>
                </div>
            </div>)
    }
    return (
        <div className="col-md-6" key={i}>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">{o?.label}</label>
                <div className="col-sm-9">
                    {'text' === o?.type ? textField(state, o?.type, o?.key, o?.isNumber, o?.placeholder) : null}
                    {'password' === o?.type ? textField(state, o?.type, o?.key, o?.isNumber, o?.placeholder) : null}
                    {'hidden' === o?.type ? textFieldHidden(state, o?.key) : null}
                    {'textarea' === o?.type ? textareaField(state, o?.key, o?.isNumber, o?.placeholder) : null}
                    {'select' === o?.type ? selectField(state, o?.key, o?.isNumber, o?.placeholder, o?.options, o.callback) : null}
                    {'year' === o?.type ? textFieldYear(state, o?.key, o?.placeholder, o.ref) : null}
                    {'date' === o?.type ? textFieldDate(state, o?.key, o?.placeholder, o.ref) : null}
                    {'file' === o?.type ? textFieldFile(state, o?.key, o?.placeholder, o.ref) : null}
                    {'space' === o?.type ? null : null}
                    {error(state, o?.key)}
                </div>
            </div>
        </div>
    )
}

export function error(state, key) {
    if (!key) return
    let errorMessage = state.state[key + "_error"]
    if (!errorMessage) return
    return (<label data-test="error" style={{color: "red", fontSize: 10, marginTop: 10}}>{errorMessage}</label>)
}

export function textField(state, type, key, isNumber, placeholder) {
    let valueTmp = state.state[key]
    if (!valueTmp) {
        valueTmp = ''
    }
    return (
        <input type={type} className="form-control" placeholder={placeholder}
               value={valueTmp}
               onChange={e => {
                   if (isNumber) {
                       updateValueNumber(e, state, key)
                   } else {
                       updateValueText(e, state, key)
                   }
               }}
        />
    );
}

export function textFieldHidden(state, key) {
    let valueTmp = state.state[key]
    if (!valueTmp) {
        valueTmp = ''
    }
    return (
        <input type="hidden" className="form-control" value={valueTmp}/>
    );
}

// text field
export function selectField(state, key, isNumber, placeholder, optValue, callback) {
    if (null == optValue) optValue = []
    return (<Select className="form-control select-tmd"
                    styles={customStyles}
                    placeholder={placeholder}
                    options={optValue}
                    value={updateValueSelected(state, key, optValue)}
                    onChange={e => {
                        updateValueSelect(e, state, key, callback)
                    }}
                    label={placeholder}/>
    )
}

export function textFieldYear(state, key, placeholder, ref) {
    return (<Datetime dateFormat="YYYY" timeFormat={false} closeOnSelect={true} initialViewMode={"years"}
                      ref={ref}
                      inputProps={{placeholder: placeholder}}
                      value={updateValueSelectedDate(state, key)}
                      onChange={e => {
                          updateValueDate(e, state, key)
                      }}/>)
}

export function textFieldDate(state, key, placeholder, ref) {
    return (<Datetime dateFormat="DD MMM YYYY" timeFormat={false} closeOnSelect={true}
                      ref={ref}
                      inputProps={{placeholder: placeholder}}
                      value={updateValueSelectedDate(state, key)}
                      onChange={e => {
                          updateValueDate(e, state, key)
                      }}
    />)
}

export function textFieldFile(state, key, placeholder, ref) {
    return (<input type="file" className="form-control"
                   ref={ref}
                   placeholder={placeholder}
                   onChange={e => {
                       updateFile(e, state, key)
                   }}
    />)
}

export function submitField(state, key, isNumber, placeholder, optValue) {
    return (<button type="submit" className="btn btn-success">Simpan</button>)
}


export function textareaField(state, key, isNumber, placeholder) {
    let valueTmp = state.state[key]
    if (!valueTmp) valueTmp = ''
    return (<textarea className="form-control" placeholder={placeholder} rows={5} value={valueTmp}
                      onChange={e => {
                          if (isNumber) {
                              updateValueNumber(e, state, key)
                          } else {
                              updateValueText(e, state, key)
                          }
                      }}/>)
}



