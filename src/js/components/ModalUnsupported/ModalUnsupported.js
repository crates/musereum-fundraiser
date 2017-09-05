import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

export default class ModalUnsupported extends Component { // eslint-disable-line

  render() {
    const isValidBrowser = Object.defineProperty || false;
    if (isValidBrowser) return null;

    return (
      <Modal
        title={
          <div>
            <i className="fa fa-warning"></i> Unsupported Web Browser
          </div>
        }
      >
        <div>The Musereum Fundraiser does not support Internet Explorer 8 and below. Please update your browser to a modern version of Chrome, Firefox or Safari.</div>
      </Modal>
    );
  }
}
