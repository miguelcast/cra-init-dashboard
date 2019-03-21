import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Title } from '../components/Shared';

const About = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Title text={t('about.title')} />
      <Link to="/">
        <Button htmlType="button" icon="home" type="primary" size="large">
          {t('about.goToHome')}
        </Button>
      </Link>
    </div>
  );
};

export default About;
