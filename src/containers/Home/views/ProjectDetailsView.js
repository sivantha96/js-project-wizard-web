import React, { useState, useEffect, memo } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getNameError, getProjectNamePlaceholder } from '../utils';

const ProjectDetailsView = ({ projectType, onChange }) => {
  const [nameInfo, setNameInfo] = useState({
    value: '',
    error: null,
    placeholder: getProjectNamePlaceholder(projectType),
    changed: false,
  });

  const [authorInfo, setAuthorInfo] = useState({
    value: '',
    error: null,
  });

  const [descriptionInfo, setDescriptionInfo] = useState({
    value: '',
    error: null,
  });

  useEffect(() => {
    if (projectType) {
      setNameInfo({
        value: nameInfo.value,
        error: nameInfo.changed
          ? getNameError(nameInfo.value, projectType)
          : null,
        placeholder: getProjectNamePlaceholder(projectType),
        changed: nameInfo.changed,
      });
    } else {
      // resetting
      setNameInfo({
        value: '',
        error: null,
        placeholder: getProjectNamePlaceholder(projectType),
        changed: false,
      });
      setAuthorInfo({
        value: '',
        error: null,
      });
      setDescriptionInfo({
        value: '',
        error: null,
      });
    }
  }, [projectType]);

  useEffect(() => {
    const isValid =
      !nameInfo.error && !authorInfo.error && !descriptionInfo.error;
    onChange({
      isValid,
      name: nameInfo.value,
      author: authorInfo.value,
      description: descriptionInfo.value,
    });
  }, [nameInfo, authorInfo, descriptionInfo, onChange]);

  const onChangeNameHandler = (e, { value }) => {
    setNameInfo({
      value,
      error: nameInfo.changed ? getNameError(value, projectType) : null,
      placeholder: nameInfo.placeholder,
      changed: true,
    });
  };

  const onChangeDescriptionHandler = (e, { value }) => {
    const error = value ? null : 'Project Description is required';
    setDescriptionInfo({ value, error });
  };

  const onChangeAuthorHandler = (e, { value }) => {
    const error = value ? null : 'Author is required';
    setAuthorInfo({ value, error });
  };

  console.log('RENDERED DETAILS VIEW');

  return (
    <>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Project Name"
          placeholder={nameInfo.placeholder}
          value={nameInfo.value}
          onChange={onChangeNameHandler}
          error={
            nameInfo.error
              ? {
                  content: nameInfo.error,
                  pointing: 'above',
                }
              : false
          }
        />
        <Form.Input
          fluid
          label="Author"
          placeholder="John Doe"
          value={authorInfo.value}
          onChange={onChangeAuthorHandler}
          error={
            authorInfo.error
              ? {
                  content: authorInfo.error,
                  pointing: 'above',
                }
              : false
          }
        />
      </Form.Group>
      <Form.TextArea
        label="Project Description"
        placeholder="Add a brief description about your project"
        value={descriptionInfo.value}
        onChange={onChangeDescriptionHandler}
        error={
          descriptionInfo.error
            ? {
                content: descriptionInfo.error,
                pointing: 'above',
              }
            : false
        }
      />
    </>
  );
};
ProjectDetailsView.propTypes = {
  projectType: PropTypes.string,
  onChange: PropTypes.func,
};

export default memo(ProjectDetailsView);
