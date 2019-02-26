import instance from '../services/instance';
import { authenticationService } from '../services/auth';

const auth = {
  state: {
    token: null,
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    setAuthenticated: (state, payload) => ({
      ...state,
      ...payload,
      isAuthenticated: !!payload.token,
    }),
    setLogout: () => ({
      token: null,
      user: {},
      isAuthenticated: false,
    }),
  },
  effects: {
    async authentication(credentials) {
      try {
        const promise = await authenticationService(
          credentials.username,
          credentials.password,
        );
        const { user, token } = await promise.data;
        this.setAuthenticated({ user, token });
        instance.setToken(token);
      } catch (e) {
        this.setAuthenticated({ user: {}, token: null });
      }
    },
    logout() {
      instance.removeToken();
      this.setLogout();
    },
  },
};

export default auth;
