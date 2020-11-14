import {BASE_URL} from "../redux/constants/reducActionTypes";

export function getData(payload) {
    return fetch(BASE_URL + payload.url).then(response =>
        response.json()
    );
}

export function postData(payload) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload.body)
    };
    return fetch(BASE_URL +payload.url, requestOptions).then(response =>
        response.json()
    );
}