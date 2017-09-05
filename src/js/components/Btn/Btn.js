import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router';

import './Btn.styl';

export default class Btn extends Component { // eslint-disable-line

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.node,
    value: PropTypes.string,

    iconPos: PropTypes.string,
    size: PropTypes.string,
    theme: PropTypes.string,

    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {}
  };

  btnClass() {
    const { className, iconPos, size, theme } = this.props;

    let value = 'bf-btn';
    if (iconPos === 'right') value += ' bf-btn-icon-right';
    if (size === 'lg') value += ' bf-btn-large';
    if (size === 'sm') value += ' bf-btn-small';
    if (theme === 'alpha-black') value += ' bf-theme-alpha-black';;
    if (theme === 'tendermint') value += ' bf-theme-tendermint';
    return value;
  }

  btnType() {
    const { type } = this.props;

    if (type)
      return type;
    else
      return 'button';
  }

  render() {
    const {
      className, type, icon, value,
      iconPos, size, theme,
      onClick,
      ...rest
    } = this.props;
    const btnClass = this.btnClass();
    const btnType = this.btnType();

    return (
      <button
        className={'bf-btn-wrapper ' + className}
        type={btnType}
        onClick={onClick}
        {...rest}
      >
        <span className={btnClass}>
          {icon &&
            <i className={'bf-btn-icon fa fa-' + icon} aria-hidden="true"/>
          }
          {value &&
            <span className="bf-btn-value">{value}</span>
          }
        </span>
      </button>
    );
  }
}
