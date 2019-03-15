import { ChangeLanguage } from '../components/Shared';
import { createMenu, createComponent } from '../utils/general';
import { GUEST, LOGGED } from './constants';
import { HeaderUser } from '../components/Layout';

const menus = {
  primary: [
    createMenu('/', 'menu.home', 'home'),
    createMenu('/about', 'menu.about', 'rocket'),
    createMenu('/list', 'menu.users', 'team', LOGGED),
  ],
  header: [
    createMenu('/register', 'menu.register', 'user', GUEST),
    createMenu('/login', 'menu.login', 'login', GUEST),
    createComponent(() => ChangeLanguage),
    createComponent(() => HeaderUser, LOGGED),
  ],
};

export default menus;
