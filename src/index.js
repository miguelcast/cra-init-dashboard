import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import esEs from 'antd/lib/locale-provider/es_ES';
import './styles/index.css';
import Layout from './pages/Layout';
import store from './state/store';
import registerServiceWorker from './registerServiceWorker';

const App = () => {
  return (
    <LocaleProvider locale={esEs}>
      <Provider store={store}>
        <Router>
          <Layout />
        </Router>
      </Provider>
    </LocaleProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
