import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ModuleBox.styl';

export default class ModuleBox extends Component { // eslint-disable-line

  static propTypes = {
    children: PropTypes.node.isRequired,

    className: PropTypes.string,
    size: PropTypes.string,

    overlay: PropTypes.element,
    title: PropTypes.string,
    menu: PropTypes.element,
    footer: PropTypes.element,
  }

  cssClass() {
    const { className, size } = this.props;

    let base = 'bf-module';

    if (className) {
      base += ' ' + className;
    }

    if (size)
      base += ' bf-module-' + size;

    return base;
  }

  render() {
    const { children, overlay, title, menu, footer } = this.props;
    const cssClasses = this.cssClass();

    return (
      <div className={cssClasses}>
        <div className="bf-module-container">
          {overlay}

          {(title || menu) &&
          <header className="bf-module-header">
            <div className="bf-module-title">{title}</div>
            <div className="bf-module-menu">{menu}</div>
          </header>
          }

          <main className="bf-module-main">
            {children}
          </main>

          <footer className="bf-module-footer">
            {footer}
          </footer>
        </div>
      </div>
    );
  }
}
