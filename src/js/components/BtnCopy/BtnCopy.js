import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Clipboard from 'clipboard';
import Btn from 'components/Btn';

export default class BtnCopy extends Component { // eslint-disable-line

  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  componentDidMount() {
    new Clipboard('.btn-copy')
  }

  trunc = (value) => {
    if (value.length > 20) value = this.props.value.substring(0, 10) + '...';
    return '“' + value + '”';
  }

  click = () => {
    /*
    this.$store.commit('notifyCustom', {
      title: 'Copy Success!',
      body: `${this.trunc(this.value)} has been copied to your clipboard.`
    })
    */
  }

  render() {
    const { value, key } = this.props;
    const label = key || 'Copy';

    return (
      <Btn
        className="btn-copy"
        icon="copy"
        onClick={this.click}
        data-clipboard-text={value}
        value={label}
      />
    );
  }
}
