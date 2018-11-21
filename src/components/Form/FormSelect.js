import React from 'react';
import {
  HTMLSelect
} from '@blueprintjs/core';

const FormTextArea = ({
  input,
  ...custom
}) => (
  <HTMLSelect
    {...input}
    {...custom}
  />
);

export default FormTextArea;