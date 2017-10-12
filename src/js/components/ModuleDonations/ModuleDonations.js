import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cfr from 'musereum-fundraiser-lib';

import config from 'config';
import num from 'utils/num';

import Btn from 'components/Btn';
import ModuleBox from 'components/ModuleBox';

import './ModuleDonations.styl';

export default class ModuleDonations extends Component { // eslint-disable-line

  static propTypes = {}

  state = {
    details: true,
    btcLink: `https://blockchain.info/address/${cfr.bitcoin.EXODUS_ADDRESS}`,
    ethLink: `https://etherscan.io/address/${cfr.ethereum.FUNDRAISER_CONTRACT}`,
    etcLink: `https://etherscan.io/address/${cfr.ethereumclassic.FUNDRAISER_CONTRACT}`
  }

  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    const { btcLink, ethLink } = this.state;

    return (
      <ModuleBox
        className="module-donations"
        title='Contribution History'
      >
        <div className="md-sections">
          <section>
            <h3>BTC</h3>
            <p>View the history of Bitcoin contributions on Blockchain (blockchain.info)</p>
            <a href={btcLink} rel="noopener noreferrer" target="_blank">
              <Btn
                className="link-button"
                icon="external-link"
                value="BTC Contributions"
              />
            </a>
          </section>
          <section>
            <h3>ETH</h3>
            <p>View the history of Ether contributions on Etherscan (etherscan.io)</p>
            <a href={ethLink} rel="noopener noreferrer" target="_blank">
              <Btn
                className="link-button"
                icon="external-link"
                value="ETH Contributions"
              />
            </a>
          </section>
          <section>
            <h3>ETC</h3>
            <p>View the history of Ether Classic contributions on Etherhub (etherhub.io)</p>
            <a href={etcLink} rel="noopener noreferrer" target="_blank">
              <Btn
                className="link-button"
                icon="external-link"
                value="ETС Contributions"
              />
            </a>
          </section>
        </div>
      </ModuleBox>
    );
  }
}
