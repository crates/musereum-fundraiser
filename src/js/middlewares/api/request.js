import 'isomorphic-fetch';
import querystring from 'qs';

export default class Request {

  constructor({ path, type = 'GET', query = {}, headers = {}, body }) {
    this.path = path;
    this.type = type;
    this.query = query;
    this.headers = headers;
    this.body = body;
  }

  setPath(path) {
    this.path += path;
    return this;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  setQuery(query) {
    //const _query = query ? {query: JSON.stringify(query)} : query;
    //Object.assign(this.query, _query);
    Object.assign(this.query, query);
    return this;
  }

  setHeaders(headers) {
    Object.assign(this.headers, headers);
    return this;
  }

  setBody(data) {
    this.body = data;
    return this;
  }

  queryToString() {
    const str = querystring.stringify(this.query);
    return str ? `?${str}` : '';
  }

  fetch() {
    return new Promise((resolve, reject) => {
      fetch(this.path + this.queryToString(), {
        method: this.type,
        body: this.body && JSON.stringify(this.body),
        headers: this.headers,
        credentials: 'include',
        mode: 'cors'
      })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          response.json().then(resolve);
        } else {
          response.json().then(reject);
        }
      })
      .catch(error => reject(error.message));
    });
  }
}
