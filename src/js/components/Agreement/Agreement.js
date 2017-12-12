import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from 'config';

import Btn from 'components/Btn';
import FormStruct from 'components/FormStruct';
import ModuleOverlay from 'components/ModuleOverlay';
import FormGroupBox from 'components/FormGroupBox';
import Checkbox from 'components/Checkbox';

import './Agreement.styl';

export default class Agreement extends Component { // eslint-disable-line

  static propTypes = {
    push: PropTypes.func,
    setDonationProgress: PropTypes.func,

    fetchCouponRate: PropTypes.func, // For removing coupons from ui
    donation: PropTypes.object.isRequired, // For removing coupons from ui

    fundraiserActive: PropTypes.bool,
    overlayMessage: PropTypes.string,
  }

  state = {
    agreed: false
  }

  selectedCheckboxes = new Set();

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }

    this.setState({ agreed: this.selectedCheckboxes.size === 1 })
  }

  openTerms() {
    window.location.href = config.docs.terms;
  }

  yes = () => {
    //this.props.setDonationProgress(1); For removing coupon from ui

    const { donation } = this.props;
    this.props.fetchCouponRate('', {
      coin: donation.currency,
      address: donation.wallet.addresses.musereum,
    }).then(() => {
      this.props.setDonationProgress(3);
    });
  }

  no = (value) => {
    this.props.push('/');
  }


  render() {
    const { fundraiserActive, overlayMessage } = this.props;

    return (
      <FormStruct
        id='form-agreement'
        onSubmit={this.yes}
        overlay={
          !fundraiserActive ? <ModuleOverlay overlayMessage={overlayMessage}/> : null
        }
        title='Contribution Terms'
        subtitle={
          fundraiserActive ?
            `You must agree to the contribution terms agreement before starting the contribution.`
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
          <Btn value="Cancel" onClick={this.no}/>
        }
        submit={
          <Btn value="Agree" disabled={!this.state.agreed} type="submit"/>
        }
      >
        <FormGroupBox>
          <Btn
            onClick={this.openTerms}
            size="lg"
            icon="download"
            value="Download Agreement"
          />

          <Checkbox
            label="I confirm that I'm not a citizen of the USA, Singapore and I don't have any bindings with it."
            handleCheckboxChange={this.toggleCheckbox}
            key="usa"
          />
        </FormGroupBox>
      </FormStruct>
    );
  }
}
