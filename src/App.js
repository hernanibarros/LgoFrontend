import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import DepartmentList from './components/DepartmentList';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {
  return (
    <Router>
      <Switch>
        
        <Route path="/" exact component={LoginPage} />
        <Route path="/DepartmentList" exact component={DepartmentList} />
        <Route path="/Layout" exact component={Layout} />
        
      </Switch>
    </Router>
  );
}

export default App;
