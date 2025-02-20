import React, { useState } from 'react';
import './App.css';
import Register from './Auth-pages/register/Register.tsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Auth-pages/login/login.tsx'
import Home from './pages/home/Home.tsx';
import TestComp from './pages/testComp/TestComp.tsx';
import PrivateRoute
  from './Middlewear/PrivateRoute.tsx';
import myCards from './components/ui/myCards.tsx';
import AddCard from './components/add-card/AddCard.tsx';
import Store from './components/store/Store.tsx';
function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/test" component={TestComp} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/Cards" component={myCards} />
        <PrivateRoute path="/addCard" component={AddCard} />
        <PrivateRoute path="/store" component={Store} />


      </Switch>
    </Router>
  );
}

export default App;
