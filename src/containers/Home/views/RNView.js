import React, { useState, useEffect, memo } from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const RNView = ({ onChange }) => {
  const [hasReactNavigation, setHasReactNavigation] = useState(false);
  const [hasRedux, setHasRedux] = useState(false);

  useEffect(() => {
    onChange({
      isValid: true,
      hasReactNavigation,
      hasRedux,
    });
  }, [onChange, hasReactNavigation, hasRedux]);

  return (
    <div>
      <div className="grid grid-cols-5">
        <Form.Field>
          <label>React Navigation</label>
        </Form.Field>
        <Checkbox
          toggle
          checked={hasReactNavigation}
          onChange={(e, { checked }) => {
            setHasReactNavigation(checked);
          }}
        />
      </div>

      <div className="grid grid-cols-5">
        <Form.Field>
          <label>Redux</label>
        </Form.Field>
        <Checkbox
          toggle
          checked={hasRedux}
          onChange={(e, { checked }) => {
            setHasRedux(checked);
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
