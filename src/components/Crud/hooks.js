import { useMemo, useState, useEffect } from 'react';
import instance from '../../api/instance';
import { sortNumber, sortString, sortBool } from '../../utils/general';

const typeSorter = {
  string: sortString,
  number: sortNumber,
  bool: sortBool,
};

const resolveRender = field => {
  if (field.type === 'radio' && !field.render) {
    field.render = text => field.options[text];
  }
  return field.render;
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
  }, []);

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
        .get(conf.getByKey, { params: { [conf.keyName || 'key']: key } })
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
  }, []);

  const onSubmit = values => {
    console.log('Your form', values);
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
