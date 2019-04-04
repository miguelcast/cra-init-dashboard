import React from 'react';
import PropTypes from 'prop-types';
import { Form as FormCrud, useCrudForm } from '../components/Crud';
import userConfig from '../config/cruds/user';

const Form = ({ match }) => {
  const propsForm = useCrudForm(userConfig, match.params.id || null);
  if (match.params.id > 0 && !propsForm.fields[1].hasOwnProperty('value')) {
    return 'Loading...';
  }
  return (
    <FormCrud title="Add new user" rowKey={userConfig.keyName} {...propsForm} />
  );
};

Form.propTypes = {
  match: PropTypes.object,
};

export default Form;
