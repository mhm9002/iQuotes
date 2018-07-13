import Api from "../lib/api.js";
import { ACTION_TYPES_QUOTE } from "../config/actionTypes.js";
import { getStoredData, setStoredData } from "../lib/functions";

export function quoteGetStream(param) {
	return dispatch => {
		Api.post("quote", "getList", param).then(res => {
			if (res.STATUS == "SUCCESS") {
				if (res.RESULT.message) {
					dispatch({
						type: ACTION_TYPES_QUOTE.GET_STREAM_FAILED,
						payload: { error: res.RESULT.message.ERROR }
					});
				} else {
					dispatch({
						type: ACTION_TYPES_QUOTE.GET_STREAM_SUCCESS,
						payload: res.RESULT
					});
				}
			} else {
				dispatch({
					type: ACTION_TYPES_QUOTE.GET_STREAM_FAILED,
					payload: { error: "failed to load post" }
				});
			}
		});
	};
}

export function quoteGetBySource(sID) {
	return dispatch => {
		Api.post("quote", "getBySource", { sID: sID }).then(res => {
			if (res.STATUS == "SUCCESS") {
				if (res.RESULT.MESSAGE) {
					dispatch({
						type: ACTION_TYPES_QUOTE.GET_BY_SOURCE_FAILED,
						payload: { error: res.RESULT.MESSAGE }
					});
				} else {
					dispatch({
						type: ACTION_TYPES_QUOTE.GET_BY_SOURCE_SUCCESS,
						payload: res.RESULT
					});
				}
			} else {
				dispatch({
					type: ACTION_TYPES_QUOTE.GET_BY_SOURCE_FAILED,
					payload: { error: "failed to load post" }
				});
			}
		});
	};
}

export function quoteGetByTopic(tID) {
	return dispatch => {
		Api.post("quote", "getByTopic", { tID: tID }).then(res => {
			if (res.STATUS == "SUCCESS") {
				if (res.RESULT.MESSAGE) {
					dispatch({
						type: ACTION_TYPES_QUOTE.GET_BY_TOPIC_FAILED,
						payload: { error: res.RESULT.MESSAGE }
					});
				} else {
					dispatch({
						type: ACTION_TYPES_QUOTE.GET_BY_TOPIC_SUCCESS,
						payload: res.RESULT
					});
				}
			} else {
				dispatch({
					type: ACTION_TYPES_QUOTE.GET_BY_TOPIC_FAILED,
					payload: { error: "failed to load post" }
				});
			}
		});
	};
}

export function quoteLike(quoteID) {
	return dispatch => {
		//alert(total);
		getStoredData("Likes").then(res => {
			resArray = JSON.parse(res);
			if (resArray == null) resArray = [];

			isLiked = resArray.indexOf(quoteID);

			if (isLiked>-1){
				resArray.splice(isLiked);
			} else {
				resArray.push(quoteID);
			}
				
			//alert(JSON.stringify(resArray));
			setStoredData("Likes", JSON.stringify(resArray)).then(() => {
				dispatch({
					type: ACTION_TYPES_QUOTE.LIKE_QUOTE,
					payload: { liked: resArray }
				});
			});
		});
	};
}

export function quoteGetLikes() {
	//alert('hello');
	return dispatch => {
		getStoredData("Likes").then(res => {
			resArray = JSON.parse(res);

			if (resArray == null) resArray = [];

			//alert(JSON.stringify(resArray));
			dispatch({
				type: ACTION_TYPES_QUOTE.GET_LIKES,
				payload: { liked: resArray }
			});
		});
	};
}
