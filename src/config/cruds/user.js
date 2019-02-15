const user = {
  keyName: 'key',
  getList: '/users.json',
  getByKey: 'user.json',
  post: '/postUser.json',
  delete: '/deleteUser.json',
  fields: [
    {
      title: 'Name',
      key: 'name',
      sorter: true,
      type: 'string',
      rules: [
        { required: true, message: 'Is required!' },
        { type: 'string', message: 'Should be string!' },
        { max: 50, message: 'Max 50 characters!' },
      ],
    },
    {
      title: 'Age',
      key: 'age',
      sorter: true,
      type: 'number',
      columnStyle: {
        align: 'right',
        width: 80,
      },
      rules: [{ type: 'integer', message: 'Should be integer!' }],
    },
    {
      title: 'Address',
      key: 'address',
      sorter: true,
      type: 'string',
      rules: [{ max: 150, message: 'Max 150 characters!' }],
    },
    {
      title: 'Gender',
      key: 'gender',
      sorter: true,
      type: 'radio',
      options: {
        male: 'Male',
        female: 'Female',
      },
      rules: [{ required: true, message: 'Is required!' }],
    },
    {
      title: 'Status',
      key: 'status',
      sorter: true,
      type: 'bool',
      initialValue: true,
      render: (text, record) => (record.status ? 'Active' : 'Inactive'),
    },
  ],
};

export default user;
