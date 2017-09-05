import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FormStruct.styl';

export default class FormStruct extends Component { // eslint-disable-line

  static propTypes = {
    onSubmit: PropTypes.func,
    width: PropTypes.object,

    overlay: PropTypes.element,
    suptitle: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    children: PropTypes.node,
    reset: PropTypes.node,
    submit: PropTypes.node,
  };

  static defaultProps = {
    onSubmit: () => {},
  }

  cssClass () {
    const { width } = this.props;

    let value = 'bf-form';
    if (width === 'narrow') value += ' bf-form-narrow';
    return value;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit();
  }

  render() {
    const {
      onSubmit, width,
      overlay, suptitle, title, subtitle, children, reset, submit,
      ...rest
    } = this.props;
    const cssClass = this.cssClass();

    return (
      <form
        className={cssClass}
        onSubmit={this.handleSubmit}
        {...rest}
      >
        <div className="bf-form-container">
          {overlay}

          <header className="bf-form-header">
            <div className="bf-form-suptitle">{suptitle}</div>
            <div className="bf-form-title">{title}</div>
            <div className="bf-form-subtitle">{subtitle}</div>
          </header>
          <main className="bf-form-main">
            {children}
          </main>
          <footer className="bf-form-footer">
            {reset}
            {submit}
          </footer>
        </div>
      </form>
    );
  }
}
