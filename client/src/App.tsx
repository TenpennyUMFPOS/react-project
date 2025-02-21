import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Register from './pages/auth/Register.tsx';
import Login from './pages/auth/login.tsx';
import PrivateRoute from './Middlewear/PrivateRoute.tsx';
import AddCard from './pages/cards/AddCard.tsx';
import FavoriteCards from './pages/cards/FavoriteCards.tsx';
import CardDetails from './pages/cards/CardDetails.tsx';
import Nav from './components/ui/Nav.tsx';
import CardsPage from './pages/cards/CardsPage.tsx';
import LandingPage from './pages/landing/LandingPage.tsx';
import './App.css';

const AppRoutes = () => {
  const location = useLocation();
  // Define the paths where the Nav should NOT be shown
  const hideNavPaths = ['/', '/register'];

  return (
    <>
      {/* Only show Nav if the current path is not in the hideNavPaths */}
      {!hideNavPaths.includes(location.pathname) && <Nav />}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/test" component={LandingPage} />
        <PrivateRoute path="/Cards" component={CardsPage} />
        <PrivateRoute path="/addCard" component={AddCard} />
        <PrivateRoute path="/store" component={FavoriteCards} />
        <PrivateRoute path="/card-details/:cardId" component={CardDetails} />
      </Switch>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
