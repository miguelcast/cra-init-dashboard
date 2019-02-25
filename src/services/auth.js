import instance from './instance';
import { auth } from '../config/services';

export const authenticationService = (userName, password) =>
  instance.post(auth.login, { userName, password });
