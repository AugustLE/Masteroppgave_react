import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './screens/start/Login';
import SelectRole from './screens/start/SelectRole';
import SelectSubject from './screens/start/SelectSubject';
import GroupStatus from './screens/student/GroupStatus';
import Messages from './screens/student/Messages';
import Profile from './screens/student/Profile';
import Overview from './screens/staff/Overview';
import TeamView from './screens/staff/TeamView';
import StaffMessages from './screens/staff/StaffMessages';
import StaffProfile from './screens/staff/StaffProfile';


export const MainRouter = () => (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/selectrole' component={SelectRole} />
          <Route exact path='/selectsubject' component={SelectSubject} />
          
        </Switch>
        <Switch>
          <Route exact path='/student/status' component={GroupStatus}/>
          <Route exact path='/student/messages' component={Messages} />
          <Route exact path='/student/profile' component={Profile} />
        </Switch>
        <Switch>
          <Route exact path='/staff/overview' component={Overview}/>
          <Route exact path='/staff/groups' component={TeamView}/>
          <Route exact path='/staff/messages' component={StaffMessages}/>
          <Route exact path='/staff/profile' component={StaffProfile}/>
        </Switch>
      </Router>
);