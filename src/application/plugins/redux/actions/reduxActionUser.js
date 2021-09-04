import {
    LOGIN, LOGIN_RESPONSE, ROLE_CRUD, ROLE_PAGE, ROLE_PAGE_RESPONSE,
    USER_CRUD,
    USER_CRUD_RESPONSE,
    USER_PAGE,
    USER_PAGE_RESPONSE
} from "../constants/reducActionTypes";
import {buildDelete, buildGet, buildPost, buildPut} from "./reduxAction";

// LOGIN

export function loginUser(param) {
    const payload = {
        url: "/user/login",
        body: param
    }
    return buildPost(payload, LOGIN, LOGIN_RESPONSE)
}

export function logoutUser(param) {
    const payload = {
        url: "/user/login",
        body: param
    }
    return buildPost(payload, LOGIN, LOGIN_RESPONSE)
}

// END LOGIN

// USER

export function pageUser(param) {
    const payload = {
        url: "/user?page=1&q=" + param.filter,
        body: param
    }
    return buildGet(payload, USER_PAGE, USER_PAGE_RESPONSE)
}

export function saveUser(is_create = true, param) {
    const payload = {
        url: "/user",
        body: param
    }
    if (is_create) {
        return buildPost(payload, USER_CRUD, USER_CRUD_RESPONSE)
    }
    return buildPut(payload, USER_CRUD, USER_CRUD_RESPONSE)
}

export function removeUser(param) {
    const payload = {
        url: "/user/" + param
    }
    return buildDelete(payload, USER_CRUD, USER_CRUD_RESPONSE)
}

// END USER

// ROLE

export function pageRole(param) {
    const payload = {
        url: "/role?page=1&q=" + param.filter,
        body: param
    }
    return buildGet(payload, ROLE_PAGE, ROLE_PAGE_RESPONSE)
}

export function saveRole(is_create = true, param) {
    const payload = {
        url: "/role",
        body: param
    }
    if (is_create) {
        return buildPost(payload, USER_CRUD, USER_CRUD_RESPONSE)
    }
    return buildPut(payload, USER_CRUD, USER_CRUD_RESPONSE)
}

export function removeRole(param) {
    const payload = {
        url: "/role/" + param
    }
    return buildDelete(payload, USER_CRUD, USER_CRUD_RESPONSE)
}

// END ROLE
