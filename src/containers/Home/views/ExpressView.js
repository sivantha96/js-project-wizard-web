import React, { useState, useEffect, memo } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { DB_TYPES_ARRAY } from '../constants';

const ExpressView = ({ onChange }) => {
  const [dataBaseType, setDataBaseType] = useState('none');

  const [dataBaseNameInfo, setDataBaseNameInfo] = useState({
    value: '',
    error: null,
  });

  useEffect(() => {
    const isValid = !dataBaseNameInfo.error;
    onChange({
      isValid,
      dataBaseType,
      dataBaseName: dataBaseNameInfo.value,
    });
  }, [dataBaseType, dataBaseNameInfo, onChange]);

  const onChangeDataBaseTypeHandler = (e, { value }) => {
    setDataBaseType(value);
  };

  const onChangeDataBaseNameHandler = (e, { value }) => {
    setDataBaseNameInfo({
      value,
      error: value ? null : 'Database name is required',
    });
  };

  return (
    <>
      <Form.Group widths="equal">
        <Form.Select
          fluid
          label="Database"
          options={DB_TYPES_ARRAY}
          value={dataBaseType}
          onChange={onChangeDataBaseTypeHandler}
        />
        <Form.Input
          disabled={dataBaseType === 'none'}
          fluid
          label="Database Name"
          placeholder="express-app-db"
          value={dataBaseNameInfo.value}
          onChange={onChangeDataBaseNameHandler}
          error={
            dataBaseNameInfo.error
              ? {
                  content: dataBaseNameInfo.error,
                  pointing: 'above',
                }
              : false
          }
        />
      </Form.Group>
    </>
  );
};

ExpressView.propTypes = {
  onChange: PropTypes.func,
};

export default memo(ExpressView);
