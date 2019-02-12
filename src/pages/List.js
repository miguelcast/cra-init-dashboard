import React from 'react';
import PropTypes from 'prop-types';
import { List as ListCrud, useCrudList } from '../components/Crud';
import userConfig from '../config/cruds/user';

const List = props => {
  const { history } = props;
  const { columns, dataSource, loading } = useCrudList(userConfig);
  return (
    <ListCrud
      title="Users"
      columns={columns}
      dataSource={dataSource}
      addButton={{ text: 'Add User', icon: 'user-add' }}
      loading={loading}
      onAction={() => history.push('/form')}
    />
  );
};

List.propTypes = {
  history: PropTypes.object,
};

export default List;
