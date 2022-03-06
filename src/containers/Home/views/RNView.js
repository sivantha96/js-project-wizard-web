import React, { useState, useEffect, memo } from 'react';
import { Checkbox, Form, Icon, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const RNView = ({ onChange }) => {
  const [hasReactNavigation, setHasReactNavigation] = useState(false);
  const [hasRedux, setHasRedux] = useState(false);
  const [hasVectorIcons, setHasVectorIcons] = useState(false);

  useEffect(() => {
    onChange({
      isValid: true,
      hasReactNavigation,
      hasRedux,
      hasVectorIcons,
    });
  }, [onChange, hasVectorIcons, hasReactNavigation, hasRedux]);

  return (
    <div>
      <div className="grid grid-cols-2">
        <Form.Field>
          <label>
            {'React Navigation   '}
            <Popup
              on="click"
              content={
                <span>
                  This will include all the basic dependencies for a stack
                  navigator, navigation utility functions, clean project
                  structure the initial configuration recommended by the{' '}
                  <a href="https://reactnavigation.org" target="_blank">
                    Official React Navigation docs
                  </a>
                </span>
              }
              trigger={<Icon className="cursor-pointer" name="info circle" />}
            />
          </label>
        </Form.Field>
        <Checkbox
          toggle
          checked={hasReactNavigation}
          onChange={(e, { checked }) => {
            setHasReactNavigation(checked);
          }}
        />
      </div>

      <div className="grid grid-cols-2 align-center">
        <Form.Field>
          <label>
            {'Redux   '}
            <Popup
              on="click"
              content={
                <span>
                  This will include{' '}
                  <a href="https://www.npmjs.com/package/redux" target="_blank">
                    redux v4.1.2
                  </a>
                  ,{' '}
                  <a
                    href="https://www.npmjs.com/package/react-redux"
                    target="_blank"
                  >
                    react-redux v7.2.6
                  </a>
                  ,{' '}
                  <a
                    href="https://www.npmjs.com/package/redux-saga"
                    target="_blank"
                  >
                    redux-saga v1.1.3
                  </a>
                  , a clean project structure and initial configurations
                </span>
              }
              trigger={<Icon className="cursor-pointer" name="info circle" />}
            />
          </label>
        </Form.Field>
        <Checkbox
          toggle
          checked={hasRedux}
          onChange={(e, { checked }) => {
            setHasRedux(checked);
          }}
        />
      </div>

      <div className="grid grid-cols-2">
        <Form.Field>
          <label>
            {'React Native Vector Icons   '}
            <Popup
              on="click"
              content={
                <span>
                  This will include the{' '}
                  <a
                    href="https://www.npmjs.com/package/react-native-vector-icons"
                    target="_blank"
                  >
                    react-native-vector-icons v9.1.0
                  </a>{' '}
                  package and the configuration to work out of the box
                </span>
              }
              trigger={<Icon className="cursor-pointer" name="info circle" />}
            />
          </label>
        </Form.Field>
        <Checkbox
          toggle
          checked={hasVectorIcons}
          onChange={(e, { checked }) => {
            setHasVectorIcons(checked);
          }}
        />
      </div>
    </div>
  );
};

RNView.propTypes = {
  onChange: PropTypes.func,
};

export default memo(RNView);
