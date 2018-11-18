import React from 'react';
import {
  FormGroup, TextArea
} from '@blueprintjs/core';

const FormTextArea = ({
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
    <TextArea
      placeholder={placeholder}
      type={type}
      {...input}
      {...custom}
    />
  </FormGroup>
);

export default FormTextArea;