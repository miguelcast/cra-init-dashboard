import React from 'react';
import { Icon, Layout, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import MenuHeader from './MenuHeader';

const Header = ({ pathname, isCollapsed, showDrawer, drawerVisible }) => (
  <Layout.Header className="custom-header">
    <Row type="flex" align="middle" justify="space-between">
      <Col>
        {isCollapsed && (
          <Icon
            type={drawerVisible ? 'menu-fold' : 'menu-unfold'}
            onClick={showDrawer}
            className="custom-header-toggle-icon"
          />
        )}
      </Col>
      <Col span={12} order={2} className="custom-align-right">
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
