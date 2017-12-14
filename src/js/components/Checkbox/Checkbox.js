import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Checkbox.styl';

export default class Checkbox extends Component { // eslint-disable-line

  static propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    checked: PropTypes.bool
  }

  static defaultProps = {
    label: '',
    checked: false,
    onClick: ()=>{}
  }

  render() {
    const { label, checked, onClick } = this.props;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={checked}
            onChange={onClick}
          />

          {label}
        </label>
      </div>
    );
  }
}
