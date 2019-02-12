const user = {
  get: '/users.json',
  post: '/postUser.json',
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
      title: 'Status',
      key: 'status',
      sorter: true,
      type: 'bool',
      default: true,
      render: (text, record) => (record.status ? 'Active' : 'Inactive'),
    },
  ],
};

export default user;
