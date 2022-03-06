import React from 'react';
import { Button, Header, Icon, Popup, Segment } from 'semantic-ui-react';

export const SetupView = ({ heading, code }) => {
  return (
    <div className="content">
      <Header as="h5" color={'green'}>
        {heading}
      </Header>

      <Segment
        className="flex justify-between items-center mt-3 font-mono"
        inverted
      >
        {code}
        <Popup
          content="Copied!"
          on="click"
          pinned
          trigger={
            <Button
              onClick={() => {
                navigator.clipboard.writeText(code);
              }}
              icon
            >
              <Icon name="copy" />
            </Button>
          }
        />
      </Segment>
    </div>
  );
};
