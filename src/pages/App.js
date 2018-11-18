import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import { PrivateRoute } from '../components';
import LoginForm from './LoginForm';
import VersesForm from './VersesForm';

import { ROUTES } from '../constants';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path={ROUTES.LOGIN} component={LoginForm} />
          <PrivateRoute path={ROUTES.VERSES_FORM} component={VersesForm} />
        </Switch>
      </Layout>
    );
  }
}

export default hot(module)(App);
