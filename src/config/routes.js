import { lazy } from 'react';
import { createRoute } from '../utils/general';
import Home from '../pages/Home';

const AsyncAbout = lazy(() => import('../pages/About.js'));
const AsyncRegister = lazy(() => import('../pages/Register.js'));
const AsyncLogin = lazy(() => import('../pages/Login.js'));
const AsyncForgotPass = lazy(() => import('../pages/ForgotPassword.js'));
const AsyncList = lazy(() => import('../pages/List.js'));
const AsyncForm = lazy(() => import('../pages/Form.js'));

export default [
  createRoute('/', Home, true),
  createRoute('/about', AsyncAbout),
  createRoute('/register', AsyncRegister),
  createRoute('/login', AsyncLogin),
  createRoute('/forgotPassword', AsyncForgotPass),
  createRoute('/list', AsyncList),
  createRoute('/form/:id?', AsyncForm),
];
