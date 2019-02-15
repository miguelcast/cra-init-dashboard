import React, { Fragment } from 'react';
import { Table, Button, Row, Col, Tooltip, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import { Title } from '../Shared';

const List = ({
  title,
  columns,
  dataSource,
  addButtons,
  addActions,
  ...rest
}) => (
  <Fragment>
    <Row type="flex" align="middle" justify="space-between">
      <Col>
        <Title text={title} />
      </Col>
      <Col>
        {addButtons &&
          addButtons.map((buttonProps, index) => (
            <Fragment key={index}>
              <Button size="large" type="primary" {...buttonProps}>
                {buttonProps.text}
              </Button>{' '}
            </Fragment>
          ))}
      </Col>
    </Row>
    <Table
      columns={[
        ...columns,
        {
          title: 'Actions',
          key: '',
          align: 'right',
          render: (value, record) =>
            addActions.map(action => (
              <Tooltip key={action.icon} title={action.text}>
                {' '}
                {action.confirm ? (
                  <Popconfirm
                    title={action.confirm}
                    placement="bottomRight"
                    onConfirm={() => action.onClick(record)}>
                    <Button type="ghost" shape="circle" icon={action.icon} />
                  </Popconfirm>
                ) : (
                  <Button
                    type="ghost"
                    shape="circle"
                    icon={action.icon}
                    onClick={() => action.onClick(record)}
                  />
                )}
              </Tooltip>
            )),
        },
      ]}
      dataSource={dataSource}
      className="custom-table"
      {...rest}
    />
  </Fragment>
);

List.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array,
  addButtons: PropTypes.array,
  addActions: PropTypes.array,
};

List.defaultProps = {
  dataSource: [],
};

export default List;
