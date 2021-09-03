import {
    USER_CRUD,
    USER_CRUD_RESPONSE,
    USER_LIST,
    USER_LIST_RESPONSE,
    USER_PAGE,
    USER_PAGE_RESPONSE
} from "../constants/reducActionTypes";
import {buildPost} from "./reduxAction";

export function listUser(param) {
    const payload = {
        url: "/user/list",
        body: param
    }
    return buildPost(payload, USER_LIST, USER_LIST_RESPONSE)
}

export function pageUser(param) {
    const payload = {
        url: "/user/page",
        body: param
    }
    return buildPost(payload, USER_PAGE, USER_PAGE_RESPONSE)
}

export function userUpdateRole(param) {
    const payload = {
        url: "/user/update/role",
        body: param
    }
    return buildPost(payload, USER_CRUD, USER_CRUD_RESPONSE)
}