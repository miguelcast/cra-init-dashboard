/**
 * List of Ant design locales
 * https://ant.design/docs/react/i18n
 */
import { LANGUAGES } from '../constants';

export default (language = LANGUAGES.default) => {
  switch (language) {
    case LANGUAGES.es: {
      return require('antd/lib/locale-provider/es_ES').default;
    }
    default:
    case LANGUAGES.en: {
      return require('antd/lib/locale-provider/en_US').default;
    }
  }
};
