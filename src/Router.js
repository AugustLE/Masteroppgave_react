import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
            <p>
                Project thesis frontend. 
            </p>
            
            </header>
        </div>
    );
}

export default function MainRouter() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </Router>
    );
  }