import React, { useState } from 'react';
import './index.css';
import logo from '../../assets/images/logo.svg';
import {
  Header,
  Container,
  Button,
  Form,
  Segment,
  Icon,
  Popup,
} from 'semantic-ui-react';
import getExpressScriptFile from '../../scripts/express';
import { generateRandomId } from '../../utils';

function Home() {
  const [type, setType] = useState('express');
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const [fileName, setFileName] = useState(null);

  const buttonClickHandler = () => {
    setFileName(null);
    setNameError(false);
    setAuthorError(false);
    setDescriptionError(false);

    if (!name) {
      setNameError(true);
    }
    if (!author) {
      setAuthorError(true);
    }
    if (!description) {
      setDescriptionError(true);
    }

    if (nameError || authorError || descriptionError) {
      return null;
    }

    setLoading(true);
    getExpressScriptFile(name, description, author)
      .then((mainFile) => {
        const tempFileName = generateRandomId(6);
        setFileName(tempFileName);
        const element = document.createElement('a');
        element.href = window.URL.createObjectURL(new Blob([mainFile]));
        element.download = `${tempFileName}.js`;
        document.body.appendChild(element);
        element.click();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const projectTypes = [{ key: 'express', text: 'Express', value: 'express' }];

  return (
    <div className="container">
      <header className="header">
        <Header as="h2" image={logo} content="JS Project Wizard" />
      </header>
      <div className="left-content"></div>
      <main className="content">
        <Container>
          <Form onSubmit={buttonClickHandler} loading={isLoading}>
            <Form.Select
              fluid
              label="Project Type"
              options={projectTypes}
              value={type}
              onChange={(e, { value }) => {
                setType(value);
              }}
            />
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Project Name"
                placeholder="express-app"
                value={name}
                onChange={(e, { value }) => {
                  setName(value);
                }}
                error={
                  nameError
                    ? {
                        content: 'Please enter a project name',
                        pointing: 'above',
                      }
                    : false
                }
              />
              <Form.Input
                fluid
                label="Author"
                placeholder="John Doe"
                value={author}
                onChange={(e, { value }) => {
                  setAuthor(value);
                }}
                error={
                  authorError
                    ? {
                        content: 'Please enter the author name',
                        pointing: 'above',
                      }
                    : false
                }
              />
            </Form.Group>
            <Form.TextArea
              label="Project Description"
              placeholder="Add a brief description about your project"
              value={description}
              onChange={(e, { value }) => {
                setDescription(value);
              }}
              error={
                descriptionError
                  ? {
                      content: 'Please enter a description',
                      pointing: 'above',
                    }
                  : false
              }
            />
            <Form.Button className="my-3" primary>
              Generate Project
            </Form.Button>
          </Form>
          {fileName && (
            <>
              <Header as="h5" color={'green'}>
                Generation complete. Create a new folder, move the downloaded
                file into the folder and run the following command on a terminal
                inside of that folder
              </Header>

              <Segment
                className="flex justify-between items-center mt-3 font-mono"
                inverted
              >
                npm i async && node {fileName}.js
                <Popup
                  content="Copied!"
                  on="click"
                  pinned
                  trigger={
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `npm i async && node ${fileName}.js`
                        );
                      }}
                      icon
                    >
                      <Icon name="copy" />
                    </Button>
                  }
                />
              </Segment>
            </>
          )}
        </Container>
      </main>
      <div className="right-content"></div>
      <footer className="footer"></footer>
    </div>
  );
}

export default Home;
