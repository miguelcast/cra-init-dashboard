import { useState, useEffect } from 'react';
import { useAuthenticated } from '../Auth';
import { GUEST, LOGGED } from '../../config/constants';
import myMenus from '../../config/menus';

export function useMenu(position) {
  const { isAuthenticated } = useAuthenticated();
  const [menus, setMenus] = useState(myMenus[position]);

  useEffect(() => {
    setMenus(
      myMenus[position].filter(menu => {
        return (
          menu.when === undefined ||
          (isAuthenticated === false && menu.when === GUEST) ||
          (isAuthenticated === true && menu.when === LOGGED)
        );
      }),
    );
  }, [isAuthenticated, position]);

  return menus;
}
