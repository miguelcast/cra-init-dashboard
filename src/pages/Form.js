import React from 'react';
import PropTypes from 'prop-types';
import { Form as FormCrud, useCrudForm } from '../components/Crud';
import userConfig from '../config/cruds/user';

const Form = ({ match }) => {
  const { fields, onSubmit, loading } = useCrudForm(
    userConfig,
    match.params.id || null,
  );
  return (
    <FormCrud
      title="Add new user"
      fields={fields}
      submit={onSubmit}
      loading={loading}
      rowKey={userConfig.keyName}
    />
  );
};

Form.propTypes = {
  match: PropTypes.object,
};

export default Form;
