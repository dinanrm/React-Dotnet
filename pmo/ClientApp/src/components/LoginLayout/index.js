import React, { Component } from 'react'
import Login from '../Login';
import { Container } from 'reactstrap';
import Footer from '../Footer';
import { ContainerLogin } from './style';

export default class LoginLayout extends Component {
  render() {
    return (
      <Container>
        <ContainerLogin>
          <Login />
        </ContainerLogin>
        <Footer />
      </Container>
    )
  }
}
