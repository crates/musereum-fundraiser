import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import disableScroll from 'disable-scroll';

import './Header.styl';

export default class Header extends Component { // eslint-disable-line

  static propTypes = {
    setDonationProgress: PropTypes.func.isRequired,
  }

  state = {
    activeMenuApp: false,
    activeMenuUser: false,
    desktop: false
  }

  componentDidMount() {
    this.watchWindowSize();
    window.onresize = this.watchWindowSize;
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activeMenuApp !== nextState.activeMenuApp) {
      if (nextState.activeMenuApp) {
        disableScroll.on();
      } else {
        disableScroll.off();
      }
    }

    if (this.state.activeMenuUser !== nextState.activeMenuUser) {
      if (nextState.activeMenuUser) {
        disableScroll.on();
      } else {
        disableScroll.off();
      }
    }
  }

  watchWindowSize = () => {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (w >= 1024) {
      this.closeMenus();
      this.setState({ desktop: true });
      return
    }
    this.setState({ desktop: false });
  }

  closeMenus = () => {
    this.props.setDonationProgress(0); // Return to terms and conditions
    this.setState({ activeMenuApp: false, activeMenuUser: false });
    disableScroll.off();
  }

  toggleMenuApp = () => {
    this.setState({ activeMenuApp: !this.state.activeMenuApp });
  }

  toggleMenuUser = () => {
    this.setState({ activeMenuUser: !this.state.activeMenuUser });
  }

  render() {
    // const { user } = this.props;

    /* eslint-disable max-len */
    return (
      <header className="app-header">
        <div className="container">
          {!this.state.desktop &&
            <div className="header-item" onClick={this.toggleMenuApp}>
              {!this.state.activeMenuApp ?
                <i className="fa fa-bars" />
                :
                <i className="fa fa-times" />
              }
            </div>
          }
          <Link to="/" onClick={this.closeMenus} id="logo" className="header-item">
            <img className="title" src={require('img/logo.svg')} alt="Musereum Logo"/>
          </Link>
          {!this.state.desktop &&
            <div className="header-item"></div>
          }
          {(this.state.activeMenuApp || this.state.desktop) &&
            <menu className="menu-popup">
              <nav className="nav-app">
                <Link to="/" activeClassName="active" onClick={this.closeMenus}>Dashboard</Link>
                <Link to="/contribute/btc" activeClassName="active" onClick={this.closeMenus}>Buy with BTC</Link>
                <Link to="/contribute/eth" activeClassName="active" onClick={this.closeMenus}>Buy with ETH</Link>
                <Link to="/contribute/etc" activeClassName="active" onClick={this.closeMenus}>Buy with ETC</Link>
              </nav>
              <nav>
                <a href="https://musereum.network" target="_blank">
                  <i className="fa fa-external-link"></i>
                  <span className="label">Musereum</span>
                </a>
                {/*
                <a href="http://slack.musereum.network" target="_blank">
                  <i className="fa fa-slick"></i>
                  <span className="label">Discuss on Slack</span>
                </a>
              */}
              </nav>
            </menu>
          }
        </div>
      </header>
    );
    /* eslint-enable max-len */
  }
}
