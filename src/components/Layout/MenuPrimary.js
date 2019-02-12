import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import menuItems from '../../config/menus';

const MenuPrimary = ({ pathname, ...rest }) => (
  <Menu mode="inline" selectedKeys={[pathname || '/']} {...rest}>
    {menuItems['primary'].map(item => (
      <Menu.Item key={item.path}>
        <Link to={item.path}>
          {item.icon && (
            <Icon type={item.icon} style={{ fontSize: '1.2rem' }} />
          )}
          <span className="nav-text">{item.title}</span>
        </Link>
      </Menu.Item>
    ))}
  </Menu>
);

MenuPrimary.propTypes = {
  pathname: PropTypes.string,
};

export default MenuPrimary;
