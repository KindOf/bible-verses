import React from 'react';
import {
  InputGroup
} from '@blueprintjs/core';

const FormSimpleText = ({
  input,
  placeholder,
  type = 'text',
  ...custom
}) => (
  <InputGroup
      placeholder={placeholder}
      type={type}
      {...input}
      {...custom}
  />
);

export default FormSimpleText;
