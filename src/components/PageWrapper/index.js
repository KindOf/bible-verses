import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const PageWrapper = props => {
  const { children, ...rest } = props;
  return (
    <div className="pageWrapper" {...rest}>{children}</div>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object
  ]).isRequired
};

export default PageWrapper;