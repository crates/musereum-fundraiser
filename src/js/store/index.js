import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useBasename from 'history/lib/useBasename';
import reducer from 'reducers';
import middlewares from './middlewares';

let enhancers = [];
if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
  const actions = require('actions');
  enhancers.push(window.devToolsExtension({ actions }));
}

const enhancer = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

const initialState = {};
const store = createStore(reducer, initialState, enhancer);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    store.replaceReducer(reducer);
  });
}

function withBasename(history=browserHistory, basename) {
  if(basename) {
    return useBasename(() => history)({ basename: `/${basename}` })
  }

  return history;
}

const history = syncHistoryWithStore(withBasename(browserHistory), store, {
  selectLocationState: (state) => state.router,
});

//history.listen(location => analyticsService.track(location.pathname))

export { store, history };
