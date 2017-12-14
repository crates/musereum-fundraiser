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
    agreed: false,
    selectedCheckboxes: new Set(),
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.donation.currency !== nextProps.donation.currency) {
      this.setState({
        selectedCheckboxes: new Set(),
        agreed: false
      });
    }
  }

  toggleCheckbox = key => {
    const { selectedCheckboxes } = this.state;

    if (selectedCheckboxes.has(key)) {
      selectedCheckboxes.delete(key);
    } else {
      selectedCheckboxes.add(key);
    }

    this.setState({
      selectedCheckboxes,
      agreed: selectedCheckboxes.size === 2
    })
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
    }).then((res) => {
      let { success } = res.payload;

      if (success) {
        this.props.setDonationProgress(1);
      } else {
        this.props.setDonationProgress(0);
      }
    });
  }

  no = (value) => {
    this.props.push('/');
  }


  render() {
    const { fundraiserActive, overlayMessage } = this.props;
    const { selectedCheckboxes } = this.state;

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
          <Btn value="Continue" disabled={!this.state.agreed} type="submit"/>
        }
      >
        <FormGroupBox>
          <Btn
            onClick={this.openTerms}
            size="lg"
            icon="download"
            value="Download Terms & Conditions"
          />

          <Checkbox
            label="I confirm that I'm not a citizen or a resident of the USA, Singapore, China, South Korea and I don't have any connection to these countries."
            onClick={() => this.toggleCheckbox('usa')}
            checked={selectedCheckboxes.has('usa')}
            key="usa"
          />
          <Checkbox
            label="I have read, understood and agree to the Terms and Conditions"
            onClick={() => this.toggleCheckbox('terms')}
            checked={selectedCheckboxes.has('terms')}
            key="terms"
          />
        </FormGroupBox>
      </FormStruct>
    );
  }
}
