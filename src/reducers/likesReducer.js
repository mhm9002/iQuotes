import { ACTION_TYPES_QUOTE } from "../config/actionTypes";


export default function (state='', action) {
    switch (action.type){
        case ACTION_TYPES_QUOTE.LIKE_QUOTE:
            return action.payload.liked;
        case ACTION_TYPES_QUOTE.GET_LIKES:
            return action.payload.liked;
        default:    
            return state;
        }
}

