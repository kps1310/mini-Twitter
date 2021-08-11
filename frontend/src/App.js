// Basics

import React from "react";
import { Route, Switch } from "react-router-dom";
import './components/styles/app.css';

// Components

import Home from './components/screens/Home';
import NotFound from './components/screens/NotFound';
import Profile from './components/screens/Profile';
import Settings from './components/screens/Settings';
import Login from './components/screens/auth/Login';
import Signup from './components/screens/auth/Signup';


function App() {

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profiles/:username" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
