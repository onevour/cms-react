const initialState = {}

function rootReducer(state = initialState, action) {
    return reducerConverter(state, action);
}

/**
 * parsing converter
 * */
function reducerConverter(state, action) {
    // add default value
    if (action.event === action.type) {
        if (!(state.hasOwnProperty(action.event))) {
            state[action.event] = null
        }
        if (action.event) {
            return Object.assign({}, state, {
                [action.event]: action.payload
            })
        }
    }
    return state;
}

export default rootReducer;