import './App.css';
import { ProvideAuth } from './use-auth'
import PrivateRoute from './PrivateRoute';
import NavBar from './Common/NavBar';
import Home from './Home/Home';
import Test from './Test/Test'
import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
    <ProvideAuth>
      <NavBar />
      <Router>
        <PrivateRoute path='/test'>
          <Test />
        </PrivateRoute>
        <Route path='/'>
          <Home />
        </Route>
      </Router>
    </ProvideAuth>
  );
}

export default App;
