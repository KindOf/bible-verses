import React from 'react';
import PropTypes from 'prop-types';

const Hello = ({ test }) => (
  <h2>
    Home
    { test }
  </h2>
);

Hello.propTypes = {
  test: PropTypes.string.isRequired
};

export default Hello;
