import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMenu } from './hooks';

const MenuHeader = ({ pathname, isCollapse, ...rest }) => {
  const menus = useMenu('header');
  return (
    <Menu
      mode="horizontal"
      selectedKeys={[pathname || '/']}
      style={{ height: 64, marginTop: isCollapse ? '-3px' : 0 }}
      {...rest}>
      {menus.map(item => (
        <Menu.Item key={item.path} className="custom-menu-item-header">
          <Link to={item.path}>
            {item.icon && (
              <Icon type={item.icon} className="custom-menu-header-item-icon" />
            )}
            <span className="nav-text custom-align-middle">{item.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

MenuHeader.propTypes = {
  pathname: PropTypes.string,
  isCollapse: PropTypes.bool,
};

export default MenuHeader;
