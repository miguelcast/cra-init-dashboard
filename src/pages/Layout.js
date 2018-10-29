import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import routes from '../routes';

const { Header, Footer, Content } = Layout;

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
  <Layout>
    <Header>
      <strong style={{ color: 'white' }}>cra-rr4-redux-antd</strong>
    </Header>
    <Content style={{ padding: 50 }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <Routes />
      </div>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default Document;
