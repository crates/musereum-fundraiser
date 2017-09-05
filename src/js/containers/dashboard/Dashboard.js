import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { dashboardSelector } from 'selectors';

import config from 'config';

import DashboardHeader from 'components/DashboardHeader';
import ModulesBox from 'components/ModulesBox';
import ModuleStatistics from 'components/ModuleStatistics';
import ModuleDonate from 'components/ModuleDonate';
import ModuleDonations from 'components/ModuleDonations';

import './Dashboard.styl';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
  }, dispatch);
}

@connect(dashboardSelector, mapDispatchToProps)
export default class Dashboard extends Component { // eslint-disable-line

  static propTypes = {
    progress: PropTypes.object.isRequired,
    txCount: PropTypes.number.isRequired,
    etmClaimed: PropTypes.number.isRequired,

    started: PropTypes.bool.isRequired,
    fundraiserActive: PropTypes.bool.isRequired,
    overlayMessage: PropTypes.string.isRequired,

    donation: PropTypes.object.isRequired,

    push: PropTypes.func,
  }

  render() {
    const {
      progress, txCount, etmClaimed,
      started, fundraiserActive, overlayMessage,
      donation,
      push,
    } = this.props;
    const coins = Object.keys(config.COINS).map(key => config.COINS[key]);

    return (
      <div  className="page page-dashboard">
        <DashboardHeader started={started}/>
        <ModulesBox>
          <ModuleStatistics
            progress={progress}
            txCount={txCount}
            etmClaimed={etmClaimed}
            started={started}
          />
          <ModuleDonate
            push={push}
            coins={coins}
            fundraiserActive={fundraiserActive}
            overlayMessage={overlayMessage}
            donation={donation}
          />
        </ModulesBox>
        <ModuleDonations
          fundraiserActive={fundraiserActive}
          overlayMessage={overlayMessage}
        />
      </div>
    );
  }
}
