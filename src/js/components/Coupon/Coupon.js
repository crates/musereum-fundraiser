import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bitcoin } from 'musereum-fundraiser-lib';
import config from 'config';
import num from 'utils/num';

import Btn from 'components/Btn';
import FormStruct from 'components/FormStruct';
import FormGroupBox from 'components/FormGroupBox';
import FieldGroupBox from 'components/FieldGroupBox';
import Field from 'components/Field';

import './Coupon.styl';

export default class Coupon extends Component { // eslint-disable-line

  static propTypes = {
    donation: PropTypes.object.isRequired,

    fetchCouponRate: PropTypes.func,
    setDonationProgress: PropTypes.func,
  }

  state = {
    coupon: '',
  }

  handleChangeCouponCode = (event) => this.setState({ coupon: event.target.value });

  skip = () => {
    this.props.setDonationProgress(3);
  }

  checkCoupon = () => {
    console.log('Coupon: ', this.state.coupon);
    const { donation } = this.props;
    this.props.fetchCouponRate(this.state.coupon, {
      coin: donation.currency,
      address: donation.wallet.addresses.musereum,
    }).then(() => {
      this.props.setDonationProgress(3);
    });
  }

  render() {
    const { donation } = this.props;

    const musereumAddress = donation.wallet.addresses.musereum;

    return (
      <FormStruct
        onSubmit={this.checkCoupon}
        title='Coupon Code'
        reset={
          <Btn value="Skip" onClick={this.skip}/>
        }
        submit={
          <Btn
            type="submit"
            icon="check"
            value="Confirm coupon"
          />
        }
      >
        <FormGroupBox>
          <label htmlFor="your-coupon"><strong>If you have coupon</strong> type it below and change rate of ETM.</label>
          <FieldGroupBox>
            <Field
              id="your-coupon"
              placeholder={'Type your coupon code here'}
              value={this.state.coupon}
              onChange={this.handleChangeCouponCode}
            />
          </FieldGroupBox>
        </FormGroupBox>
      </FormStruct>
    );
  }
}
