import React from 'react';
import {
  FormGroup, HTMLSelect
} from '@blueprintjs/core';

const FormTextArea = ({
  input,
  label = '',
  meta: { touched, error, invalid },
  formGroupProps,
  ...custom
}) => (
  <FormGroup
    label={label}
    intent={ touched && invalid ? 'danger' : 'none'}
    helperText={touched && invalid && error}
    {...formGroupProps}
  >
    <HTMLSelect
      {...input}
      {...custom}
    />
  </FormGroup>
);

export default FormTextArea;