import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  Card, Elevation, Button
} from '@blueprintjs/core';

import { PageWrapper } from '../../components';
import FormTextInput from '../../components/Form/FormTextInput';
import { authSignIn } from '../../actions';
import { required, validateEmail } from '../../utils/validators';

import './index.scss';

const LoginForm = ({ handleSubmit, signIn }) => {
  const submit = values => {
    signIn(values);
  }

  return (
    <PageWrapper>
      <div className="login-form">
        <Card elevation={Elevation.TWO}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(submit)}>
            <Field
              large
              component={FormTextInput}
              name="email"
              placeholder="email@example.com"
              label="Email"
              validate={[ required, validateEmail ]}
            />
            <Field
              large
              component={FormTextInput}
              name="password"
              placeholder="*******"
              label="Password"
              validate={[ required ]}
              type="password"
            />
            <Button
              icon="arrow-up"
              type="submit"
              text="Login"
              intent="success"
            />
          </form>
        </Card>
      </div>
    </PageWrapper>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
  signIn: data => dispatch(authSignIn(data).request)
})

export default compose(
  reduxForm({
    form: 'loginForm'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginForm);
