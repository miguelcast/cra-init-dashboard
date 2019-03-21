import axios from 'axios';
import i18next from 'i18next';
import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import XHR from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import {
  LANGUAGES,
  URL_LOCALIZATION,
  TIME_CACHE_LOCALIZATION,
  VERSION_LOCALIZATION,
} from '../constants';

const URL_API_LOCALIZATION =
  process.env.REACT_APP_API_LOCALIZATION || 'http://localhost:3005';

function loadLocales(url, options, callback) {
  axios
    .get(`${url}?v=${options.queryStringParams.v}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      callback(res.data, { status: '200' });
    })
    .catch(err => {
      callback(null, { status: '404', message: err.message });
    });
}

export default i18next
  .use(LngDetector)
  .use(Backend)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: LANGUAGES.default,
      backend: {
        backends: [LocalStorageBackend, XHR],
        backendOptions: [
          {
            expirationTime: TIME_CACHE_LOCALIZATION,
            prefix: 'i18next_res_',
          },
          {
            queryStringParams: { v: VERSION_LOCALIZATION },
            parse: data => data,
            loadPath: `${URL_API_LOCALIZATION}${URL_LOCALIZATION}`,
            ajax: loadLocales,
          },
        ],
      },
      // have a common namespace used around the full app
      ns: 'translation',
      defaultNS: 'translation',
      debug: true,
    },
    (err, t) => {
      if (err) return console.log('something went wrong loading', err);
      t('key'); // -> same as i18next.t
    },
  );
