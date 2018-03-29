import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FormMsg.styl';

export default class FormMsg extends Component { // eslint-disable-line

  static propTypes = {
    type: PropTypes.string,
    body: PropTypes.string,
    name: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    length: PropTypes.string,
  }

  cssClass() {
    const { type } = this.props;

    let value = 'bf-form-msg';
    if (type) {
      value += ' bf-form-msg-error';
    } else {
      value += ' bf-form-msg-desc';
    }
    return value;
  }

  error() {
    const { type, body, name, min, max, length } = this.props;

    switch (type) {
      case 'alphaNum':
        return 'must contain only alphanumeric characters';
      case 'required':
        return'is required';
      case 'match':
        return 'must be identical';
      case 'words':
        return `must be at least ${length} words`;
      case 'exactLength':
        return `must be exactly ${length} characters`;
      case 'minLength':
        return `must be longer than ${min} characters`;
      case 'maxLength':
        return `must be shorter than ${max} characters`;
      case 'length':
        return `must be between ${min} and ${max} characters`;
      case 'between':
        return `must be between ${min} and ${max}`;
      default:
        return 'must be valid';
    }
  }

  render() {
    const { body, name } = this.props;
    const cssClass = this.cssClass();
    const error = this.error();

    return (
      <div className={cssClass}>
        {body ? body : `${name} ${error}`}
      </div>
    );

  }
}
