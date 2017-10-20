import { CALL_API } from 'middlewares/api';

export function fetchContibutions() {
  return {
    [CALL_API]: {
      types: [
        'FETCH_CONTRIBUTIONS',
        'FETCH_CONTRIBUTIONS_SUCCESS',
        'FETCH_CONTRIBUTIONS_ERROR',
      ],
      endpoint: '/contributions',
    },
    meta: { },
  };
}

export function startFetchContributionsInterval() {
  return (dispatch) => {
    setInterval(() => dispatch(fetchContibutions()), 30e3); // poll every 30s
    return dispatch(fetchContibutions());
  };
}