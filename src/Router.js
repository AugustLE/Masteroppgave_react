import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { StartRouter } from './screens/start/StartRouter';


export const MainRouter = () => (
      <Router>
        <Switch>
          <Route path='/login' component={StartRouter}/>
        </Switch>
      </Router>
);