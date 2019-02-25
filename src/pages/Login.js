import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Login as LoginForm, useAuthenticated } from '../components/Auth';

const Login = props => {
  const isAuth = useAuthenticated();
  return isAuth ? <Redirect to="/" /> : <LoginForm {...props} />;
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
