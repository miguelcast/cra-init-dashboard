import React from 'react';
import { Input, InputNumber, Switch, Radio, DatePicker, Select } from 'antd';

const getForm = (field, getFieldDecorator) => {
  const globalOptions = {
    initialValue: field.value || field.initialValue || undefined,
  };
  switch (field.type) {
    case 'date': {
      return getFieldDecorator(field.key, {
        ...globalOptions,
        rules: field.rules,
      })(<DatePicker disabled={field.disabled || false} {...field.config} />);
    }
    case 'number': {
      return getFieldDecorator(field.key, {
        ...globalOptions,
        rules: field.rules,
      })(<InputNumber disabled={field.disabled || false} />);
    }
    case 'bool': {
      return getFieldDecorator(field.key, {
        ...globalOptions,
        rules: field.rules,
        valuePropName: 'checked',
        initialValue: field.hasOwnProperty('value')
          ? field.value
          : field.hasOwnProperty('initialValue')
          ? field.initialValue
          : false,
      })(<Switch disabled={field.disabled || false} />);
    }
    case 'radio': {
      return getFieldDecorator(field.key, {
        ...globalOptions,
        rules: field.rules,
      })(
        <Radio.Group disabled={field.disabled || false}>
          {Object.keys(field.options).map(keyOption => (
            <Radio key={keyOption} value={keyOption}>
              {field.options[keyOption]}
            </Radio>
          ))}
        </Radio.Group>,
      );
    }
    case 'select': {
      return getFieldDecorator(field.key, {
        ...globalOptions,
        rules: field.rules,
      })(
        <Select disabled={field.disabled || false}>
          {Object.keys(field.options).map(keyOption => (
            <Select.Option key={keyOption} value={keyOption}>
              {field.options[keyOption]}
            </Select.Option>
          ))}
        </Select>,
      );
    }
    default:
    case 'string': {
      return getFieldDecorator(field.key, {
        ...globalOptions,
        rules: field.rules,
      })(<Input disabled={field.disabled || false} />);
    }
  }
};

export default getForm;
