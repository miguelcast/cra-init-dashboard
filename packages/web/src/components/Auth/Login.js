import { Button, Form, Icon, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Title } from '../Shared';

function Login(props) {
  const { loading } = props;
  const { getFieldDecorator } = props.form;
  const { t } = useTranslation();
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.authentication(values.userName, values.password);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="custom-form-login">
      <Title text={t('login.title')} />
      <Form.Item>
        {getFieldDecorator('userName', {
          rules: [
            { required: true, message: t('common.usernameRequired') },
            { type: 'email', message: t('common.invalidEmail') },
          ],
        })(
          <Input
            prefix={<Icon type="user" className="custom-prefix-icon" />}
            placeholder={t('common.email')}
            size="large"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: t('common.passwordRequired') }],
        })(
          <Input
            prefix={<Icon type="lock" className="custom-prefix-icon" />}
            type="password"
            size="large"
            placeholder={t('common.password')}
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Link to="/forgotPassword" className="custom-forgot-link">
          {t('login.forgotPassword')}
        </Link>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
          className="custom-button">
          {t('login.login')}
        </Button>
        {t('common.or')} <Link to="/register">{t('login.registerNow')}</Link>
      </Form.Item>
    </Form>
  );
}

const formShape = {
  validateFields: PropTypes.func,
  getFieldDecorator: PropTypes.func,
};

Login.propTypes = {
  form: PropTypes.shape(formShape).isRequired,
  loading: PropTypes.bool,
  authentication: PropTypes.func,
};

export default Form.create({ name: 'normal_login' })(Login);
