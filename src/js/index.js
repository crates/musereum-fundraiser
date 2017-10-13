import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { store, history } from 'store';

import {
  fetchInitialDataIfNeeded,
  fetchEthDonationETMRate,
  fetchEtcDonationETMRate,
  startStatusInterval,
  startFetchInterval,
  generateDonationWallet,
} from 'actions';

import 'css/screen.styl';

const root = document.getElementById('app');
const render = () => {
  const Root = require('./containers/Root').default;
  ReactDOM.render(
    <AppContainer>
      <Root store={store} history={history}/>
    </AppContainer>
  , root);
}

render();

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./containers/Root', () => render());
}

store.dispatch(fetchEthDonationETMRate());
store.dispatch(fetchEtcDonationETMRate());
store.dispatch(startStatusInterval());
store.dispatch(startFetchInterval())
store.dispatch(generateDonationWallet());
