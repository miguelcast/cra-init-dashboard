import { useState, useEffect } from 'react';
import store from '../../config/store';

const getIsAuthStore = () => {
  return store.getState().auth.isAuthenticated;
};

const onChange = (setValue, value) => {
  const isAuthenticated = getIsAuthStore();
  if (value !== isAuthenticated) {
    setValue(isAuthenticated);
  }
};

export function useAuthenticated() {
  const [isAuth, setAuth] = useState(getIsAuthStore());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => onChange(setAuth, isAuth));
    return () => unsubscribe();
  }, []);
  return isAuth;
}
