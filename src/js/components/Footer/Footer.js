import React, { Component } from 'react';
import { Link } from 'react-router';

import './Footer.styl';

export default class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <div className="container">
          <div className="copyright">
            &copy; 2017 Musereum Pte Ltd. <br/>
            22 North Canal Road<br/>
            048834 Singapore
          </div>

          <div className="about">
            <a href="https://twitter.com/musereum" target="_blank" rel="noopener noreferrer" className="tw-link">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="https://www.facebook.com/musereum" target="_blank" rel="noopener noreferrer" className="fb-link">
              <i className="fa fa-facebook-official"></i>
            </a>
            <a href="https://t.me/joinchat/AxlyZhDrU1JxQeE27eiTVQ" target="_blank" rel="noopener noreferrer">Need help?</a>
          </div>
        </div>
      </footer>
    );
  }
}
