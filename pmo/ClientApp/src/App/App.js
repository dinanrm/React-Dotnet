import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/global-theme';
import LoginLayout from '../components/LoginLayout'
import Home from '../components/Home'
import SignIn from '../components/Signin'
import { BackgroundContainer } from '../styles/global-style'
import NoMatch from '../components/NoMatch';
import Context from '../utils/context'
import { PrivateRoute } from '../utils/private-route'
import './App.css'
import LoginCallBack from '../components/LoginCallback';

export default class App extends Component {
  static displayName = App.name;

  constructor (props) {
    super(props);
    this.state = { user: null };
  }
  
  render () {
    return (
      <ThemeProvider theme={theme}>
        <Context>
          <BackgroundContainer className="h-auto d-flex align-items-center">
            <Switch>
              <Route path="/signin" component={SignIn}></Route> 
              <Route path="/login" component={LoginLayout}></Route>
              <Route path="/callback" component={LoginCallBack}></Route>
              <PrivateRoute exact path="/" component={Home}></PrivateRoute>
              <PrivateRoute path="/:id" component={Home}></PrivateRoute>
              <Route component={NoMatch}></Route>
            </Switch>
          </BackgroundContainer>
        </Context>
      </ThemeProvider>
    );
  }
}
