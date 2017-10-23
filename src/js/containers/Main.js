import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { mainSelector } from 'selectors';

import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';

import Header from 'components/Header';
import Footer from 'components/Footer';
import ModalUnsupported from 'components/ModalUnsupported';

import {
  setDonationProgress,
} from 'actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setDonationProgress,
  }, dispatch);
}

@connect(/*mainSelector,*/ null, mapDispatchToProps)
export default class Main extends Component { // eslint-disable-line

  static propTypes = {
    children: PropTypes.element.isRequired,
    setDonationProgress: PropTypes.func.isRequired,
  }

  render() {
    const { children, setDonationProgress } = this.props;

    return (
      <div>
        <Header
          setDonationProgress={setDonationProgress}
        />
        <div className="app-content">
          {children}
        </div>
        <Footer />
        <NotificationsSystem theme={theme}/>
        <ModalUnsupported />
      </div>
    );
  }
}
