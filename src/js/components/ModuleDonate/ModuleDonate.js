import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from 'config';
import num from 'utils/num';

import Btn from 'components/Btn';
import ModuleBox from 'components/ModuleBox';
import ModuleOverlay from 'components/ModuleOverlay';
import KeyValuesBox from 'components/KeyValuesBox';
import KeyValueBox from 'components/KeyValueBox';

import './ModuleDonate.styl';

const icon = {
  'BTC': require('./img/btc-icon.svg'),
  'ETH': require('./img/eth-icon.svg'),
  'ETC': require('./img/etc-icon.svg'),
}

export default class ModuleDonate extends Component { // eslint-disable-line

  static propTypes = {
    coins: PropTypes.array.isRequired,
    fundraiserActive: PropTypes.bool.isRequired,
    overlayMessage: PropTypes.string.isRequired,

    donation: PropTypes.object.isRequired,

    push: PropTypes.func,
  }

  exchangeRate = (coin) => {
    const { donation } = this.props;

    if (coin.UNIT === 'ETH') {
      return num.pretty(donation.ethRate);
    }

    switch(coin.UNIT) {
      case 'BTC':
        return num.pretty(donation.btcRate);
      case 'ETC':
        return num.pretty(donation.etcRate);
      case 'ETC':
        return num.pretty(donation.etcRate);
    }
  }

/*
  tutorialLink = () => {
    const { coin } = this.props;

    if (coin.UNIT === 'BTC') window.location.href = config.docs.btc
    if (coin.UNIT === 'ETH') window.location.href = config.docs.ethWeb
  }
*/

  render() {
    const {
      coins, fundraiserActive, overlayMessage,
      push
    } = this.props;

    return (
      <ModuleBox
        size="sm"
        className="module-donation"
        overlay={
          !fundraiserActive ? <ModuleOverlay overlayMessage={overlayMessage} /> : null
        }
        footer={
          <div className="how-to-buy">
            <a href="https://docs.google.com/document/d/1QruR3ZQOfAo455qK3SPt_DGhwYxXX2MP_BTF_LRvQiI">
              <i className="fa fa-question-circle-o"></i>How to buy?
            </a>
          </div>
        }
      >

        <KeyValuesBox>
          {coins.map((coin, key) => (
            <KeyValueBox key={key}>
              <div className="img">
                <img src={icon[coin.UNIT]} />
              </div>

              <div className="exchange-rate">
                <span className="key">1 {coin.UNIT}</span>
                <span className="symbol">:</span>
                <span className="value">{this.exchangeRate(coin)} ETM</span>
              </div>

              <div className="min-donation">Minimum Contribution: {coin.MIN_CONTRIBUTION} {coin.UNIT}</div>

              <Btn
                value={'BUY WITH ' + coin.UNIT}
                onClick={() => push('/contribute/' + coin.UNIT.toLowerCase())}
              />
            </KeyValueBox>
          ))}
        </KeyValuesBox>

      </ModuleBox>
    );
  }
}
