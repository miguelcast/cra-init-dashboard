<h1 align="center">React Starter Kit Dashboard</h1>

![ScreenShot](./screenshot.png)

#### It uses the following modules:
1. [React](https://reactjs.org) ([Create React App](https://github.com/facebook/create-react-app))
2. [Rematch](https://rematch.gitbooks.io/rematch/content/#getting-started)
3. [React Router v4](https://reacttraining.com/react-router/)
4. [Ant Design](https://ant.design)
5. [Less](http://lesscss.org) for Ant Design customization
6. [Axios](https://github.com/axios/axios)

#### Clone project

```
git clone https://github.com/miguelcast/cra-init-dashboard.git
```

#### Install dependencies:

```
yarn
```
or
```
npm install
```

#### Start project:

```
yarn start
```
or
```
npm start
```

#### Structure folders
```
src
|-- components
|   |-- Auth
|   |   |-- Login.js
|   |   |-- Register.js
|   |   |-- hooks.js
|   |   `-- index.js
|   |-- Crud
|   |   |-- Form.js
|   |   |-- List.js
|   |   |-- SearchTableFilter.js
|   |   |-- hooks.js
|   |   |-- index.js
|   |   `-- typeForms.js
|   |-- Layout
|   |   |-- Header.js
|   |   |-- HeaderUser.js
|   |   |-- Logo.js
|   |   |-- MenuHeader.js
|   |   |-- MenuPrimary.js
|   |   |-- hooks.js
|   |   `-- index.js
|   `-- Shared
|       |-- Title.js
|       `-- index.js
|-- config
|   |-- constants.js
|   |-- cruds
|   |   `-- user.js
|   |-- locale.js
|   |-- menus.js
|   |-- routes.js
|   |-- services.js
|   `-- store.js
|-- img
|   `-- logo.png
|-- index.js
|-- models
|   |-- auth.js
|   |-- home.js
|   `-- index.js
|-- pages
|   |-- 404.js
|   |-- About.js
|   |-- ForgotPassword.js
|   |-- Form.js
|   |-- Home.js
|   |-- Layout.js
|   |-- List.js
|   |-- Login.js
|   `-- Register.js
|-- registerServiceWorker.js
|-- services
|   |-- auth.js
|   `-- instance.js
|-- styles
|   |-- auth.less
|   |-- index.less
|   |-- layout.less
|   |-- table.less
|   `-- title.less
`-- utils
    `-- general.js
```

#### Add news routes

Adding routes, modify src/config/routes.js file:

```javascript
import { LOGGED, GUEST } from './constants';
import Home from './pages/Home';
import Login from './pages/login';
import List from './pages/List';

export default [
  createRoute('/', Home, null, true),
  createRoute('/login', Login, GUEST),
  createRoute('/list', List, LOGGED),
];
```
This example shows you how config you routes using the function createRoute, this function receives a string as the first
parameter with the URL route, the second parameter is a React Component, the third parameter must be a string with a value
of "logged" to show that component when the user is logged in or "guest" when the user is not logged in or null when
both apply, the fourth parameter is a boolean type, which is the same as
"[exact](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md)" in React Router.

Code Splitting:

```javascript
const AsyncAbout = lazy(() => import('../pages/About.js'));

export default [
  createRoute('/about', AsyncAbout),
];
```

#### Menu configuration

Adding menus, modify src/config/menus.js file:

```javascript
const menus = {
  primary: [
    createMenu(
      '/', // (string) URL to navigate (previously configured in the routes )
      'Home', // (string) Title
      'home', // (string) Icon name from https://feathericons.com/
      GUEST // (string "logged" or "guest") The same as explained in the paragraph above
    ),
  ],
  header: [
    createMenu('/register', 'Register', 'user', GUEST),
    createComponent(
      () => HeaderUser, // (function () return ReactElement) Render this component in the menu
      LOGGED // The same as createMenu
    ),
  ],
};
```

#### Customization Ant Design

For custom Ant Design styles, modify src/styles/index.less, the Less variables that you can modify [here.](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

#### API Configuration

Do not import **axios** directly but import the instance of axios from **api/instance.js**.

For Url API config add Key **REACT_APP_API** to .env files.

```
REACT_APP_API=http://localhost/my-api
```

## License

MIT
