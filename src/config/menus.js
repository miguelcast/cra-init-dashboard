import { createMenu } from '../utils/general';
import { GUEST, LOGGED } from './constants';

const menus = {
  primary: [
    createMenu('/', 'Home', 'home'),
    createMenu('/about', 'About', 'rocket'),
    createMenu('/list', 'Users', 'team', LOGGED),
  ],
  header: [
    createMenu('/register', 'Register', 'user', GUEST),
    createMenu('/login', 'Login', 'login', GUEST),
  ],
};

export default menus;
