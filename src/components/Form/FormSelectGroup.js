import React from 'react';
import styled from 'styled-components';
import {
  HTMLSelect, ControlGroup
} from '@blueprintjs/core';

const StyledControlGroup = styled(ControlGroup)`
  label {
    display: flex;
    align-items: center;
    // padding-right: 8px;
  }
`;

const StyledErrorText = styled.span`
  color: red;
`;

const FormSelectGroup = ({
  input,
  children,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <>
    <StyledControlGroup>
      <HTMLSelect
        {...input}
        {...custom}
      />
      {children}
    </StyledControlGroup>
    {
      touched && invalid && <StyledErrorText>{error}</StyledErrorText>
    }
  </>
);

export default FormSelectGroup;