import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from 'config';
import num from 'utils/num';
import date from 'utils/date';

import './ProgressBar.styl';

export default class ProgressBar extends Component { // eslint-disable-line

  static propTypes = {
    etmClaimed: PropTypes.number,
  }

  render() {
    const { children, etmClaimed } = this.props;
    const capped = date.capped();
    const percentageDonated = etmClaimed / config.CAP_AMOUNT;
    const percentageDonatedFriendly = Math.round(percentageDonated * 100 * 100) / 100;
    const innerBarStyle = {
      width: percentageDonated * 100 + '%',
      'justify-content': (percentageDonated < 3 ? 'flex-start' : 'flex-end')
    };

    return (
      <div className="pb-container">
        <div className="pb-bar-outer">
          {!capped ?
            <div className="pb-bar-obscured">
              fundraiser cap is hidden<span className="first-six-hours">for the first six hours</span>
            </div>
            :
            <div className="pb-bar-inner" style={innerBarStyle}>
              <div className="label label-percentage">{percentageDonatedFriendly}%</div>
            </div>
          }
        </div>
      </div>
    );
  }
}
