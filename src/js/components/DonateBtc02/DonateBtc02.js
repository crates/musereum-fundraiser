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

import './DonateBtc02.styl';

export default class DonateBtc02 extends Component { // eslint-disable-line

  static propTypes = {
    donation: PropTypes.object.isRequired,

    push: PropTypes.func.isRequired,
    finalizeBtcDonation: PropTypes.func.isRequired,
    setDonationProgress: PropTypes.func.isRequired,
  }

  finalize = () => {
    this.props.finalizeBtcDonation((err) => {
      if (err) return;

      this.props.setDonationProgress(0);
      this.props.push('/');
    });
  }

  finalTx(){
    let { tx, feeRate } = this.props.donation
    return bitcoin.createFinalTx(tx.utxos, feeRate)
  }


  render() {
    const { donation } = this.props;

    const finalTx = this.finalTx();
    const donationAmount = finalTx.paidAmount;
    const bitcoinFee = finalTx.feeAmount;
    const etmAmount = (finalTx.btcAmount * donation.btcRate) / 1e8;

    const btcExchangeRate = num.pretty(donation.btcRate);

    const btcAddress = donation.wallet.addresses.bitcoin;
    const musereumAddress = donation.wallet.addresses.musereum;

    return (
      <FormStruct
        onSubmit={this.finalize}
        title='Contribute BTC'
        subtitle={
          <div>
            <strong>Please confirm your contribution.</strong> Once you confirm, funds will be sent from your intermediate Bitcoin wallet to the Musereum Fundraiser exodus address.
          </div>
        }
        submit={
          <Btn
            type="submit"
            icon="check"
            value="Confirm Contribution"
          />
        }
      >
        <FormGroupBox>
          <div className="fund-btc-key-values">
            <div className="key-value">
              <div className="key">Donation Amount</div>
              <div className="value">{donationAmount / 1e8} BTC</div>
            </div>
            <div className="key-value">
              <div className="key">Bitcoin Fee</div>
              <div className="value">{bitcoinFee / 1e8} BTC</div>
            </div>
            <div className="key-value">
              <div className="key">Exchange Rate</div>
              <div className="value">1 BTC : {btcExchangeRate} ETM</div>
            </div>
          </div>
        </FormGroupBox>

        <FormGroupBox>
          <label htmlFor="your-musereum-address">Your Musereum Address</label>
          <FieldGroupBox>
            <Field
              id="your-musereum-address"
              type="textarea"
              value={musereumAddress}
            />
          </FieldGroupBox>
        </FormGroupBox>

        <FormGroupBox>
          <label>When the Musereum blockchain launches, your account will be credited with:</label>
          <FieldGroupBox id="field-group-etm-amount">
            <Field value={etmAmount} disabled></Field>
            <div className="bf-field-addon">ETM</div>
          </FieldGroupBox>
        </FormGroupBox>
      </FormStruct>
    );
  }
}
