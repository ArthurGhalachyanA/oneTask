import {createStore, combineReducers, applyMiddleware} from 'redux'
import {userReducer} from './reducers/userReducer';
import {rssReducer} from './reducers/rssReducer';
import {mainLayoutReducer} from './reducers/mainLayoutReducer';
import {keywordReducer} from './reducers/keywordReducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    userReducer,
    keywordReducer,
    rssReducer,
    mainLayoutReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));