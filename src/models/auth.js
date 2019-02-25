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
  },
};

export default auth;
