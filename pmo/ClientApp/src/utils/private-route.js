import { Consumer } from './context'
import { Route, Redirect } from 'react-router-dom'
import React from 'react'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Consumer>
      {({ state }) =>
      <Route
        {...rest}
        render={props =>
          // state.token !== "" || state.token ? (
          state.username ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                // pathname: "/login",
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
      }
    </Consumer>
  );