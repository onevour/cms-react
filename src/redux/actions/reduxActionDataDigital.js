import {MASTER_DOCUMENT, REMOVE_DOCUMENT, UPLOAD_DOCUMENT, USER_DOCUMENT} from "../constants/reducActionTypes";

export function loadMasterDocument() {
    const payload = {
        url:  "/document/type"
    }
    return {type: MASTER_DOCUMENT, payload}
}

export function userUploadDocument(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url:  "/document/upload",
        body: param
    }
    return {type: UPLOAD_DOCUMENT, payload}
}

export function loadUserDocument() {
    const user = JSON.parse(localStorage.getItem('user'))
    const payload = {
        url:  "/document",
        body: {
            nip: user.nip
        }
    }
    return {type: USER_DOCUMENT, payload}
}

export function removeUserDocument(param) {
    const user = JSON.parse(localStorage.getItem('user'))
    param.nip = user.nip
    const payload = {
        url:  "/document/remove",
        body: param
    }
    return {type: REMOVE_DOCUMENT, payload}
}