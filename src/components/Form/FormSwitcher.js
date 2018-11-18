import React from 'react';
import {
  FormGroup, Switch
} from '@blueprintjs/core';

const FormSwitcher = ({
  input,
  label = '',
  formGroupProps
}) => (
  <FormGroup
    label={label}
    {...formGroupProps}
  >
    <Switch
      {...input}
    />
  </FormGroup>
);

export default FormSwitcher;
