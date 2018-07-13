import { ACTION_TYPES_USER } from "../config/actionTypes";

const initialState = {
    id: 0,
    name: 0,
    email: 0,
    token: '',
    error: ''
}

/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES_USER.LOGIN_SUCCESS:
            return {...action.payload, error:''};
        case ACTION_TYPES_USER.LOGIN_FAILED:
            return {...state, error:action.payload}
        default:
            return state;
    }
}