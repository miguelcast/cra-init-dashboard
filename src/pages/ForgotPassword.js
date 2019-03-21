import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Title } from '../components/Shared';

const FormItem = Form.Item;

const ForgotPassword = ({ form, history }) => {
  const { getFieldDecorator } = form;
  const { t } = useTranslation();

  function onSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  return (
    <Form onSubmit={onSubmit} className="custom-form-forgot">
      <Title text={t('forgotPassword.title')} />
      <span>{t('forgotPassword.description')}</span>
      <FormItem label={t('common.email')}>
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: t('common.emailRequired') },
            { type: 'email', message: t('common.invalidEmail') },
          ],
        })(
          <Input
            prefix={<Icon type="mail" className="custom-prefix-icon" />}
            placeholder={t('common.email')}
            size="large"
          />,
        )}
      </FormItem>
      <FormItem>
        <Button
          className="custom-button"
          type="primary"
          size="large"
          htmlType="submit">
          {t('forgotPassword.send')}
        </Button>
      </FormItem>
      <FormItem>
        <Button
          htmlType="button"
          onClick={history.goBack}
          className="custom-button"
          size="large">
          {t('common.return')}
        </Button>
      </FormItem>
    </Form>
  );
};

ForgotPassword.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Form.create()(ForgotPassword));
