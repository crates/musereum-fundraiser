import React from 'react';
import { Route, Redirect } from 'react-router';

import NotFound from 'components/NotFound';
import InvitedApp from './InvitedApp';
import NeedInvite from './NeedInvite';
import Main from './Main';
import Dashboard from './dashboard';
import Donate from './donate';

function requireInvite(/* nextState, replace */) {
  //if (!userIsLoggedInSelector(store.getState())) {
    // replace({ nextPathname: nextState.location.pathname, pathname: '/login' });
  //}
}

export default (
  <Route>
    <Route component={InvitedApp} onEnter={requireInvite}>
      <Route component={Main}>
        <Route path="/" component={Dashboard} />
        <Route path="/contribute/:currency" component={Donate}/>
      </Route>
    </Route>

    <Route path="/needinvite" component={NeedInvite} />
    <Route path="*" component={NotFound} />
  </Route>
);
