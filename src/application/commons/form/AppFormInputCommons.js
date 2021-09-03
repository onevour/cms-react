import {getFileExtension, numberOnly} from "../../AppCommons";

export function updateValueText(e, state, key) {
    let store = {}
    store[key] = e.target.value
    state.setState(store)
}

export function updateValueNumber(e, state, key) {
    if (numberOnly(e.target.value)) {
        let store = {}
        store[key] = e.target.value
        state.setState(store)
    }
}

export function updateValueSelect(e, state, key, callback) {
    let store = {}
    store[key] = e.value
    if (callback != null) {
        // console.log("trigger callback ", store[key])
        callback(store[key])
    }
    state.setState(store)
}

// default value
export function updateValueSelected(state, key, optValue) {
    const store = state.state
    let storeVal = store[key]
    if (optValue === null || undefined === optValue) return null
    // console.log("select update default value ", key, storeVal)
    let selected = optValue?.filter(function (option) {
        return (option.value == storeVal)
    })
    if (selected?.length === 0 || undefined === selected) return null
    let val = selected[0]
    return {
        value: val.value,
        label: val.label
    }
}

// default selected date
export function updateValueSelectedDate(state, key) {
    let store = state.state
    let value = store[key]
    // if(value) {
    //     return moment(value).toDate()
    // }
    return value

}

export function updateValueDate(e, state, key) {
    let store = {}
    store[key] = e
    state.setState(store)
}

// file add
export function updateFile(e, state, key) {
    let store = {}
    const file = e.target.files[0]
    const keyExt = key + "_file_ext"
    if (file) {
        new Promise(() => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                store[key] = fileReader.result
                store[keyExt] = getFileExtension(file.name)
                state.setState(store)
            }
            fileReader.onerror = (error) => {
                store[key] = null
                store[keyExt] = null
                state.setState(store)
            }
        }).then(r => {
            console.log(r)
        })
    } else {
        store[key] = null
        store[keyExt] = null
        state.setState(store)
    }
    // return true
}

export function removeBody(body, fields = []) {
    for (let i = 0; i < fields; i++) {
        delete body[fields[i]]
    }
    return body
}
