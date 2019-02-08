import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout, Drawer, Spin } from 'antd';
import routes from '../config/routes';
import { MenuPrimary, Logo, Header } from '../components/Layout';

const { Footer, Content, Sider } = Layout;

const Routes = () => (
  <Suspense
    fallback={
      <Spin
        spinning={true}
        delay={1 * 800}
        style={{ width: '100%', minHeight: 300 }}
      />
    }>
    <Switch>
      {routes.map(route => (
        <Route
          key={route.index}
          exact={route.exact ? route.exact : false}
          path={route.path}
          component={props => React.createElement(route.component, props, null)}
        />
      ))}
    </Switch>
  </Suspense>
);

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
    <Layout>
      <Sider
        width={250}
        breakpoint="md"
        collapsedWidth="0"
        collapsed={isCollapsed}
        onCollapse={toggleCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
        }}>
        <Logo />
        <strong
          style={{ padding: '0.8rem 0 1rem 1.5rem', display: 'inline-block' }}>
          Dashboard
        </strong>
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
        <Content
          style={{
            padding: '1rem',
            minHeight: 'calc(100vh - 64px - 69px)',
          }}>
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
