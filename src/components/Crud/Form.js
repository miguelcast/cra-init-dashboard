import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form as FormAntd, Button, Row, Col } from 'antd';
import { Title } from '../Shared';
import getForm from './typeForms';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

const Form = ({ title, fields, submit, loading, form, history }) => {
  const { getFieldDecorator } = form;

  const onSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        submit(values);
      }
    });
  };

  return (
    <Fragment>
      <Title text={title} />
      <FormAntd onSubmit={onSubmit} layout="horizontal">
        {fields.map(field => (
          <FormAntd.Item
            key={field.key}
            label={field.title}
            {...formItemLayout}>
            {getForm(field, getFieldDecorator)}
          </FormAntd.Item>
        ))}
        <Row gutter={8}>
          <Col
            sm={{ span: 3, offset: 3 }}
            xs={{ span: 24 }}
            className="custom-align-right">
            <Button
              size="large"
              className="custom-full-width"
              onClick={() => history.goBack()}>
              Cancel
            </Button>
          </Col>
          <Col sm={{ span: 3 }} xs={{ span: 24 }}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              loading={loading}
              className="custom-full-width">
              Save
            </Button>
          </Col>
        </Row>
      </FormAntd>
    </Fragment>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  submit: PropTypes.func,
  loading: PropTypes.bool,
  form: PropTypes.object,
  history: PropTypes.object,
};

Form.defaultProps = {
  loading: false,
};

export default withRouter(
  FormAntd.create({
    mapPropsToFields(props) {
      let dataForm = {};
      props.fields.forEach(field => {
        dataForm[field.key] = FormAntd.createFormField(field);
      });
      return dataForm;
    },
  })(Form),
);
