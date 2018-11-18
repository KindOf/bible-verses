import React from 'react';
import {
  FormGroup, FileInput
} from '@blueprintjs/core';

const FormFileInput = ({
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
    <FileInput
      {...input}
      {...custom}
      text={input.value[0] ? input.value[0].name : 'Choose file...'}
      onInputChange={event => input.onChange(event.target.files[0])}
    />
  </FormGroup>
);

export default FormFileInput;