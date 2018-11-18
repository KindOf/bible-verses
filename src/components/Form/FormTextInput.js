import React from 'react';
import {
  FormGroup, InputGroup
} from '@blueprintjs/core';

const FormTextInput = ({
  input,
  label = '',
  placeholder,
  type = 'text',
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
    <InputGroup
      placeholder={placeholder}
      type={type}
      {...input}
      {...custom}
    />
  </FormGroup>
);

export default FormTextInput;
