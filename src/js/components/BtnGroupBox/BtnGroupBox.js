import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BtnGroupBox.styl';

export default class BtnGroupBox extends Component { // eslint-disable-line

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <div className="bf-btn-group">
        {children}
      </div>
    );
  }
}
