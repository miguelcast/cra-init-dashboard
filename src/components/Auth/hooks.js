import { useState, useEffect } from 'react';
import store from '../../config/store';

export function useAuthenticated() {
  const [auth, setAuth] = useState(store.getState().auth);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newAuth = store.getState().auth;
      if (auth !== newAuth) {
        setAuth(newAuth);
      }
    });
    return unsubscribe;
  }, []);
  return { ...(auth || {}) };
}
