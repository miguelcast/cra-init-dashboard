import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Title } from '../Shared';

const formShape = {
  validateFields: PropTypes.func,
  getFieldDecorator: PropTypes.func,
};

class Login extends React.Component {
  static propTypes = {
    form: PropTypes.shape(formShape).isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="custom-form-login">
        <Title text="Login" />
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [
              { required: true, message: 'Please input your username!' },
              { type: 'email', message: 'Invalid email address' },
            ],
          })(
            <Input
              prefix={<Icon type="user" className="custom-prefix-icon" />}
              placeholder="Email"
              size="large"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" className="custom-prefix-icon" />}
              type="password"
              size="large"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link to="/forgotPassword" className="custom-forgot-link">
            Forgot password
          </Link>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="custom-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_login' })(Login);
