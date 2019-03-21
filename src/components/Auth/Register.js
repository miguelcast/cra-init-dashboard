import { Button, Form, Icon, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title } from '../Shared';

const formShape = {
  validateFields: PropTypes.func,
  getFieldDecorator: PropTypes.func,
};

function Register(props) {
  const { getFieldDecorator } = props.form;
  const { t } = useTranslation();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="custom-form-register">
      <Title text={t('register.title')} />
      <Form.Item>
        {getFieldDecorator('userName', {
          rules: [
            { required: true, message: t('common.usernameRequired') },
            { type: 'email', message: t('common.invalidEmail') },
          ],
        })(
          <Input
            prefix={<Icon type="mail" className="custom-prefix-icon" />}
            placeholder={t('common.email')}
            size="large"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: t('register.nameRequired') }],
        })(
          <Input
            prefix={<Icon type="user" className="custom-prefix-icon" />}
            placeholder={t('register.name')}
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
        <Button
          className="custom-button"
          type="primary"
          size="large"
          htmlType="submit">
          {t('register.signIn')}
        </Button>
      </Form.Item>
    </Form>
  );
}

Register.propTypes = {
  form: PropTypes.shape(formShape).isRequired,
};

export default Form.create({ name: 'register' })(Register);
