import React from 'react';
import { Form as FormCrud, useCrudForm } from '../components/Crud';
import userConfig from '../config/cruds/user';

const Form = () => {
  const { fields, onSubmit, loading } = useCrudForm(userConfig);
  return (
    <FormCrud
      title="Add new user"
      fields={fields}
      submit={onSubmit}
      loading={loading}
    />
  );
};

export default Form;
