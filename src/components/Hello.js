import React from 'react';
import PropTypes from 'prop-types';
import PageWrapper from './PageWrapper';

const Hello = ({ test }) => (
  <PageWrapper>
    <h2>
      Home
      { test }
    </h2>
  </PageWrapper>
);

Hello.propTypes = {
  test: PropTypes.string.isRequired
};

export default Hello;
