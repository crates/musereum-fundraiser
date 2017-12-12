import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Steps.styl';

const steps = [
  { title: '1. Terms', keys: [0] },
  { title: '2. Wallet', keys: [1, 2, 'input'] },
  // { title: '3. Coupon', keys: ['coupon'] }, // For removing coupon from ui
  { title: '3. Contribute', keys: [3, 4] },
];

export default class Steps extends Component { // eslint-disable-line

  static propTypes = {
    donation: PropTypes.object.isRequired,
  };

  render() {
    const { donation } = this.props;

    return (
      <ol className="bf-steps">
        {steps.map((step, key) => (
          <li key={key} className={step.keys.includes(donation.progress) && 'active'}>
            <span>{step.title}</span>
          </li>
        ))}
      </ol>
    );
  }
}
