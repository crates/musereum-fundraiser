import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import config from 'config';

import Btn from 'components/Btn';
import FormStruct from 'components/FormStruct';
import FormGroupBox from 'components/FormGroupBox';
import FieldGroupBox from 'components/FieldGroupBox';
import FormMsg from 'components/FormMsg';
import Mnemonic from 'components/Mnemonic';
import ModuleOverlay from 'components/ModuleOverlay';
import Field from 'components/Field';

export default class InputWallet extends Component { // eslint-disable-line

  static propTypes = {
    donation: PropTypes.object.isRequired,
    fundraiserActive: PropTypes.bool.isRequired,
    overlayMessage: PropTypes.string.isRequired,

    setDonationProgress: PropTypes.func,
    setDonationMnemonicAndWallet: PropTypes.func,
  }

  state = {
    error: {}
  }

  mnemonicValue = ''

  startOver = () => {
    this.props.setDonationProgress(1);
  }

  nextStep = () => {
    if (isEmpty(this.state.error)) {
      this.props.setDonationMnemonicAndWallet(this.mnemonicValue).then((action)=> {
        if (action.type != 'ERROR') {
          this.props.setDonationProgress(3);
        }
      })
    }
  }

  handleChangeMnemonic = (event) => {
    const { donation } = this.props;
    this.mnemonicValue = event.target.value;
    let words = this.mnemonicValue.trim().split(/\s+/g);

    let error = {};

    if (this.mnemonicValue == '') {
      error.required = true;
    }

    if (words.length < 12) {
      error.words = true;
    }

    this.setState({ error });
  }

  render() {
    const { donation, fundraiserActive, overlayMessage } = this.props;
    const { error } = this.state;

    return (
      <FormStruct
        onSubmit={this.nextStep}
        overlay={
          !fundraiserActive ? <ModuleOverlay overlayMessage={overlayMessage}/> : null
        }
        title={'Contribute ' + donation.currency}
        subtitle='Enter a pre-existing mnemonic'
        reset={
          <Btn
            onClick={this.startOver}
            value="Reset"
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
        <FormGroupBox className={ !isEmpty(error) ? 'error' : '' }>
          <label>Mnemonic</label>
          <label className="hidden" htmlFor="create-wallet-mnemonic">Mnemonic</label>
          <FieldGroupBox>
            <Field
              autofocus
              type="textarea"
              placeholder="Enter your mnemonic"
              onChange={this.handleChangeMnemonic}
              required
            />
          </FieldGroupBox>
          {error.required &&
            <FormMsg name="Mnemonic" type="required" />
          }
          {error.words &&
            <FormMsg name="Mnemonic" type="words" length="12"/>
          }
        </FormGroupBox>

      </FormStruct>
    );
  }
}
