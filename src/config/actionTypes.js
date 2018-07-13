export const ACTION_TYPES_USER = {
    LOGIN_FAILED: 'login_failed',
    LOGIN_SUCCESS: 'login_success',
    REGISTER_SUCCESS: 'register_success'
}

export const ACTION_TYPES_QUOTE = {
    GET_STREAM_FAILED: 'q_get_stream_failed',
    GET_STREAM_SUCCESS: 'q_get_stream_success',
    GET_BY_SOURCE_FAILED: 'q_get_by_s_failed',
    GET_BY_SOURCE_SUCCESS: 'q_get_by_s_succes',
    GET_BY_TOPIC_FAILED: 'q_get_by_t_failed',
    GET_BY_TOPIC_SUCCESS: 'q_get_by_t_succes',
    LIKE_QUOTE: 'q_like_quote',
    GET_LIKES: 'q_get_likes'
}

export const ACTION_TYPES_TOPIC = {
    GET_STREAM_FAILED: 't_get_stream_failed',
    GET_STREAM_SUCCESS: 't_get_stream_success',
}

export const ACTION_TYPES_SOURCE = {
    GET_STREAM_FAILED: 's_get_stream_failed',
    GET_STREAM_SUCCESS: 's_get_stream_success',
}

export const ACTION_TYPES_SEARCH = {
    GET_STREAM_FAILED : 'get_search_failed',
    GET_STREAM_SUCCESS : 'get_search_success',
}