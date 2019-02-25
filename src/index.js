import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import './styles/index.css';
import Layout from './pages/Layout';
import store from './config/store';
import getLocalesAntd from './config/locale';
import * as registerServiceWorker from './registerServiceWorker';

const App = () => {
  return (
    <LocaleProvider locale={getLocalesAntd()}>
      <Provider store={store}>
        <Router>
          <Layout />
        </Router>
      </Provider>
    </LocaleProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker.register();
