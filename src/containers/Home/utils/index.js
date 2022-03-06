import { PROJECT_TYPES, REGEX_CAMEL_CASE, REGEX_DASH_CASE } from '../constants';

export const getNameError = (name, projectType) => {
  if (!name) {
    return 'Project name is required';
  }

  // Camel Case
  if (projectType === PROJECT_TYPES.REACT_NATIVE) {
    const isValid = REGEX_CAMEL_CASE.test(name);
    if (!isValid) {
      return 'Project name should be in valid Camel Case format. eg: ProjectName';
    } else {
      return null;
    }
  }

  // Dash Case
  const isValid = REGEX_DASH_CASE.test(name);
  if (!isValid) {
    return 'Project name should be in valid Dash Case format. eg: project-name';
  } else {
    return null;
  }
};

export const getProjectNamePlaceholder = (projectType) => {
  if (projectType === PROJECT_TYPES.REACT_NATIVE) {
    return 'MyAwesomeApp';
  }
  return 'my-awesome-app';
};
