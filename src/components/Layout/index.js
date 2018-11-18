import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onAuthStateChage } from '../../utils/firebase';
import { setUser, toggleLoading, authSignOut } from '../../actions';
import LoadingSpinner from '../LoadingSpinner';
import Header from '../Header';
// import  Footer  from '../Footer';
// import Snack  from '../Snack';


import './index.scss';

class Layout extends Component {
  componentDidMount() {
    const { userSet, setLoading } = this.props;
    setLoading(true);
    onAuthStateChage(authUser => {
      authUser
        ? userSet(authUser.toJSON())
        : userSet(null);
      setLoading(false);
    });
  }

  renderApp = (children) => (
    <div className="layout-holder">
      <Header {...this.props} />
      <div className="layout-body">
        {children}
      </div>
    </div>
  )

  render() {
    const { children, loading } = this.props;
    return (
      loading ? <LoadingSpinner /> : this.renderApp(children)
    );
  }
}

const mapStateToProps = state => ({
  loading: state.global.loading,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  userSet: data => dispatch(setUser(data)),
  setLoading: data => dispatch(toggleLoading(data)),
  signOut: () => dispatch(authSignOut().request)
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
