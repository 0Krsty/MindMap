import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MindMapEditor from './MindMapEditor';
import Login from './Login';

function MainApp() {
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/mindmap">
            <MindMapEditor apiUrl={API_URL} />
          </Route>
          
          <Route path="/login">
            <Login apiUrl={API_URL} />
          </Route>
          
          <Route path="/">
            <Login apiUrl={API_URL} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default MainApp;