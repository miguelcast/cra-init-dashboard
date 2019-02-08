import { lazy } from 'react';
import { createRoute } from '../utils/general';
import Home from '../pages/Home';

const AsyncAbout = lazy(() => import('../pages/About.js'));
const AsyncRegister = lazy(() => import('../pages/Register.js'));
const AsyncLogin = lazy(() => import('../pages/Login.js'));
const AsyncForgotPass = lazy(() => import('../pages/ForgotPassword.js'));

export default [
  createRoute('/', 'Home', Home, 'home', 'primary', true),
  createRoute('/about', 'About', AsyncAbout, 'rocket'),
  createRoute('/register', 'Register', AsyncRegister, 'user', 'header'),
  createRoute('/login', 'Login', AsyncLogin, 'login', 'header'),
  createRoute(
    '/forgotPassword',
    'Forgot Password',
    AsyncForgotPass,
    null,
    null,
  ),
];
