import { ACTION_TYPES_TOPIC } from "../config/actionTypes.js";

/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

export default function (state=[], action) {
    switch (action.type) {
        case ACTION_TYPES_TOPIC.GET_STREAM_FAILED:
            return state; //{ error : action.payload }
        case ACTION_TYPES_TOPIC.GET_STREAM_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
