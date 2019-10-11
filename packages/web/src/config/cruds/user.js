const user = {
  keyName: 'key',
  getList: '/users',
  getByKey: '/user',
  post: '/postUser.json',
  delete: '/deleteUser.json',
  fields: [
    {
      title: 'Name',
      key: 'name',
      sorter: true,
      filter: true,
      type: 'string',
      initialValue: 'My Name',
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
      filter: true,
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
      filter: true,
      hidden: ['column', 'form'],
      type: 'string',
      rules: [
        { required: true, message: 'Is required!' },
        { max: 150, message: 'Max 150 characters!' },
      ],
    },
    {
      title: 'Color',
      key: 'color',
      sorter: true,
      filter: true,
      type: 'select',
      options: {
        red: 'Red',
        green: 'Green',
        yellow: 'Yellow',
        black: 'Black',
      },
      rules: [{ required: true, message: 'Is required!' }],
    },
    {
      title: 'Country async load',
      key: 'country',
      columnKey: 'countryName',
      sorter: true,
      filter: true,
      type: 'select',
      options: {},
      configOptions: {
        url: '/countries',
        // { key: text }, mapper with loaded data
        map: item => ({ [item.key]: item.name }),
        // default get, you can use get or post;
        method: 'get',
      },
      dependencies: {
        fields: ['color'],
        onChange: () => ({
          disabled: false,
        }),
      },
      disabled: true,
      rules: [{ required: true, message: 'Is required!' }],
    },
    {
      title: 'Gender',
      key: 'gender',
      type: 'radio',
      sorter: true,
      filter: true,
      options: {
        male: 'Male',
        female: 'Female',
      },
      rules: [{ required: true, message: 'Is required!' }],
    },
    {
      title: 'Birthday',
      key: 'birthday',
      type: 'date',
      sorter: true,
      filter: true,
    },
    {
      title: 'Status',
      key: 'status',
      sorter: true,
      filter: true,
      type: 'bool',
      initialValue: true,
      options: {
        true: 'Active',
        false: 'Inactive',
      },
    },
  ],
};

export default user;
