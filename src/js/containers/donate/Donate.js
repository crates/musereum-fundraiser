import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { addNotification as notify } from 'reapop';
import { donateSelector } from 'selectors';

import {
  setDonationProgress,
  setDonationCurrency,
  setBtcDonationTx,
  fetchBtcDonationFeeRate,
  fetchEthDonationETMRate,
  fetchEtcDonationETMRate,
  setDonationMnemonicAndWallet,
  finalizeBtcDonation,
  fetchCouponRate,
} from 'actions';

import Steps from 'components/Steps';

import Agreement from 'components/Agreement';

import Coupon from 'components/Coupon';

import CreateWallet01 from 'components/CreateWallet01';
import CreateWallet02 from 'components/CreateWallet02';
import InputWallet from 'components/InputWallet';

import DonateBtc01 from 'components/DonateBtc01';
import DonateBtc02 from 'components/DonateBtc02';

import DonateEth from 'components/DonateEth';
import DonateEtc from 'components/DonateEtc';


import './Donate.styl';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setDonationProgress,
    setDonationCurrency,
    setBtcDonationTx,
    fetchBtcDonationFeeRate,
    fetchEthDonationETMRate,
    fetchEtcDonationETMRate,
    setDonationMnemonicAndWallet,
    finalizeBtcDonation,
    fetchCouponRate,
    notify,
  }, dispatch);
}

@connect(donateSelector, mapDispatchToProps)
export default class Donate extends Component { // eslint-disable-line

  static propTypes = {
    progress: PropTypes.object.isRequired,
    donation: PropTypes.object.isRequired,
    fundraiserActive: PropTypes.bool.isRequired,
    overlayMessage: PropTypes.string.isRequired,

    params: PropTypes.object,
    push: PropTypes.func,
    setDonationProgress: PropTypes.func,
    setDonationCurrency: PropTypes.func,
    setBtcDonationTx: PropTypes.func,
    fetchBtcDonationFeeRate: PropTypes.func,
    fetchEthDonationETMRate: PropTypes.func,
    fetchEtcDonationETMRate: PropTypes.func,
    setDonationMnemonicAndWallet: PropTypes.func,
    finalizeBtcDonation: PropTypes.func,
    fetchCouponRate: PropTypes.func,

    notify: PropTypes.func,
  }

  componentDidMount() {
    const currency = this.props.params.currency.toUpperCase();
    this.setCurrency(currency)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.currency !== nextProps.params.currency) {
      const currency = nextProps.params.currency.toUpperCase();
      this.setCurrency(currency)
    }
  }

  setCurrency(currency) {
    this.props.setDonationCurrency(currency);
    if (currency === 'BTC') {
      this.props.fetchBtcDonationFeeRate();
    } else if (currency === 'ETH') {
      this.props.fetchEthDonationETMRate();
    } else if (currency === 'ETC') {
      this.props.fetchEtcDonationETMRate();
    }
  }

  renderContent() {
    const {
      donation, fundraiserActive, overlayMessage,
      push,

      setDonationProgress,
      setDonationMnemonicAndWallet,
      setBtcDonationTx,
      fetchEthDonationETMRate,
      fetchEtcDonationETMRate,
      finalizeBtcDonation,
      fetchCouponRate,

      notify,
    } = this.props;

    if(donation.progress === 0) {
      return (
        <Agreement
          fundraiserActive={fundraiserActive}
          overlayMessage={overlayMessage}

          push={push}
          setDonationProgress={setDonationProgress}
        />
      );
    } else if(donation.progress === 'coupon') {
      return (
        <Coupon
          donation={donation}

          fetchCouponRate={fetchCouponRate}
          setDonationProgress={setDonationProgress}
        />
      );
    } else if(donation.progress === 1) {
      return (
        <CreateWallet01
          donation={donation}
          fundraiserActive={fundraiserActive}
          overlayMessage={overlayMessage}

          setDonationProgress={setDonationProgress}
        />
      );
    } else if(donation.progress === 2) {
      return (
        <CreateWallet02
          donation={donation}

          setDonationProgress={setDonationProgress}
        />
      );
    } else if(donation.progress === 'input') {
      return (
        <InputWallet
          donation={donation}
          fundraiserActive={fundraiserActive}
          overlayMessage={overlayMessage}

          setDonationProgress={setDonationProgress}
          setDonationMnemonicAndWallet={setDonationMnemonicAndWallet}
        />
      );
    } else if(donation.progress === 3) {
      if (donation.currency === 'BTC') {
        return (
          <DonateBtc01
            donation={donation}

            setBtcDonationTx={setBtcDonationTx}
            setDonationProgress={setDonationProgress}
            notify={notify}
          />
        );
      } else if (donation.currency === 'ETH') {
        return (
          <DonateEth
            donation={donation}

            fetchEthDonationETMRate={fetchEthDonationETMRate}
          />
        );
      } else if (donation.currency === 'ETC') {
        return (
          <DonateEtc
            donation={donation}

            fetchEtcDonationETMRate={fetchEtcDonationETMRate}
          />
        );
      }

    } else if(donation.progress === 4 && donation.currency === 'BTC') {
      return (
        <DonateBtc02
          donation={donation}

          push={push}
          finalizeBtcDonation={finalizeBtcDonation}
        />
      );
    }
  }

  render() {
    const { donation } = this.props;

    return (
      <div className="page page-donate">

        <Steps donation={donation} />

        <div className="bf-forms">
          {this.renderContent()}
        </div>

      </div>
    );
  }
}
