import React from 'react';
import PropTypes from 'prop-types';
import { List as ListCrud, useCrudList } from '../components/Crud';
import userConfig from '../config/cruds/user';

const List = props => {
  const { history } = props;
  const { columns, dataSource, onDelete, loading } = useCrudList(userConfig);
  return (
    <ListCrud
      title="Users"
      columns={columns}
      dataSource={dataSource}
      addButtons={[
        {
          text: 'Add User',
          icon: 'user-add',
          onClick: () => history.push('/form'),
        },
      ]}
      addActions={[
        {
          text: 'Edit',
          icon: 'edit',
          onClick: record =>
            history.push(`/form/${record[userConfig.keyName]}`),
        },
        {
          text: 'Delete',
          icon: 'delete',
          confirm: 'Are you sure?',
          onClick: record => onDelete(record[userConfig.keyName]),
        },
      ]}
      loading={loading}
    />
  );
};

List.propTypes = {
  history: PropTypes.object,
};

export default List;
