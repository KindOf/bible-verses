import React from 'react';

// import Header from '../Header';
// import  Footer  from '../Footer';
// import Snack  from '../Snack';


import './index.scss';

const Layout = props => {
  const { children } = props;
  // return null
  return (
    <div className="layout-holder">
      {/* <Header {...props} /> */}
      <div className="layout-body">
        {children}
      </div>
      {/* <Footer /> */}
      {/* <Snack {...props} /> */}
    </div>
  );
}

export default Layout;
