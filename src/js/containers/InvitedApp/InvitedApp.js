import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkInvite } from 'actions';
import { invitedAppSelector } from 'selectors';
import { replace } from 'react-router-redux';

import Loader from 'components/Loader';

import cx from './InvitedApp.styl';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkInvite,
    replace,
  }, dispatch);
}

@connect(invitedAppSelector, mapDispatchToProps)
export default class InvitedApp extends Component { // eslint-disable-line
  static propTypes = {
    children: PropTypes.element.isRequired,
    invitedIn: PropTypes.bool,
    isCheckInviteLoading: PropTypes.bool,
    checkInviteError: PropTypes.string,
    replace: PropTypes.func,
    location: PropTypes.object,
    checkInvite: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { invite} = this.props.location.query;
    if (invite) {
      this.props.checkInvite(invite);
    } else {
      this.props.replace('/needinvite');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkInviteError != '') {
      this.props.replace('/needinvite');
    }
  }

  render() {
    const { children, isCheckInviteLoading, invitedIn } = this.props;

    //if (isCheckInviteLoading) {
    if (!invitedIn) {
      return (
        <section className={cx('loading-app')}>
          <Loader />
        </section>
      );
    }

    return (
      <section className={cx('invited-app')}>
        {children}
      </section>
    );
  }
}
