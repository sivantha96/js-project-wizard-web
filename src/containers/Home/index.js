import React, { useState } from 'react';
import './index.css';
import logo from '../../assets/images/logo.svg';
import { Header, Container, Form } from 'semantic-ui-react';
import { generateRandomId } from '../../utils';
import { PROJECT_TYPES, PROJECT_TYPES_ARRAY } from './constants';
import ProjectDetailsView from './views/ProjectDetailsView';
import ExpressView from './views/ExpressView';
import RNView from './views/RNView';
import { getExpressScriptFile, getRNScriptFile } from '../../services';
import { SetupView } from './views/SetupView';

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
    hasVectorIcons: false,
    hasTheming: false,
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
          ...projectDetails,
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
          ...projectDetails,
          ...rnDetails,
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

      <main className="content">
        <Container>
          <SetupView
            heading={
              'If you are here the first time, run the following command before getting started to install the dependencies'
            }
            code={'npm install --prefix $HOME async'}
          />
          <Form
            onSubmit={buttonClickHandler}
            loading={isLoading}
            className="my-10"
          >
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
                <Form.Button
                  className="my-3"
                  primary
                  disabled={
                    type === PROJECT_TYPES.EXPRESS
                      ? !projectDetails.isValid || !expressDetails.isValid
                      : !projectDetails.isValid || !rnDetails.isValid
                  }
                >
                  Generate Project
                </Form.Button>
              </>
            )}
          </Form>
          {fileName && (
            <SetupView
              heading={
                'Generation complete. Move the downloaded file into where you want to initialize the project and run the following command.'
              }
              code={`node ${fileName}.js`}
            />
          )}
        </Container>
      </main>
      <div className="right-content"></div>
      <footer className="footer"></footer>
    </div>
  );
}

export default Home;
