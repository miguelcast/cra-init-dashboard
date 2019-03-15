import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const NotFound404 = () => {
  const { t } = useTranslation();

  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      style={{ minHeight: 'calc(100vh - 200px)' }}>
      <Col>
        <strong style={{ fontSize: '1.5rem' }}>
          {t('common.pageNotFound')} | 404
        </strong>
      </Col>
    </Row>
  );
};

export default NotFound404;
