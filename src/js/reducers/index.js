import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
//import status from './status';
//import entities from './entities';
import stats from './stats';
import donation from './donation';
import status from './status';
import { reducer as notificationsReducer } from 'reapop';

export default combineReducers({
  notifications: notificationsReducer(),
  router,
  //status,
  //entities,
  stats,
  donation,
  status,
});
