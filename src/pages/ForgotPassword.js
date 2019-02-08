import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { Title } from '../components/Shared';

const FormItem = Form.Item;

const ForgotPassword = ({ form, history }) => {
  const { getFieldDecorator } = form;

  function onSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  return (
    <Form onSubmit={onSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <Title text="Forgot password" />
      <span>
        Please, input your email address associated with the application.
      </span>
      <FormItem label="Email">
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: 'Please input your email address!' },
            { type: 'email', message: 'Invalid email address' },
          ],
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            size="large"
          />,
        )}
      </FormItem>
      <FormItem>
        <Button
          style={{ width: '100%' }}
          type="primary"
          size="large"
          htmlType="submit">
          Send
        </Button>
      </FormItem>
      <FormItem>
        <Button onClick={history.goBack} style={{ width: '100%' }} size="large">
          Return
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
