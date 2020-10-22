import {ADD_ARTICLE, LOGIN_RESPONSE} from "../constants/action-types";

const initialState = {
    loginResponse: {code: 0}
};

function rootReducer(state = initialState, action) {
    // start from here
    if (LOGIN_RESPONSE === action.type) {
        console.log("reducer update response login " + JSON.stringify(action))
        return Object.assign({}, state, {
            loginResponse: action.payload
        });
    }
    return state;
}

export default rootReducer;