import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMenu } from './hooks';

const MenuPrimary = ({ pathname, ...rest }) => {
  const menus = useMenu('primary');
  return (
    <Menu mode="inline" selectedKeys={[pathname || '/']} {...rest}>
      {menus.map(
        item =>
          item.path && (
            <Menu.Item key={item.path}>
              <Link to={item.path}>
                {item.icon && (
                  <Icon type={item.icon} style={{ fontSize: '1.2rem' }} />
                )}
                <span className="nav-text">{item.title}</span>
              </Link>
            </Menu.Item>
          ),
      )}
      {menus.map(
        ({ component, index }) =>
          component && React.createElement(component(), { key: index }, null),
      )}
    </Menu>
  );
};

MenuPrimary.propTypes = {
  pathname: PropTypes.string,
};

export default MenuPrimary;
