import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import combineActions from 'redux-combine-actions';
import { promiseMiddleware, apiMiddleware } from 'middlewares';

const middlewares = [
  routerMiddleware(browserHistory),
  combineActions,
  thunkMiddleware,
  apiMiddleware,
  promiseMiddleware
];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger'); // eslint-disable-line
  middlewares.push(createLogger({ collapsed: true }));
}

export default middlewares;
