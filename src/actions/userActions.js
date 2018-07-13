import Api from '../lib/api.js';
import { ACTION_TYPES_USER } from '../config/actionTypes.js';

export default function userLogin (param) {
    return dispatch => {
        Api.post(Api.ApiToken,'account','Login',param)
        .then((res)=>{
            if (res.STATUS=='SUCCESS') {
                if (res.RESULT.message){
                    dispatch ({
                        type: ACTION_TYPES_USER.LOGIN_FAILED,
                        payload: res.RESULT.message.ERROR
                    })        
                } else {
                    dispatch ({
                        type: ACTION_TYPES_USER.LOGIN_SUCCESS,
                        payload: res.RESULT
                    })
                }
            } else {
                dispatch ({    
                    type: ACTION_TYPES_USER.LOGIN_FAILED,
                    payload: 'Login failed'
                })
            } 
        });
    }
};