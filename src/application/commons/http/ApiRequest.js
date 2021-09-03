import {BASE_URL} from "../../plugins/redux/constants/reducActionTypes";

export function header(url) {
    if (url.includes("login") || url.includes("auth")) {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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
            if (!response.ok) {
                console.log("error http", response)
                return {
                    status_code: response.status,
                    status_message: response.statusText
                }
                // throw new Error(response.status)
            } else return response.json()
        }).catch(function (error) {
            console.log("error", error);
            // return {
            //     code: 500,
            //     message: error
            // }
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