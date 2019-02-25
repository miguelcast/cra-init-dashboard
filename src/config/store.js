import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import createLoadingPlugin from '@rematch/loading';
import * as models from '../models';

const persistPlugin = createRematchPersist({
  whitelist: ['auth'],
  keyPrefix: '--persist-key-',
  throttle: 5000,
  version: 1,
});

const loadingPlugin = createLoadingPlugin({});

const store = init({
  models,
  plugins: [persistPlugin, loadingPlugin],
});

export default store;
