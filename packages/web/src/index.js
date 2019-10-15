import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useTranslation } from 'react-i18next';
import { ProviderEasyCrud } from "react-easy-crud";
import Layout from './pages/Layout';
import store from './config/store';
import client from './services/instance';
import getLocalesAntd from './config/localization/antdLocale';
import * as registerServiceWorker from './registerServiceWorker';
import './styles/index.less';
import './config/localization/i18n';

const persistor = getPersistor();

const AppSuspense = () => (
  <Suspense fallback={<Spin size="large" className="custom-layout-spin" />}>
    <App />
  </Suspense>
);

const App = () => {
  const { i18n } = useTranslation();
  return (
    <ConfigProvider locale={getLocalesAntd(i18n.language)}>
      <ProviderEasyCrud client={client} type='rest'>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Router>
              <Layout />
            </Router>
          </PersistGate>
        </Provider>
      </ProviderEasyCrud>
    </ConfigProvider>
  );
};

ReactDOM.render(<AppSuspense />, document.getElementById('root'));
registerServiceWorker.register();
