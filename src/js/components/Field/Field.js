import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Field.styl';

export default class Field extends Component { // eslint-disable-line

  static propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    value: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    required: PropTypes.bool,
    theme: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    autofocus: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
  }

  constructor(props) {
    super(props);
    this.value = props.value;
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  cssClass() {
    const { className, size, theme } = this.props;

    let value = 'bf-field';
    if (className) value += ` ${className}`;
    if (size === 'lg') value += ' bf-field-large';
    if (size === 'sm') value += ' bf-field-small';
    if (theme === 'tendermint') value += ' bf-theme-tendermint';
    return value;
  }

  updateValue = (event) => {
    event.persist();
    const value = event.target.value;
    this.setState({ value });
    this.props.onChange(event);
    this.value = value;
  }

  render() {
    const {
      placeholder, className, type, size,
      value, autofocus, required, theme,
      onChange,
      ...rest
    } = this.props;
    const cssClass = this.cssClass();
    let inputValue = this.state.value;

    if (type === 'textarea') {
      return (
        <textarea
          autoFocus={autofocus}
          required
          className={cssClass}
          placeholder={placeholder}
          value={inputValue}
          onChange={this.updateValue}
          {...rest}
        />
      );
    } else {
      return (
        <input
          autoFocus
          type={type}
          className={cssClass}
          placeholder={placeholder}
          value={inputValue}
          onChange={this.updateValue}
          {...rest}
        />
      );
    }
  }
}
