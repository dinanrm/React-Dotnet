import React, { Component } from 'react';
import { FooterPage } from './style.js';

export default class Footer extends Component {
  render () {
    return (
      <FooterPage className="mastfoot mt-auto">
        <div className="inner">
          &copy; Copyright BANPU {new Date().getFullYear()}. All Rights Reserved. 
        </div>
      </FooterPage>
    );
  }
}
