import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { Title } from '../Shared';

const formShape = {
  validateFields: PropTypes.func,
  getFieldDecorator: PropTypes.func,
};

class Register extends React.Component {
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
      <Form onSubmit={this.handleSubmit} className="custom-form-register">
        <Title text="Register" />
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [
              { required: true, message: 'Please input your username!' },
              { type: 'email', message: 'Invalid email address' },
            ],
          })(
            <Input
              prefix={<Icon type="mail" className="custom-prefix-icon" />}
              placeholder="Email"
              size="large"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input
              prefix={<Icon type="user" className="custom-prefix-icon" />}
              placeholder="Name"
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
          <Button
            className="custom-button"
            type="primary"
            size="large"
            htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'register' })(Register);
