import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FormGroupBox.styl';

export default class FormGroupBox extends Component { // eslint-disable-line

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { children, className, ...rest} = this.props;
    const cssClass = ['bf-form-group', className].join(' ');

    return (
      <div
        className={cssClass}
        {...rest}
      >
        {children}
      </div>
    );
  }
}
