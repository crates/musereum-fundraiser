import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from 'config';
import date from 'utils/date';

import KeyValuesBox from 'components/KeyValuesBox';
import KeyValueBox from 'components/KeyValueBox';
import TimeRemaining from 'components/TimeRemaining';

import './DashboardHeader.styl';

export default class DashboardHeader extends Component { // eslint-disable-line

  static propTypes = {
    started: PropTypes.bool.isRequired,
  }

  render() {
    const { started } = this.props;
    const endHiddenDatetime = date.endHiddenDatetime(started);
    const endDatetime = date.endDatetime(started);

    return (
      <header className="bf-ph">
        <div className="bf-ph-container">

          <div className="bf-ph-title-sup">CRYPTOCURRENCY FOR MUSIC INDUSTRY</div>

          <div className="bf-ph-title">Private Pre-Sale of Musereum Tokens</div>

          <div className="bf-ph-title-sub">How are tokens used?</div>

          <KeyValuesBox>
            <KeyValueBox
              value={
                <div className="bf-kv-value-how gas-icon">
                  Gas
                </div>
              }
              name='Used in smart contracts as a gas
for DAPPS'
            />
            <KeyValueBox
              value={
                <div className="bf-kv-value-how licenses-icon">
                  Licenses
                </div>
              }
              name='Purchase and sale of commercial licenses through smart contracts'
            />
            <KeyValueBox
              value={
                <div className="bf-kv-value-how music-icon">
                  Music Tracks
                </div>
              }
              name='To purchase exclusivity rights through ICO for music tracks'
            />
          </KeyValuesBox>

          <div className="bf-kvs bf-ph__bf-kvs">
            <div className="bf-kv">
              <a className="bf-btn" href="https://drive.google.com/file/d/1ezwsLPgyyY4bro_CK6xFLkjgmKACvxHR/view" target="_blank" rel="noopener noreferrer"><span className="bf-btn-value">WHITE PAPER</span></a>
            </div>
            <div className="bf-kv">
              <a className="bf-btn" href="https://drive.google.com/file/d/1DcsaMA8aKntKl2hwlvYyTjG2_G3ESf6J/view" target="_blank" rel="noopener noreferrer"><span className="bf-btn-value">ONE PAGER</span></a>
            </div>
            <div className="bf-kv">
              <a className="bf-btn" href="https://drive.google.com/file/d/1IjkZg3gD_zKMjqLjsLGARTXsebA4d6o0/view" target="_blank" rel="noopener noreferrer"><span className="bf-btn-value">FAQ</span></a>
            </div>
          </div>

          <KeyValuesBox>
            {/*
            <TimeRemaining
              type="cap"
              date={endHiddenDatetime}
              started={started}
            />
            */}

            <TimeRemaining
              date={endDatetime}
              started={started}
            />
          </KeyValuesBox>
        </div>
      </header>
    );
  }
}
