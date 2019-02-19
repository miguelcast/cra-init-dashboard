import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Row, Col } from 'antd';

const SearchTableFilter = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  clearFilters,
}) => {
  return (
    <Row gutter={8} className="custom-search-filter">
      <Col span={24} style={{ paddingBottom: 8 }}>
        <Input.Search
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          placeholder="Search"
        />
      </Col>
      <Col span={12} className="custom-align-right">
        <Button type="primary" ghost onClick={() => confirm()}>
          Ok
        </Button>
      </Col>
      <Col span={12}>
        <Button onClick={() => clearFilters()}>Reset</Button>
      </Col>
    </Row>
  );
};

SearchTableFilter.propTypes = {
  selectedKeys: PropTypes.array,
  setSelectedKeys: PropTypes.func,
  confirm: PropTypes.func,
  clearFilters: PropTypes.func,
};

export default SearchTableFilter;
