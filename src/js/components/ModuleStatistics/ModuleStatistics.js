import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import config from 'config';
import num from 'utils/num';
import date from 'utils/date';

import ModuleBox from 'components/ModuleBox';
import ProgressBar from 'components/ProgressBar';
import KeyValuesBox from 'components/KeyValuesBox';
import KeyValueBox from 'components/KeyValueBox';
import Donut from 'components/Donut';

import TimeRemaining from 'components/TimeRemaining';

import './ModuleStatistics.styl';

export default class ModuleStatistics extends Component { // eslint-disable-line

  static propTypes = {
    progress: PropTypes.object.isRequired,
    txCount: PropTypes.number.isRequired,
    //etmClaimed: PropTypes.number.isRequired,
    etmContributed: PropTypes.number.isRequired,
    btcContributed: PropTypes.number.isRequired,

    started: PropTypes.bool.isRequired,
  }

  state = {
    capped: date.capped()
  }

  timerId = null

  componentDidMount() {
    const timerId = window.setInterval(() => {
      this.setState({ capped: date.capped() });
      if(this.state.capped) clearInterval(timerId);
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  capLabel() {
    const { /*etmClaimed,*/ /* etmContributed */ btcContributed } = this.props;
    const { capped } = this.state;

    if (capped) {
      //let current = num.usdInt(etmClaimed / 10);
      //let current = num.usdInt(etmContributed / 10);
      let current = num.pretty(btcContributed);
      //let total = num.usdInt(config.CAP_AMOUNT / 10);
      let totalMin = num.prettyInt(config.CAP_AMOUNT_BTC_MIN);
      let totalMax = num.prettyInt(config.CAP_AMOUNT_BTC);
      //return `${current} / ${total} USD`;
      return `${current} / ${totalMin}-${totalMax} BTC`;
    } else {
      return 'Hidden';
    }
  }

  renderCircles(btc, eth, etc) {
    const { started, /*etmClaimed,*/ etmContributed } = this.props;
    const { capped } = this.state;

    const endHiddenDatetime = date.endHiddenDatetime(started);
    const endDatetime = date.endDatetime(started);

    const start = moment.utc(config.START_DATETIME).local().unix();
    const now = moment().unix();

    const circleTextTitle = {
      x: "180",
      y: "178",
      fontSize: "40",
      textAnchor: "middle",
      fontWeight: "400",
      fontFamily: '"Roboto", "Seogue UI", "Lucida Grande", sans-serif',
      fill: "#43484d",
    };

    const circleTextSubTitle = {
      x: "180",
      y: "220",
      fontSize: "26",
      textAnchor: "middle",
      fontFamily: '"Roboto", "Seogue UI", "Lucida Grande", sans-serif',
      fill: "#5e6977",
    }

    const sharesOfTokens = [
      { y: btc, color: '#F7931A' },
      { y: eth, color: '#669073' },
      { y: etc, color: '#393939' },
    ]

    if (!started) {
      return [
        <KeyValueBox key={1}>
          <TimeRemaining
            type="cap"
            date={endHiddenDatetime}
            started={started}
          />
        </KeyValueBox>,
        <KeyValueBox key={2}>
          <TimeRemaining
            date={endDatetime}
            started={started}
          />
        </KeyValueBox>
      ];
    }

    if (started && !capped) {
      return [
        <KeyValueBox key={1}>
          <TimeRemaining
            type="cap"
            date={endHiddenDatetime}
            started={started}
          />
        </KeyValueBox>,
        <KeyValueBox key={2}>
          <Donut data={sharesOfTokens}>
            <text {...circleTextTitle}>Cap hidden</text>
            <text {...circleTextSubTitle}>Total sales</text>
          </Donut>
        </KeyValueBox>
      ];
    }

    if (started && capped) {
      //const share = (etmClaimed / config.CAP_AMOUNT) || 0;
      const share = (etmContributed / config.CAP_AMOUNT) || 0;
      const shareOfCap = [{ y:  share, color: '#218cff' }];

      return [
        <KeyValueBox key={1}>
          <Donut sum={1} data={shareOfCap}>
            <text {...circleTextTitle}>{share.toFixed(2)}%</text>
            <text {...circleTextSubTitle}>Share of cap</text>
          </Donut>
        </KeyValueBox>,
        <KeyValueBox key={2}>
          <Donut data={sharesOfTokens}>
            <text {...circleTextTitle}>{num.short(etmContributed)} ETM</text>
            <text {...circleTextSubTitle}>Share of coins</text>
          </Donut>
        </KeyValueBox>
      ];
    }

    return null;
  }

  render() {
    const {
      txCount, etmClaimed, etmContributed,
      started,
    } = this.props;
    const capLabel = this.capLabel();
    //const etm = num.pretty(etmClaimed);
    const etm = num.pretty(etmContributed);
    const { btcRaised, ethRaised, etcRaised } = this.props.progress;
    const { etmContributedBtc, etmContributedEth, etmContributedEtc } = this.props.progress;

    return (
      <ModuleBox
        title='Statistics'
        className="module-statistics"
      >
        {/*
        <ProgressBar etmClaimed={etmClaimed} />
        */}

        <KeyValuesBox>
          <KeyValueBox>
            <div className="bf-stats">
              Claimed
              <div className="integer">{num.prettyInt(etm)}  ETM</div>
            </div>

            <div className="bf-stats">
              Donations
              <div className="integer">{num.int(txCount)}</div>
            </div>

            <div className="bf-stats">
              Cap
              <div className="integer">{capLabel}</div>
            </div>
          </KeyValueBox>

          {this.renderCircles(etmContributedBtc, etmContributedEth, etmContributedEtc)}

          <KeyValueBox>
            <div title={num.full(btcRaised)} className="bf-stats">
              BTC raised
              <div className="integer">{num.short(btcRaised)}</div>
            </div>

            <div title={num.full(ethRaised)} className="bf-stats">
              ETH raised
              <div className="integer">{num.short(ethRaised)}</div>
            </div>

            <div title={num.full(etcRaised)} className="bf-stats">
              ETC raised
              <div className="integer">{num.short(etcRaised)}</div>
            </div>
          </KeyValueBox>
        </KeyValuesBox>

      </ModuleBox>
    );
  }
}
