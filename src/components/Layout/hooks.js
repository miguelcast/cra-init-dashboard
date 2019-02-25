import { useState, useEffect } from 'react';
import { useAuthenticated } from '../Auth';
import { GUEST, LOGGED } from '../../config/constants';
import myMenus from '../../config/menus';

export function useMenu(position) {
  const isAuth = useAuthenticated();
  const [menus, setMenus] = useState(myMenus[position]);

  useEffect(() => {
    setMenus(
      myMenus[position].filter(menu => {
        return (
          menu.when === undefined ||
          (isAuth === false && menu.when === GUEST) ||
          (isAuth === true && menu.when === LOGGED)
        );
      }),
    );
  }, [isAuth]);

  return menus;
}
