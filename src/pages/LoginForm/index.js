import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  Card, Elevation, Button
} from '@blueprintjs/core';

import { PageWrapper } from '../../components';
import FormTextInput from '../../components/Form/FormTextInput';

import { required, validateEmail } from '../../utils/validators';

import './index.scss';

const LoginForm = () => {
  return (
    <PageWrapper>
      <div className="login-form">
        <Card elevation={Elevation.TWO}>
          <h2>Login</h2>
          <form>
            <Field
              component={FormTextInput}
              name="email"
              placeholder="email@example.com"
              label="Email"
              validate={[ required, validateEmail ]}
            />
            <Field
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

export default reduxForm({
  form: 'loginForm'
})(LoginForm);
