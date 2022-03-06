export const PROJECT_TYPES = {
  REACT_NATIVE: 'rn',
  EXPRESS: 'express',
};

export const DB_TYPES = {
  NONE: 'none',
  MONGO_DB: 'mongo',
};

export const PROJECT_TYPES_ARRAY = [
  {
    key: PROJECT_TYPES.EXPRESS,
    text: 'Express',
    value: PROJECT_TYPES.EXPRESS,
  },
  {
    key: PROJECT_TYPES.REACT_NATIVE,
    text: 'React Native',
    value: PROJECT_TYPES.REACT_NATIVE,
  },
];

export const DB_TYPES_ARRAY = [
  {
    key: DB_TYPES.NONE,
    text: 'None',
    value: DB_TYPES.NONE,
  },
  {
    key: DB_TYPES.MONGO_DB,
    text: 'MongoDB',
    value: DB_TYPES.MONGO_DB,
  },
];

export const REGEX_CAMEL_CASE = /^[A-Z][a-zA-Z]*$/;
export const REGEX_DASH_CASE = /^[a-zA-Z-]*$/;
