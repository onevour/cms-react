import {
    USER_CRUD,
    USER_CRUD_RESPONSE,
    USER_LIST,
    USER_LIST_RESPONSE,
    USER_PAGE,
    USER_PAGE_RESPONSE
} from "../constants/reducActionTypes";
import {buildDelete, buildGet, buildPost, buildPut} from "./reduxAction";

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

export class deleteUser {
}