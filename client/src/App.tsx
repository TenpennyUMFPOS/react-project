import React, { useState } from 'react';
import './App.css';
import Register from './Auth-pages/register/Register.tsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Auth-pages/login/login.tsx'
import TestComp from './pages/testComp/TestComp.tsx';
import PrivateRoute
  from './Middlewear/PrivateRoute.tsx';
import myCards from './components/ui/myCards.tsx';
import AddCard from './components/add-card/AddCard.tsx';
import Store from './components/store/Store.tsx';
import CardDetails from './components/cardDetails/CardDetails.tsx';
import Nav from './components/ui/Nav.tsx';
import CardsPage from './pages/cards/CardsPage.tsx';
function App() {

  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/test" component={TestComp} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/Cards" component={CardsPage} />
        <PrivateRoute path="/addCard" component={AddCard} />
        <PrivateRoute path="/store" component={Store} />
        <PrivateRoute path="/card-details/:cardId" component={CardDetails} /> {/* Add route for CardDetails */}


      </Switch>
    </Router>
  );
}

export default App;
