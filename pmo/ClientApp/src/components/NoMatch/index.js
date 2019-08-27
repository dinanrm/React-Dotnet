import React, { Component } from 'react';
import { ContainerPage } from './style';

export default class NoMatch extends Component {
  render() {
    return (
      <ContainerPage className="text-center text-white">
        <h1>404</h1>
        Oops! Page Not Found.
      </ContainerPage>
    )
  }
}
