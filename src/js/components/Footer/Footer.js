import React, { Component } from 'react';
import { Link } from 'react-router';

import './Footer.styl';

export default class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <div className="container">
          <div className="copyright">
            &copy; 2017 Musereum Prt Ltd. <br/>
            22 North Canal Road<br/>
            048834 Singapore
          </div>

          <div className="about"><a href="http://slack.musereum.network">Need help?</a></div>
        </div>
      </footer>
    );
  }
}
