import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bitcoin } from 'musereum-fundraiser-lib';
import config from 'config';
import num from 'utils/num';
import qr from 'qr-image'

import Btn from 'components/Btn';
import BtnCopy from 'components/BtnCopy';
import BtnGroupBox from 'components/BtnGroupBox';
import FormStruct from 'components/FormStruct';
import FormGroupBox from 'components/FormGroupBox';
import FieldGroupBox from 'components/FieldGroupBox';
import FormMsg from 'components/FormMsg';
import Modal from 'components/Modal';
import Field from 'components/Field';

import './DonateBtc01.styl';

export default class DonateBtc01 extends Component { // eslint-disable-line

  static propTypes = {
    donation: PropTypes.object.isRequired,

    setBtcDonationTx: PropTypes.func.isRequired,
    setDonationProgress: PropTypes.func.isRequired,

    notify: PropTypes.func.isRequired,
  }

  state = {
    qrCodeVisible: false,
  }

  transactionInterval = null

  componentDidMount() {
    /*
    let el = document.querySelector('#donate-btc-donation-address')
    el.addEventListener('focus', function () {
      el.select()
    })
    */

    const btcAddress = this.props.donation.wallet.addresses.bitcoin;
    console.log('waiting for tx to ' + btcAddress)
    this.transactionInterval = bitcoin.waitForPayment(btcAddress, (err, inputs) => {
      if (err) {
        console.error(err);
        this.props.notify({
          title: 'Bitcoin Error',
          message: 'An error occurred when trying to get Bitcoin transaction data.',
          status: 'error',
          dismissible: true,
          dismissAfter: 10000
        });
        return;
      }
      console.log('got inputs:', inputs);
      this.props.setBtcDonationTx(inputs);
      this.props.setDonationProgress(4);
    })

  }

  componentWillUnmount() {
    if (!this.transactionInterval) return
    clearInterval(this.transactionInterval)
    this.transactionInterval = null;
  }

  donateBitcoin = () => {
    const { donation } = this.props;
    window.location.href = `bitcoin:${donation.wallet.addresses.bitcoin}?label=My%20Musereum%20Fundraiser%20wallet`
  }

  qrCodeToggle = (value) => {
    this.setState({ qrCodeVisible: value });
  }

  qrcode() {
    const { donation } = this.props;
    let data = qr.imageSync(donation.wallet.addresses.bitcoin, { margin: 0 })
    let base64 = Buffer(data).toString('base64')
    return `data:image/png;base64,${base64}`
  }

  render() {
    const { donation, fundraiserActive, overlayMessage } = this.props;
    const { error, qrCodeVisible } = this.state;

    const btcExchangeRate = num.pretty(donation.btcRate);
    const qrcode = this.qrcode();

    const btcAddress = donation.wallet.addresses.bitcoin;

    return (
      <FormStruct
        id='form-donate-btc-01'
        title='Contribute BTC'
        subtitle='Send BTC to the address below to claim your ETM.'
      >
        <FormGroupBox>
          <div className="donate-btc-key-values">
            <div className="key-value">
              <div className="key">Exchange Rate</div>
              <div className="value">1 BTC : {btcExchangeRate} ETM</div>
            </div>
            <div className="key-value">
              <div className="key">Min Donation</div>
              <div className="value">{config.COINS.BTC.MIN_CONTRIBUTION} BTC</div>
            </div>
            <div className="key-value">
              <div className="key">Max Donation</div>
              <div className="value">{config.COINS.BTC.MAX_CONTRIBUTION} BTC</div>
            </div>
          </div>
          <FormMsg body="This address is for your intermediate BTC wallet. You will be asked to confirm your contribution on the next page." />
        </FormGroupBox>

        <FormGroupBox>
          <label htmlFor="donate-btc-donation-address">Donation Address</label>
          <FieldGroupBox>
            <Field
              id="donate-btc-donation-address"
              type="textarea"
              value={btcAddress}
            />
          </FieldGroupBox>
          <BtnGroupBox>
            <BtnCopy value={btcAddress}/>
            <Btn
              onClick={() => this.qrCodeToggle(true)}
              icon="qrcode"
              value="QR Code"
            />
            <Btn
              onClick={this.donateBitcoin}
              icon="btc"
              value="Open Wallet"
            />
          </BtnGroupBox>
        </FormGroupBox>

        <FormGroupBox id="donate-btc-loading">
          <div>
            <div className="container">
              <i className="fa fa-circle-o-notch fa-spin"></i>
              <span>Waiting for contribution&hellip;</span>
            </div>
          </div>
        </FormGroupBox>

        {qrCodeVisible &&
          <Modal
            id="donate-btc-qr"
            title='QR Code'
            footer={
              <Btn
                value="Return to Page"
                onClick={() => this.qrCodeToggle(false)}
              />
            }
          >
            <div>
              <img
                alt="Donation QR Code"
                src={qrcode}
              />
            </div>
          </Modal>
        }
      </FormStruct>
    );
  }
}
