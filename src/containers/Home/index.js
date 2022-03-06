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
import { generateRandomId } from '../../utils';
import { PROJECT_TYPES, PROJECT_TYPES_ARRAY } from './constants';
import ProjectDetailsView from './views/ProjectDetailsView';
import ExpressView from './views/ExpressView';
import RNView from './views/RNView';
import { getExpressScriptFile, getRNScriptFile } from '../../services';

function Home() {
  const [type, setType] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    isValid: false,
    name: '',
    author: '',
    description: '',
  });

  const [expressDetails, setExpressDetails] = useState({
    isValid: false,
    dataBaseType: 'none',
    dataBaseName: '',
  });

  const [rnDetails, setRNDetails] = useState({
    isValid: false,
    hasReactNavigation: false,
    hasRedux: false,
  });

  const [fileName, setFileName] = useState(null);

  const buttonClickHandler = () => {
    if (!projectDetails.isValid) {
      return;
    }
    setLoading(true);

    let data;
    switch (type) {
      case PROJECT_TYPES.EXPRESS:
        if (!expressDetails.isValid) {
          return;
        }

        data = {
          name: projectDetails.name,
          author: projectDetails.author,
          description: projectDetails.description,
          dbType: expressDetails.dataBaseType,
          dbName: expressDetails.dataBaseName,
        };
        getExpressScriptFile(data)
          .then((mainFile) => {
            downloadFile(mainFile);
            setType(null);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
        break;

      case PROJECT_TYPES.REACT_NATIVE:
        if (!rnDetails.isValid) {
          return;
        }

        data = {
          name: projectDetails.name,
          author: projectDetails.author,
          description: projectDetails.description,
          hasReactNavigation: rnDetails.hasReactNavigation,
          hasRedux: rnDetails.hasRedux,
        };
        getRNScriptFile(data)
          .then((mainFile) => {
            downloadFile(mainFile);
            setType(null);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
        break;

      default:
        setLoading(false);
        break;
    }
  };

  const downloadFile = (file) => {
    const tempFileName = generateRandomId(6);
    setFileName(tempFileName);
    const element = document.createElement('a');
    element.href = window.URL.createObjectURL(new Blob([file]));
    element.download = `${tempFileName}.js`;
    document.body.appendChild(element);
    element.click();
  };

  const onChangeProjectTypeHandler = (e, { value }) => {
    setFileName(null);
    setType(value);
  };

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
              options={PROJECT_TYPES_ARRAY}
              value={type}
              onChange={onChangeProjectTypeHandler}
            />
            {type && (
              <>
                <ProjectDetailsView
                  projectType={type}
                  onChange={setProjectDetails}
                />
                {type === PROJECT_TYPES.EXPRESS ? (
                  <ExpressView onChange={setExpressDetails} />
                ) : (
                  <RNView onChange={setRNDetails} />
                )}
                <Form.Button className="my-3" primary>
                  Generate Project
                </Form.Button>
              </>
            )}
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
