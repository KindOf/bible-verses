import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Hello from '../components/Hello';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Switch>
          <Route path='/hello' component={() => <Hello test='test' />} />
        </Switch>
      </Layout>
    );
  }
}

export default hot(module)(App);
