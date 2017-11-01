import { appIsReady } from 'selectors';
import { checkInvite } from './invite';

// export function fetchInitialData() {
//   return {
//     types: [
//       'FETCH_INITIAL_DATA',
//       'FETCH_INITIAL_DATA_SUCCESS',
//       'FETCH_INITIAL_DATA_ERROR',
//     ],
//     payload: [
//       checkInvite
//     ],
//   };
// }

// export function fetchInitialDataIfNeeded() {
//   return (dispatch, getState) => {
//     if (!appIsReady(getState())) {
//       return dispatch(fetchInitialData());
//     }
//     return null;
//   };
// }