import { Input, InputNumber, Switch, Radio, DatePicker, Select } from 'antd';
import React from 'react';

const getForm = (field, getFieldDecorator) => {
  switch (field.type) {
    case 'date': {
      return getFieldDecorator(field.key, {
        rules: field.rules,
        initialValue: field.initialValue || undefined,
      })(<DatePicker {...field.config} />);
    }
    case 'number': {
      return getFieldDecorator(field.key, {
        rules: field.rules,
        initialValue: field.initialValue || undefined,
      })(<InputNumber />);
    }
    case 'bool': {
      return getFieldDecorator(field.key, {
        rules: field.rules,
        valuePropName: 'checked',
        initialValue: field.hasOwnProperty('value')
          ? field.value
          : field.hasOwnProperty('initialValue')
          ? field.initialValue
          : false,
      })(<Switch />);
    }
    case 'radio': {
      return getFieldDecorator(field.key, {
        rules: field.rules,
        initialValue: field.initialValue || undefined,
      })(
        <Radio.Group>
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
        rules: field.rules,
        initialValue: field.initialValue || undefined,
      })(
        <Select>
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
        rules: field.rules,
        initialValue: field.initialValue || undefined,
      })(<Input />);
    }
  }
};

export default getForm;
