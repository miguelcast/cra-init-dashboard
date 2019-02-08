import React, { Fragment } from 'react';
import { Table, Card } from 'antd';
import { Title } from '../Shared';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'Daniel',
    age: 12,
    address: '14 Downing Street',
  },
  {
    key: '3',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    align: 'right',
    width: 80,
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
];

const List = () => (
  <Fragment>
    <Title text="List of Crud" />
    <Card bordered={false}>
      <Table columns={columns} dataSource={dataSource} />
    </Card>
  </Fragment>
);

export default List;
