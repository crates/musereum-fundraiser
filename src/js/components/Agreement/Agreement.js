import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from 'config';

import Btn from 'components/Btn';
import FormStruct from 'components/FormStruct';
import ModuleOverlay from 'components/ModuleOverlay';
import FormGroupBox from 'components/FormGroupBox';

import './Agreement.styl';

export default class Agreement extends Component { // eslint-disable-line

  static propTypes = {
    push: PropTypes.func,
    setDonationProgress: PropTypes.func,

    fundraiserActive: PropTypes.bool,
    overlayMessage: PropTypes.string,
  }

  openTerms() {
    window.location.href = config.docs.terms;
  }

  yes = () => {
    this.props.setDonationProgress(1);
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
          <Btn value="Agree" type="submit"/>
        }
      >
        <FormGroupBox>
          <Btn
            onClick={this.openTerms}
            size="lg"
            icon="download"
            value="Download Agreement"
          />
        </FormGroupBox>
      </FormStruct>
    );
  }
}
