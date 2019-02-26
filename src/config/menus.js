import { createMenu, createComponent } from '../utils/general';
import { GUEST, LOGGED } from './constants';
import { HeaderUser } from '../components/Layout';

const menus = {
  primary: [
    createMenu('/', 'Home', 'home'),
    createMenu('/about', 'About', 'rocket'),
    createMenu('/list', 'Users', 'team', LOGGED),
  ],
  header: [
    createMenu('/register', 'Register', 'user', GUEST),
    createMenu('/login', 'Login', 'login', GUEST),
    createComponent(() => HeaderUser, LOGGED),
  ],
};

export default menus;
