import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import {
//   checkInvite,
//   startFetchContributionsInterval,
// } from 'actions';
import { needInviteSelector } from 'selectors';

import cx from './NeedInvite.styl';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

@connect(needInviteSelector, mapDispatchToProps)
export default class InvitedApp extends Component { // eslint-disable-line
  static propTypes = {
    checkInviteError: PropTypes.string,
    checkInviteCode: PropTypes.number,
    checkInviteData: PropTypes.object,
  }

  renderMessage() {
    const { checkInviteError, checkInviteErrorCode, checkInviteData } = this.props;

    if (checkInviteErrorCode == -999) {
      return (
        <div>
          Something bad happend.<br/>
          We are already fixing a problem.
        </div>
      )
    }

    if (
      checkInviteErrorCode == 0 ||
      checkInviteErrorCode == 600
    ) {
      return (
        <div>
          You need an invite to take part in the crowdsdale.<br/>
          Check the mail or earn by the referral program on <br/>
          <a href="http://musereum.org" className={cx('site-link')}>Musereum</a>
        </div>
      )
    }

    if (checkInviteErrorCode == 605) {
      return (
        <div>
          {checkInviteError}.
          <div className={cx('referral')}>
            Continue your referral program:
            <div className={cx('referral-link')}>{checkInviteData.social_url}</div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <section className={cx('need-invite-app')}>
        <img className="logo" src={require('img/logo.svg')} alt="Musereum Logo"/>
        {this.renderMessage()}
      </section>
    );
  }
}
