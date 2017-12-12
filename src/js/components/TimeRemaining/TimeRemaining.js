import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';


import './TimeRemaining.styl';
import KeyValueBox from 'components/KeyValueBox';

export default class TimeRemain extends Component { // eslint-disable-line

  static propTypes = {
    date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment),
    ]).isRequired,
    started: PropTypes.bool.isRequired,
    type: PropTypes.string,
  }

  state = {
    now: Math.trunc((new Date()).getTime() / 1000)
  }

  timerId = null


  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState({ now: Math.trunc((new Date()).getTime() / 1000) });
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  label () {
    const { started, type } = this.props;

    if (started) {
      if (type === 'cap')
        return 'left of hidden cap'
      else
        return 'left'
    } else {
      if (type === 'cap')
        return 'til start of hidden cap'
      else
        return 'til start'
    }
  }

  render() {
    const { date, type } = this.props;
    const { now } = this.state;

    const label = this.label();
    const usableDate = Math.trunc(Date.parse(date) / 1000);
    const days = Math.trunc((usableDate - now) / 60 / 60 / 24);
    const hours = Math.trunc((usableDate - now) / 60 / 60) % 24;
    const minutes = Math.trunc((usableDate - now) / 60) % 60;
    const seconds = (usableDate - now) % 60;
    const countingDown = days > 0 || hours > 0 || minutes > 0 || seconds > 0;

    if (countingDown) {
      return (
        <KeyValueBox
          className="bf-time-remaibfng"
          title={date.toString()}
          value={
            <div>
              {days > 0 ? `${days}d` : ''}
              {hours > 0 ? ` ${hours}h` : ''}
              {minutes > 0 ? ` ${minutes}m` : ''}
              {seconds > 0 ? ` ${seconds}s` : ''}
            </div>
          }
          name={label}
        />
      );
    } else if (type === 'cap') {
      return (
        <KeyValueBox
          className="bf-time-remaibfng"
          title={date.toString()}
          value='--'
          name='hidden cap ended'
        />
      );
    } else {
      return (
        <KeyValueBox
          className="bf-time-remaibfng"
          title={date.toString()}
          value={
            <i className="fa fa-hourglass-end"/>
          }
          name='fundraise ended'
        />
      );
    }
  }
}
