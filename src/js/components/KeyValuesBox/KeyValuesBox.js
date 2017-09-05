import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './KeyValuesBox.styl';

export default class KeyValuesBox extends Component { // eslint-disable-line

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  render() {
    const { children, className } = this.props;
    const cssClass = ['bf-kvs', className].join(' ');

    return (
      <div className={cssClass}>
        {children}
      </div>
    );
  }
}
