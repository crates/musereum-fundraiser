import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './KeyValueBox.styl';

export default class KeyValueBox extends Component { // eslint-disable-line

  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    name: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  };

  static defaultProps = {
    title: ''
  };

  render() {
    const { value, name, title, className, children } = this.props;
    const cssClass = ['bf-kv', className].join(' ');

    return (
      <div className={cssClass} title={title}>
        <div className="bf-kv-container">
          {value && <div className="bf-kv-value">{value}</div>}
          {name && <div className="bf-kv-key">{name}</div>}
          {children}
        </div>
      </div>
    );
  }
}
