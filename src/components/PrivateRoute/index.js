import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, user, loading, ...rest }) => (
  <Route {...rest} render={(props) => (
    !loading && (
      user === null
        ? <Redirect to='/login' />
        : <Component {...props} />
    )
  )} />
);

export default connect(
  state => ({
    user: state.auth.user,
    loading: state.global.loading
  })
)(PrivateRoute);
