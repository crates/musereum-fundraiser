import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import Btn from 'components/Btn';
import FormStruct from 'components/FormStruct';
import FormGroupBox from 'components/FormGroupBox';
import FieldGroupBox from 'components/FieldGroupBox';
import FormMsg from 'components/FormMsg';
import Field from 'components/Field';

export default class CreateWallet02 extends Component { // eslint-disable-line

  static propTypes = {
    setDonationProgress: PropTypes.func,

    donation: PropTypes.object.isRequired,
  }

  state = {
    error: {}
  }

  mnemonicValue = ''

  componentDidMount() {
    //document.querySelector('#create-wallet-recall-mnemonic').focus()
  }

  startOver = () => {
    this.props.setDonationProgress(1);
  }

  nextStep = () => {
    if(isEmpty(this.state.error)) {
      this.props.setDonationProgress(3);
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

    if (this.mnemonicValue !== donation.mnemonic) {
      error.matches = true;
    }

    if (words.length < 12) {
      error.words = true;
    }

    this.setState({ error });
  }

  render() {
    const { donation } = this.props;
    const { error } = this.state;

    return (
      <FormStruct
        onSubmit={this.nextStep}

        title={'Contribute ' + donation.currency}
        subtitle={`Confirm that you remember the mnemonic. If you've forgotten it, please start over.`}
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
          <label htmlFor="create-wallet-recall-mnemonic">Mnemonic</label>
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
          {error.matches &&
            <FormMsg name="Mnemonic" type="match"/>
          }
          {error.words &&
            <FormMsg name="Mnemonic" type="words" length="12"/>
          }
        </FormGroupBox>

      </FormStruct>
    );
  }
}
