import React from 'react';
import { Spinner } from '@blueprintjs/core';

import './index.scss';

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <Spinner size={100} />
  </div>
);

export default LoadingSpinner;
