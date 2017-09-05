import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Mnemonic.styl';

export default class Mnemonic extends Component { // eslint-disable-line

  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  render() {
    const { value } = this.props;

    return (
      <div className="bf-mnemonic">
        {value}
      </div>
    );
  }
}
