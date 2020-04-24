import React, {Component} from 'react';
import { Router, Route,Link } from 'react-router-dom';
import { Menu,Switch, Container } from 'react-layout-components';
import './App.css';
import logo from './logo.svg';
import { CheckDiploma } from './components/CheckDiploma';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import history from './history';
//import Web3 from 'web3';





class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">NotFound</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <NotFound />
          </Route>
          <Route path="/users">
            <NotFound />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}




  navigateToHome(e){
    e.preventDefault();
    history.push('/');
  }
}

export default App;
