import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { mainSelector } from 'selectors';

import Header from 'components/Header';
import Footer from 'components/Footer';
import ModalUnsupported from 'components/ModalUnsupported';

// @connect(mainSelector)
export default class Main extends Component { // eslint-disable-line

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Header />
        <div className="app-content">
          {children}
        </div>
        <Footer />
        <ModalUnsupported />
      </div>
    );
  }
}
