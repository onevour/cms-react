export function documentTypeReducer(state, action) {
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