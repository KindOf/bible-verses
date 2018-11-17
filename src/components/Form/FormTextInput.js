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
  ...custom
}) => (
  <FormGroup
    label={label}
    intent={ touched && invalid ? 'danger' : 'none'}
    helperText={touched && invalid && error}
    {...custom}
  >
    <InputGroup
      {...input}
      placeholder={placeholder}
      type={type}
    />
  </FormGroup>
);

export default FormTextInput;
