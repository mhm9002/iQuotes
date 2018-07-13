import {combineReducers} from 'redux';

import feedQuoteReducer from './feedReducer';
import mainSourceReducer from './sourceReducer';
import mainTopicReducer from './topicReducer';

import sourceQuoteReducer from './sourceQuoteReducer';
import topicQuoteReducer from './topicQuoteReducer';

import likesReducer from './likesReducer';

import searchQuoteReducer from './searchQuoteReducer';
import searchSourceReducer from './sourceReducer';
import searchTopicReducer from './topicReducer';

import activeUserReducer from './activeUserReducer';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    feedQuotes : feedQuoteReducer,
    mainTopics  : mainTopicReducer,
    mainSources : mainSourceReducer,
    searchQuotes : searchQuoteReducer,
    searchSources : searchSourceReducer,
    searchTopics : searchTopicReducer,
    ActiveUser: activeUserReducer,
    sourceQuotes: sourceQuoteReducer,
    topicQuotes: topicQuoteReducer,
    likes: likesReducer
});

export default allReducers