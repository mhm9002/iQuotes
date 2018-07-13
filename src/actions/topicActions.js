import Api from "../lib/api.js";
import { ACTION_TYPES_TOPIC } from "../config/actionTypes.js";

export default function topicGetStream(param) {
	return dispatch => {
		Api.post("topic", "getList", param).then(res => {
			if (res.STATUS == "FAILED") {
				dispatch({
					type: ACTION_TYPES_TOPIC.GET_STREAM_FAILED,
					payload: { error: res.RESULT.message.ERROR }
				});
			} else if (res.STATUS == "SUCCESS") {
				dispatch({
					type: ACTION_TYPES_TOPIC.GET_STREAM_SUCCESS,
					payload: res.RESULT
				});
			} else {
				dispatch({
					type: ACTION_TYPES_TOPIC.GET_STREAM_FAILED,
					payload: { error: "failed to load post" }
				});
			}
		});
	};
}
