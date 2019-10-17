import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/reducers'

let middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middlewares = [...middlewares, logger]
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middlewares)
));

export default store;
