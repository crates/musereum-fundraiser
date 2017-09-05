import config from 'config';
import Request from './request' ;

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');
const path = `${config.api.host}:${config.api.port}${config.api.suffix ? '/'+config.api.suffix : ''}`;

const request = () => new Request({
  path,
  headers: {
    'Accept': 'application/json'
  }
});

const requestEnum = {
  GET: (path, query) => request().setType('GET').setPath(path).setQuery(query).fetch(),
  PUT: (path, data) => request().setType('PUT').setPath(path).setHeaders({ 'Content-type': 'application/json' }).setBody(data).fetch(),
  PATCH: (path, data) => request().setType('PUT').setPath(path).setHeaders({ 'Content-type': 'application/json' }).setBody(data).fetch(),
  POST: (path, data) => request().setType('POST').setPath(path).setHeaders({ 'Content-type': 'application/json' }).setBody(data).fetch(),
  DELETE: (path, query) => request().setType('DELETE').setPath(path).setQuery(query).fetch()
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(method, endpoint, data, schema) {
  const req = requestEnum[method];
  return req(endpoint, data);
}

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { method, endpoint } = callAPI;
  const { schema, types, data } = callAPI;

  if (!method) {
    method = 'GET';
  }

  if (typeof method !== 'string') {
    throw new Error('Specify a string method type.');
  }
  if (!Object.keys(requestEnum).some(key => key === method)) {
    throw new Error('Expected method type to be one of ' + Object.keys(requestEnum) + ' types.');
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(method, endpoint, data, schema).then(
    response => next(actionWith({
      payload: response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
