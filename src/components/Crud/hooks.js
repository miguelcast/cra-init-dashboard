import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import axios from 'axios';
import moment from 'moment';
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
  if ((field.type === 'radio' || field.type === 'select') && !field.render) {
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
      case 'select':
      case 'string': {
        return {
          filterDropdown:
            field.type === 'date' ? DateTableFilter : SearchTableFilter,
          filterIcon: FilterIcon,
          onFilter: (value, record) =>
            record[field.key] &&
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

const validateDependency = (
  field,
  allValues,
  keys = Object.keys(allValues),
) => {
  if (
    field.dependencies &&
    field.dependencies.fields.filter(dependency => keys.includes(dependency))
      .length > 0
  ) {
    return keys.reduce(
      (allHaveValues, current) => allHaveValues && !allValues[current],
      true,
    );
  }
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
    async function init() {
      try {
        setLoading(true);
        let valuesFields = {};
        const promises = { all: [], keys: {} };
        let i = 0;
        fields.forEach(field => {
          if (
            field.configOptions &&
            typeof field.configOptions.url === 'string'
          ) {
            const { url, method = 'get' } = field.configOptions;
            promises.all.push(instance[method](url));
            promises.keys[field.key] = i;
            i += 1;
          }
        });

        const responses = await axios.all(promises.all);

        if (key) {
          const response = await instance.get(`${conf.getByKey}/${key}`, {
            params: { [conf.keyName || 'key']: key },
          });
          fields.forEach(field => {
            if (response.data[field.key]) {
              valuesFields[field.key] = {
                value:
                  field.type === 'date'
                    ? moment(response.data[field.key])
                    : response.data[field.key],
                disabled:
                  validateDependency(field, response.data) ||
                  field.enabled ||
                  false,
              };
            }
          });
        }

        setFields(
          fields.map(field => {
            const options =
              promises.keys[field.key] >= 0
                ? (responses[promises.keys[field.key]] &&
                    responses[promises.keys[field.key]].data.reduce(
                      (items, item) => ({
                        ...items,
                        ...field.configOptions.map(item),
                      }),
                      {},
                    )) ||
                  {}
                : field.options || {};

            return {
              ...field,
              ...(valuesFields[field.key] || {}),
              options,
            };
          }),
        );
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    init();
    // eslint-disable-next-line
  }, [key]);

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

  const onValuesChanged = (props, changedValues, allValues) => {
    const keys = Object.keys(changedValues);
    setFields(
      fields.map(field => {
        return {
          ...field,
          disabled:
            validateDependency(field, allValues, keys) ||
            field.enabled ||
            false,
          value: allValues[field.key],
        };
      }),
    );
  };

  return { fields, onSubmit, loading, onValuesChanged };
}
