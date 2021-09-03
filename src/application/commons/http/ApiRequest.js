import {BASE_URL} from "../../plugins/redux/constants/reducActionTypes";

export function header(url) {
    if (url.includes("login") || url.includes("auth")) {
        return {
            'Content-Type': 'application/json'
        }
    }
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
}

export function getData(payload) {
    const requestOptions = {
        method: 'GET',
        headers: header(payload.url)
    };
    return fetch(BASE_URL + payload.url, requestOptions).then(response =>
        response.json()
    );
}

export function postData(payload) {
    const requestOptions = {
        method: 'POST',
        headers: header(payload.url),
        body: JSON.stringify(payload.body)
    }
    return fetch(BASE_URL + payload.url, requestOptions)
        .then(response => {
            // if (!response.ok) {
            //     console.log("error http", response)
            //     return response.json()
            // } else return response.json()
            return response.json()
        }).catch(function (error) {
            console.log("error", error);
            return Promise.reject()
        });
}

export function putData(payload) {
    const requestOptions = {
        method: 'PUT',
        headers: header(payload.url),
        body: JSON.stringify(payload.body)
    }
    return fetch(BASE_URL + payload.url, requestOptions)
        .then(response => {
            return response.json()
        }).catch(function (error) {
            console.log("error", error);
            return Promise.reject()
        });
}

export function deleteData(payload) {
    const requestOptions = {
        method: 'DELETE',
        headers: header(payload.url),
        body: JSON.stringify(payload.body)
    }
    return fetch(BASE_URL + payload.url, requestOptions)
        .then(response => {
            return response.json()
        }).catch(function (error) {
            console.log("error", error);
            return Promise.reject()
        });
}


export function downloadData(payload) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload.body)
    }
    return fetch(BASE_URL + payload.url, requestOptions)
}