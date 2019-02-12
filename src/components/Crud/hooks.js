import { useMemo, useState, useEffect } from 'react';
import instance from '../../api/instance';
import { sortNumber, sortString, sortBool } from '../../utils/general';

const typeSorter = {
  string: sortString,
  number: sortNumber,
  bool: sortBool,
};

const fieldsToColumns = fields => {
  return fields.map(field => ({
    title: field.title || '',
    key: field.key,
    dataIndex: field.key,
    sorter: field.sorter === true ? typeSorter[field.type](field.key) : false,
    render: field.render,
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
      .get(conf.get)
      .then(response => {
        setLoading(false);
        setDataSource(response.data);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  return { columns, dataSource, loading };
}

export function useCrudForm(conf) {
  const [loading, setLoading] = useState(false);

  const onSubmit = values => {
    setLoading(true);
    instance
      .post(conf.post, values)
      .then(response => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return { fields: conf.fields, onSubmit, loading };
}
