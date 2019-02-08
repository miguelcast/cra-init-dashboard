import React from 'react';
import { Icon, Layout, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import MenuHeader from './MenuHeader';

const Header = ({ pathname, isCollapsed, showDrawer, drawerVisible }) => (
  <Layout.Header
    style={{
      paddingLeft: '1rem',
      paddingRight: '1rem',
      boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
    }}>
    <Row type="flex" align="middle" justify="space-between">
      <Col>
        {isCollapsed && (
          <Icon
            type={drawerVisible ? 'menu-fold' : 'menu-unfold'}
            onClick={showDrawer}
            style={{ fontSize: '1.5rem', marginTop: '1.22rem', color: 'white' }}
          />
        )}
      </Col>
      <Col order={2}>
        <MenuHeader isCollapse={isCollapsed} pathname={pathname} />
      </Col>
    </Row>
  </Layout.Header>
);

Header.propTypes = {
  pathname: PropTypes.string,
  isCollapsed: PropTypes.bool,
  drawerVisible: PropTypes.bool,
  showDrawer: PropTypes.func,
};

Header.defaultProps = {
  isCollapsed: false,
  drawerVisible: false,
};

export default Header;
