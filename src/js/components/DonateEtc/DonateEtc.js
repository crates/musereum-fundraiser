import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ethereumclassic } from 'musereum-fundraiser-lib';
import config from 'config';
import num from 'utils/num';

import Btn from 'components/Btn';
import FormStruct from 'components/FormStruct';
import FormGroupBox from 'components/FormGroupBox';
import FieldGroupBox from 'components/FieldGroupBox';
import Modal from 'components/Modal';
import Field from 'components/Field';

import './DonateEtc.styl';

export default class DonateEtc extends Component { // eslint-disable-line

  static propTypes = {
    donation: PropTypes.object.isRequired,

    fetchEtcDonationETMRate: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchEtcDonationETMRate();
  }

  componentDidMount() {
    /*
    let el = document.querySelector('#donate-eth-donation-tx')
    el.addEventListener('focus', function () {
      el.select()
    })
    */
  }

  ethTx() {
    const { addresses } = this.props.donation.wallet;
    const tx = ethereumclassic.getTransaction(
      addresses.musereum,
      addresses.ethereumclassic
    );
    return JSON.stringify(tx, null, '  ');
  }

  render() {
    const { donation } = this.props;

    const etcExchangeRate = num.pretty(donation.etcRate);
    const musereumAddr = donation.wallet.addresses.musereum;
    const etcTx = this.ethTx();

    return (
      <FormStruct
        id='form-donate-etc'
        title='Contribute ETC'
        subtitle='Send ETC to claim your ETM.'
      >
        <FormGroupBox>
          <div className="donate-etc-key-values">
            <div className="key-value">
              <div className="key">Exchange Rate<sup>*</sup></div>
              <div className="value">1 ETH : {etcExchangeRate} ETM</div>
            </div>
            <div className="key-value">
              <div className="key">Min Donation</div>
              <div className="value">{config.COINS.ETC.MIN_CONTRIBUTION} ETC</div>
            </div>
            <div className="key-value">
              <div className="key">Max Donation</div>
              <div className="value">{config.COINS.ETC.MAX_CONTRIBUTION} ETC</div>
            </div>
          </div>
          <p className="disclaimer">
            <sup>*</sup> The actual Exchange Rate may differ from what is shown
            depending on when the exchange rate is updated on the donation smart
            contract.  Check the most recent ETC/BTC rate before submitting a
            donation, and for best results, pay a suffiently large fee to get your
            donation transaction committed quickly.
          </p>
        </FormGroupBox>

        <FormGroupBox>
          <label htmlFor="musereum-address">Your Musereum Address</label>
          <font color="red"><b>DO NOT SEND ETHER CLASSIC TO THIS ADDRESS</b></font><br/>
          <span id="musereum-address">{musereumAddr}</span>
        </FormGroupBox>

        <FormGroupBox>
          <p>To make your donation, copy and paste the below information into a wallet
  such as Classic Ether Wallet or Jaxx. Be sure to include an amount of ETC to
  donate! Your Musereum address is included in the data, and the donation
  will be recorded for that address in the smart contract.</p>
          <label htmlFor="donate-etc-donation-tx">Transaction Data</label>
          <FieldGroupBox>
            <Field
              id="donate-etc-donation-tx"
              type="textarea"
              value={etcTx}
            />
          </FieldGroupBox>
        </FormGroupBox>
      </FormStruct>
    );
  }
}
