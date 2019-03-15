import React, { Fragment } from 'react';
import { Button } from 'antd';
import '../../config/localization/i18n';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../config/constants';

const ChangeLanguage = () => {
  const { t, i18n } = useTranslation();
  return (
    <Fragment>
      <Button
        htmlType="button"
        type="primary"
        onClick={() => i18n.changeLanguage(LANGUAGES.esES)}>
        {t('common.spanish')}
      </Button>{' '}
      <Button
        htmlType="button"
        type="primary"
        onClick={() => i18n.changeLanguage(LANGUAGES.enUS)}>
        {t('common.english')}
      </Button>{' '}
    </Fragment>
  );
};

export default ChangeLanguage;
