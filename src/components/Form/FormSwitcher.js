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
      checked={input.value}
    />
  </FormGroup>
);

export default FormSwitcher;
