import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ModulesBox.styl';

export default class ModulesBox extends Component { // eslint-disable-line

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <div className="bf-modules">
        {children}
      </div>
    );
  }
}
