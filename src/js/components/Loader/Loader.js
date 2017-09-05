import React, { Component } from 'react';
import cx from './Loader.styl';

export default class Loader extends Component { // eslint-disable-line
  render() {
    return (
      <section className={cx('loader')}>
        <div className={cx('loader__gif')} />
      </section>
    );
  }
}
