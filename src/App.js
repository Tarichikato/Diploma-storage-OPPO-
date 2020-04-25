import React from 'react';
import './App.css';
import { Container, Menu } from 'semantic-ui-react';
import { CreateStudent } from './components/CreateStudent';
import { Router, Switch, Route } from 'react-router-dom';
import { Component } from 'react';
import history from "./history"
import { Home } from './components/Home';

class App extends Component {

  render () {
    return (
      <Router history={history}>
        <Container>

          <Menu secondary>
            <Menu.Item 
              name='home'
              onClick={this.navigateToHome}
              />

          </Menu>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/createStudent/:address' component={CreateStudent}
            /> 
          </Switch>

        </Container>
      </Router>
    );
  }

  navigateToHome(e) {
    e.preventDefault();
    history.push('/');
  }
}
export default App;
