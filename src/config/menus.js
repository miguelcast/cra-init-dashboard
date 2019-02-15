import { createMenu } from '../utils/general';

const menus = {
  primary: [
    createMenu('/', 'Home', 'home'),
    createMenu('/about', 'About', 'rocket'),
    createMenu('/list', 'Users', 'team'),
  ],
  header: [
    createMenu('/register', 'Register', 'user'),
    createMenu('/login', 'Login', 'login'),
  ],
};

export default menus;
