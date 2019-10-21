import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './screens/start/Login';
import SelectCourse from './screens/start/SelectCourse';
import GroupStatus from './screens/student/GroupStatus';


export const MainRouter = () => (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/selectcourse' component={SelectCourse} />
          
        </Switch>
        <Switch>
          <Route exact path='/student/status' component={GroupStatus}/>
        </Switch>
      </Router>
);