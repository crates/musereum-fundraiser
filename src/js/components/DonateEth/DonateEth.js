import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ethereum } from 'musereum-fundraiser-lib';
import config from 'config';
import num from 'utils/num';

import Btn from 'components/Btn';
import FormStruct from 'components/FormStruct';
import FormGroupBox from 'components/FormGroupBox';
import FieldGroupBox from 'components/FieldGroupBox';
import Modal from 'components/Modal';
import Field from 'components/Field';

import './DonateEth.styl';

export default class DonateEth extends Component { // eslint-disable-line

  static propTypes = {
    donation: PropTypes.object.isRequired,

    fetchEthDonationETMRate: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchEthDonationETMRate();
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
    const tx = ethereum.getTransaction(
      addresses.musereum,
      addresses.ethereum
    );
    return JSON.stringify(tx, null, '  ');
  }

  render() {
    const { donation } = this.props;

    const ethExchangeRate = num.pretty(donation.ethRate);
    const musereumAddr = donation.wallet.addresses.musereum;
    const ethTx = this.ethTx();

    return (
      <FormStruct
        id='form-donate-eth'
        title='Contribute ETH'
        subtitle='Send ETH to claim your ETM.'
      >
        <FormGroupBox>
          <div className="donate-eth-key-values">
            <div className="key-value">
              <div className="key">Exchange Rate<sup>*</sup></div>
              <div className="value">1 ETH : {ethExchangeRate} ETM</div>
            </div>
            <div className="key-value">
              <div className="key">Min Amount</div>
              <div className="value">{config.COINS.ETH.MIN_CONTRIBUTION} ETH</div>
            </div>
            <div className="key-value">
              <div className="key">Max Amount</div>
              <div className="value">{config.COINS.ETH.MAX_CONTRIBUTION} ETH</div>
            </div>
          </div>
          <p className="bf-form-msg bf-form-msg-desc">
            <sup>*</sup> The actual Exchange Rate may differ from what is shown
            depending on when the exchange rate is updated on the contribution smart
            contract.  Check the most recent ETH/BTC rate before submitting a
            contribution, and for best results, pay a suffiently large fee to get your
            contribution transaction committed quickly.
          </p>
        </FormGroupBox>

        <FormGroupBox>
          <label htmlFor="musereum-address">Your Musereum Address</label>
          <font color="red"><b>DO NOT SEND ETHER TO THIS ADDRESS</b></font><br/>
          <span id="musereum-address">{musereumAddr}</span>
        </FormGroupBox>

        <FormGroupBox>
          <p>To make your contribution, copy and paste the below information into a wallet
  such as MyEtherWallet or Mist. Be sure to include an amount of ETH to
  contribute! Your Musereum address is included in the data, and the contribution
  will be recorded for that address in the smart contract.</p>
          <label htmlFor="donate-eth-donation-tx">Transaction Data</label>
          <FieldGroupBox>
            <Field
              id="donate-eth-donation-tx"
              type="textarea"
              value={ethTx}
            />
          </FieldGroupBox>
        </FormGroupBox>
      </FormStruct>
    );
  }
}
