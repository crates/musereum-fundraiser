import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FieldGroupBox.styl';

export default class FieldGroupBox extends Component { // eslint-disable-line

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <div
        className="bf-field-group"
        {...rest}
      >
        {children}
      </div>
    );
  }
}
