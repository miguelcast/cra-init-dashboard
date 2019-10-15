import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Layout, Drawer, Spin } from 'antd';
import { GUEST, LOGGED } from '../config/constants';
import routes from '../config/routes';
import { MenuPrimary, Logo, Header } from '../components/Layout';
import { useAuthenticated } from '../components/Auth';
import PageNotFound404 from './404';

const { Footer, Content, Sider } = Layout;

const Routes = () => {
  const { isAuthenticated } = useAuthenticated();
  return (
    <Suspense fallback={<Spin size="large" className="custom-layout-spin" />}>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.index}
            exact={route.exact ? route.exact : false}
            path={route.path}
            render={props =>
              route.when === undefined ||
              route.when === null ||
              (isAuthenticated === false && route.when === GUEST) ||
              (isAuthenticated === true && route.when === LOGGED) ? (
                React.createElement(route.component, props, null)
              ) : (
                <Redirect to="/" />
              )
            }
          />
        ))}
        <Route component={PageNotFound404} />
      </Switch>
    </Suspense>
  );
};

const Document = props => {
  const {
    location: { pathname },
  } = props;

  const [visible, setVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <Layout className="custom-layout">
      <Sider
        width={250}
        breakpoint="md"
        collapsedWidth="0"
        collapsed={isCollapsed}
        onCollapse={toggleCollapse}
        className="custom-layout-sider">
        <Logo />
        <strong className="custom-menu-title">Dashboard</strong>
        <MenuPrimary pathname={pathname} />
      </Sider>
      <Drawer
        title={<Logo />}
        placement="left"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0, margin: 0 }}>
        <MenuPrimary pathname={pathname} onClick={onClose} />
      </Drawer>
      <Layout style={{ marginLeft: isCollapsed ? 0 : 250 }}>
        <Header
          pathname={pathname}
          isCollapsed={isCollapsed}
          showDrawer={showDrawer}
          drawerVisible={visible}
        />
        <Content className="custom-layout-content">
          <Routes />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

Document.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Document);
