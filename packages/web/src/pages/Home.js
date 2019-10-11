import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Title } from '../components/Shared';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Title text={t('home.title')} />
      <Link to="about">
        <Button htmlType="button" type="primary" size="large">
          {t('home.goToAbout')}
        </Button>
      </Link>
    </div>
  );
};

export default Home;
