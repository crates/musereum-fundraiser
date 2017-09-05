import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ModuleOverlay.styl';

export default class ModuleOverlay extends Component { // eslint-disable-line

  static propTypes = {
    overlayMessage: PropTypes.string.isRequired,
  }

  render() {
    const { overlayMessage } = this.props;

    return (
      <div className="bf-module-overlay">
        <div className="bf-module-overlay-text">
          <slot>{overlayMessage}</slot>
        </div>
      </div>
    );
  }
}
