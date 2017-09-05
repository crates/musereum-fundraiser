import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkInvite } from 'actions';
import { invitedAppSelector } from 'selectors';
import { replace } from 'react-router-redux';

import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';

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
    isCheckInviteLoading: PropTypes.bool,
    checkInviteError: PropTypes.string,
    replace: PropTypes.func,
    location: PropTypes.object,
    checkInvite: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { invite} = this.props.location.query;
    if(invite) {
      this.props.checkInvite(invite);
    } else {
      this.props.replace('/needinvite');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkInviteError != '') {
      console.log(11111111111111);
      this.props.replace('/needinvite');
    }
  }

  render() {
    const { children, isCheckInviteLoading } = this.props;

    if (isCheckInviteLoading) {
      return (
        <section>
          <Loader />
          <NotificationsSystem theme={theme}/>
        </section>
      );
    }

    return (
      <section className={cx('invited-app')}>
        {children}
        <NotificationsSystem theme={theme}/>
      </section>
    );
  }
}
