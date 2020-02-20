import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './screens/start/Login';
import SelectSubject from './screens/start/SelectSubject';
import TeamStatus from './screens/student/TeamStatus';
import Messages from './screens/student/Messages';
import Profile from './screens/student/Profile';
import Overview from './screens/staff/Overview';
import TeamView from './screens/staff/TeamView';
import StaffMessages from './screens/staff/StaffMessages';
import StaffProfile from './screens/staff/StaffProfile';
import Uploader from './screens/admin/Uploader';
import SelectTeam from './screens/start/SelectTeam';


export const MainRouter = () => (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/selectsubject' component={SelectSubject} />
          <Route exact path='/selectteam' component={SelectTeam} />
          
        </Switch>
        <Switch>
          <Route exact path='/student/status' component={TeamStatus}/>
          <Route exact path='/student/messages' component={Messages} />
          <Route exact path='/student/profile' component={Profile} />
        </Switch>
        <Switch>
          <Route exact path='/staff/overview' component={Overview}/>
          <Route exact path='/staff/teams' component={TeamView}/>
          <Route exact path='/staff/messages' component={StaffMessages}/>
          <Route exact path='/staff/profile' component={StaffProfile}/>
        </Switch>
        <Switch>
          <Route exact path='/admin/uploader' component={Uploader} />
        </Switch>
      </Router>
);