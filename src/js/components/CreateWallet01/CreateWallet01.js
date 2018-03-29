import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Btn from 'components/Btn';
import ModuleOverlay from 'components/ModuleOverlay';
import FormStruct from 'components/FormStruct';
import FormGroupBox from 'components/FormGroupBox';
import FieldGroupBox from 'components/FieldGroupBox';
import Mnemonic from 'components/Mnemonic';

import './CreateWallet01.styl';

export default class CreateWallet01 extends Component { // eslint-disable-line

  static propTypes = {
    setDonationProgress: PropTypes.func,

    donation: PropTypes.object.isRequired,
    fundraiserActive: PropTypes.bool.isRequired,
    overlayMessage: PropTypes.string.isRequired,
  }

  nextStep = () => {
    this.props.setDonationProgress(2);
  }

  enterMnemonic = () => {
    this.props.setDonationProgress('input');
  }

  render() {
    const { donation, fundraiserActive, overlayMessage } = this.props;

    return (
      <FormStruct
        onSubmit={this.nextStep}
        overlay={
          !fundraiserActive ? <ModuleOverlay overlayMessage={overlayMessage}/> : null
        }
        title={'Contribute ' + donation.currency}
        subtitle={
          fundraiserActive ?
            <div>
              Copy this mnemonic and store it in a secure location. <b>You'll need it to access your ETM later.</b>
            </div>
          :
            <div>
              <br />
              <p className="end-notice">
                <strong>NOTICE: </strong>
                The fundraiser is not active. If you choose to contribute, <strong>you will NOT receive ETM</strong>.
              </p>
            </div>
        }
        reset={
          <Btn
            onClick={this.enterMnemonic}
            value="Enter your existing mnemonic"
          />
        }
        submit={
          <Btn
            type="submit"
            icon="angle-right"
            iconPos="right"
            value="Continue"
          />
        }
      >
        <FormGroupBox>
          <label>Write this down.</label>
          <label className="hidden" htmlFor="create-wallet-mnemonic">Mnemonic</label>
          <FieldGroupBox>
            <Mnemonic value={donation.mnemonic}/>
          </FieldGroupBox>
        </FormGroupBox>
      </FormStruct>
    );
  }
}
