import { ACTION_TYPES_QUOTE } from "../config/actionTypes.js";

/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

export default function (state=[], action) {
    switch (action.type) {
        case ACTION_TYPES_QUOTE.GET_BY_SOURCE_FAILED:
            return { error : action.payload }
        case ACTION_TYPES_QUOTE.GET_BY_SOURCE_SUCCESS:
            return state.concat(action.payload);
        default:
            return state;
    }
}
