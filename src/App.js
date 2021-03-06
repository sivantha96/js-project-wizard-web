import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/js-project-wizard/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
