import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import instance from '../../services/instance';
import { sortNumber, sortString, sortBool } from '../../utils/general';
import SearchTableFilter from './SearchTableFilter';
import DateTableFilter from './DateTableFilter';

const typeSorter = {
  string: sortString,
  number: sortNumber,
  bool: sortBool,
};

const resolveRender = field => {
  if (field.type === 'radio' && !field.render) {
    field.render = text => field.options[text];
  } else if (field.type === 'bool' && !field.render) {
    field.render = (text, record) =>
      record[field.key] ? field.options['true'] : field.options['false'];
  }
  return field.render;
};

const FilterIcon = filtered => (
  <Icon
    type="search"
    style={{
      color: filtered ? 'white' : 'black',
      background: filtered ? '#1890ff' : undefined,
    }}
  />
);

FilterIcon.propTypes = {
  filtered: PropTypes.bool,
};

const resolveFilter = field => {
  if (field.filter === true) {
    switch (field.type) {
      case 'date':
      case 'number':
      case 'string': {
        return {
          filterDropdown:
            field.type === 'date' ? DateTableFilter : SearchTableFilter,
          filterIcon: FilterIcon,
          onFilter: (value, record) =>
            record[field.key]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
        };
      }
      case 'radio': {
        const keysOptions = Object.keys(field.options);
        return {
          filters: keysOptions.map(value => ({
            value,
            text: field.options[value],
          })),
          filterMultiple: keysOptions.length > 2,
          onFilter: (value, record) => record[field.key].indexOf(value) === 0,
        };
      }
      case 'bool': {
        const keysOptions = Object.keys(field.options);
        return {
          filters: keysOptions.map(value => ({
            value,
            text: field.options[value],
          })),
          filterMultiple: false,
          onFilter: (value, record) => record[field.key].toString() === value,
        };
      }
      default: {
        return {};
      }
    }
  }
  return undefined;
};

const fieldsToColumns = fields => {
  return fields.map(field => ({
    title: field.title || '',
    key: field.key,
    dataIndex: field.key,
    sorter:
      field.sorter !== true
        ? false
        : typeSorter[field.type]
        ? typeSorter[field.type](field.key)
        : typeSorter.string(field.key),
    render: resolveRender(field),
    ...(field.columnStyle || {}),
    ...(resolveFilter(field) || {}),
  }));
};

export function useCrudList(conf) {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => fieldsToColumns(conf.fields), [conf.fields]);

  useEffect(() => {
    setLoading(true);
    instance
      .get(conf.getList)
      .then(response => {
        setLoading(false);
        setDataSource(response.data);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  }, [conf.getList]);

  const onDelete = key => {
    setLoading(true);
    instance
      .delete(conf.delete, { params: { [conf.keyName]: key } })
      .then(response => {
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };

  return { columns, dataSource, onDelete, loading };
}

export function useCrudForm(conf, key) {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(conf.fields);

  useEffect(() => {
    if (key) {
      setLoading(true);
      instance
        .get(`${conf.getByKey}/${key}`, {
          params: { [conf.keyName || 'key']: key },
        })
        .then(response => {
          setLoading(false);
          setFields(
            fields.map(field => ({
              ...field,
              value: response.data[field.key],
            })),
          );
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [conf.getByKey, conf.keyName, fields, key]);

  const onSubmit = values => {
    setLoading(true);
    instance
      .post(conf.post, { ...values, [conf.keyName || 'key']: key || undefined })
      .then(response => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return { fields, onSubmit, loading };
}
