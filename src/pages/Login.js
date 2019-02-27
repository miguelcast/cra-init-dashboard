import React from 'react';
import { connect } from 'react-redux';
import { Login as LoginForm } from '../components/Auth';

const Login = props => {
  return <LoginForm {...props} />;
};

const mapState = state => ({
  loading: state.loading.effects.auth.authentication,
});

const mapDispatch = dispatch => ({
  authentication: (username, password) =>
    dispatch.auth.authentication({ username, password }),
});

export default connect(
  mapState,
  mapDispatch,
)(Login);
