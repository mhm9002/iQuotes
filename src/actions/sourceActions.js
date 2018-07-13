import Api from '../lib/api.js';
import { ACTION_TYPES_SOURCE } from '../config/actionTypes.js';

export default function sourceGetStream (param) {
    return dispatch => {
        Api.post('source','getList',param)
        .then((res)=>{
            if (res.STATUS=='SUCCESS') {
                if (res.RESULT.MESSAGE){
                    dispatch ({
                        type: ACTION_TYPES_SOURCE.GET_STREAM_FAILED,
                        payload: {error: res.RESULT.MESSAGE}
                    })        
                } else {
                    dispatch ({
                        type: ACTION_TYPES_SOURCE.GET_STREAM_SUCCESS,
                        payload: res.RESULT
                    })
                }
            } else {
                dispatch ({    
                    type: ACTION_TYPES_SOURCE.GET_STREAM_FAILED,
                    payload: {error: 'failed to load post'}
                })
            }          
        });
    }
}