import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './screens/start/Login';
import SelectCourse from './screens/start/SelectCourse';
import GroupStatus from './screens/student/GroupStatus';
import Messages from './screens/student/Messages';
import Profile from './screens/student/Profile';


export const MainRouter = () => (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/selectcourse' component={SelectCourse} />
          
        </Switch>
        <Switch>
          <Route exact path='/student/status' component={GroupStatus}/>
          <Route exact path='/student/messages' component={Messages} />
          <Route exact path='/student/profile' component={Profile} />
        </Switch>
      </Router>
);