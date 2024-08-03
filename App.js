import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MindMapEditor from './MindMapEditor';
import Login from './Login';

function ApplicationRouter() {
  const mindMapApiUrl = process.env.REACT_APP_API_URL;

  return (
    <Router>
      <div>
        <Switch>
          {/* Route to the Mind Map Editor Page */}
          <Route path="/mindmap">
            <MindMapEditor apiUrl={mindMapApiUrl} />
          </Route>
          
          {/* Route to the Login Page */}
          <Route path="/login">
            <Login apiUrl={mindMapApiUrl} />
          </Route>
          
          {/* Default Route - Redirects to Login Page */}
          <Route path="/">
            <Login apiUrl={mindMapApiUrl} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default ApplicationRouter;