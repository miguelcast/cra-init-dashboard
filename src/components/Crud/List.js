import React, { Fragment } from 'react';
import { Table, Button, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { Title } from '../Shared';

const List = ({ title, columns, dataSource, addButton, onAction, ...rest }) => (
  <Fragment>
    <Row type="flex" align="middle" justify="space-between">
      <Col>
        <Title text={title} />
      </Col>
      <Col>
        {addButton && (
          <Button
            onClick={onAction}
            type="primary"
            icon={addButton.icon}
            size="large">
            {addButton.text}
          </Button>
        )}{' '}
        <Button type="primary" ghost icon="ellipsis" size="large" />
      </Col>
    </Row>
    <Table
      columns={columns}
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
  addButton: PropTypes.shape({
    text: PropTypes.string,
    icon: PropTypes.string,
  }),
  onAction: PropTypes.func,
};

List.defaultProps = {
  dataSource: [],
};

export default List;
