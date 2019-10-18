import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { SelectCourse } from './SelectCourse';

export const StartRouter = ({ match }) => ( 
    <Router>
        <Switch>
            <Route exact path={`${match.url}/feide`} component={Login}/>
            <Route exact path={`${match.url}/selectcourse`} component={SelectCourse}/>
        </Switch>
    </Router>
);
  