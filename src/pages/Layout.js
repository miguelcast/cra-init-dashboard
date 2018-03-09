import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';

const Routes = () => (
  <Switch>
    {routes.map(route => (
      <Route
        key={route.index}
        exact={route.exact ? route.exact : false}
        path={route.path}
        component={route.component}
      />
    ))}
  </Switch>
);

const Document = () => (
  <Fragment>
    <div>Layout</div>
    <Routes />
  </Fragment>
);

export default Document;
