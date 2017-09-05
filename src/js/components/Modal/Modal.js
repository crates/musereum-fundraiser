import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Ps from 'perfect-scrollbar';

import './Modal.styl';

export default class Modal extends Component { // eslint-disable-line

  static propTypes = {
    size: PropTypes.string,
    icon: PropTypes.string,

    title: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.node,
  };

  componentDidMount() {
    Ps.initialize(document.querySelector('.bf-modal-main'))
  }

  close () {
    //this.$destroy()
  }

  iconCssClass () {
    const { icon } = this.props;

    let value = 'fa fa-'
    if (icon) {
      value += icon
      if (icon === 'refresh') {
        value += ' fa-spin'
      }
    }
    return value
  }

  cssClass () {
    const { size, className } = this.props;

    let value = 'bf-modal'
    if (className) {
      value += ` ${className}`;
    }
    if (size === 'fullscreen' || size === 'fs') {
      value += ' bf-modal-fullscreen'
    }
    return value
  }

  render() {
    const { icon, title, children, className, footer, ...rest } = this.props;
    const iconCssClass = this.iconCssClass();
    const cssClass = this.cssClass();

    return (
      <div
        className={cssClass}
        {...rest}
      >
        <div className="bf-modal-container">
          <header className="bf-modal-header">
            {icon &&
              <div className="bf-modal-icon"><i className={iconCssClass}/></div>
            }
            <div className="bf-modal-title">{title}</div>
          </header>
          <main className="bf-modal-main">
            {children}
          </main>
          <footer className="bf-modal-footer">
            {footer}
          </footer>
        </div>
      </div>
    );
  }
}
