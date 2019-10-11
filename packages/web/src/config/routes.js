import { lazy } from 'react';
import { createRoute } from '../utils/general';
import Home from '../pages/Home';
import { LOGGED, GUEST } from './constants';

const AsyncAbout = lazy(() => import('../pages/About.js'));
const AsyncRegister = lazy(() => import('../pages/Register.js'));
const AsyncLogin = lazy(() => import('../pages/Login.js'));
const AsyncForgotPass = lazy(() => import('../pages/ForgotPassword.js'));
const AsyncList = lazy(() => import('../pages/List.js'));
const AsyncForm = lazy(() => import('../pages/Form.js'));

export default [
  createRoute('/', Home, null, true),
  createRoute('/about', AsyncAbout),
  createRoute('/register', AsyncRegister, GUEST),
  createRoute('/login', AsyncLogin, GUEST),
  createRoute('/forgotPassword', AsyncForgotPass, GUEST),
  createRoute('/list', AsyncList, LOGGED),
  createRoute('/form/:id?', AsyncForm, LOGGED),
];
