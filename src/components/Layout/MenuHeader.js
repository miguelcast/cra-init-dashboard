import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import menuItems from '../../config/routes';

const MenuHeader = ({ pathname, isCollapse, ...rest }) => (
  <Menu
    mode="horizontal"
    selectedKeys={[pathname || '/']}
    style={{ height: 64, marginTop: isCollapse ? '-3px' : 0 }}
    {...rest}>
    {menuItems
      .filter(item => item.menu === 'header')
      .map(item => (
        <Menu.Item key={item.path} style={{ height: 64, paddingTop: 8 }}>
          <Link to={item.path}>
            {item.icon && (
              <Icon
                type={item.icon}
                style={{ fontSize: '1.2rem', verticalAlign: 'middle' }}
              />
            )}
            <span className="nav-text" style={{ verticalAlign: 'middle' }}>
              {item.title}
            </span>
          </Link>
        </Menu.Item>
      ))}
  </Menu>
);

MenuHeader.propTypes = {
  pathname: PropTypes.string,
  isCollapse: PropTypes.bool,
};

export default MenuHeader;
