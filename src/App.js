import React from 'react';
import './App.css';
import { Container, Menu } from 'semantic-ui-react';
import { CreateStudent } from './components/CreateStudent';
import { Router, Switch, Route } from 'react-router-dom';
import { Component } from 'react';
import history from "./history"
import { Home } from './components/Home';
import {NotFound} from './components/NotFound';
import {CheckStudentWithId} from './components/CheckStudentWithId';
import {CheckStudent} from './components/CheckStudent';
import {CheckDiploma} from './components/CheckDiploma';

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
            <Route path='/createStudent/' component={CreateStudent} /> 
            <Route path='/checkStudentWithId/' component={CheckStudentWithId} />
            <Route path='/checkStudent/' component={CheckStudent} />
            <Route path='/checkDiploma/' component={CheckDiploma} />
            <Route  component ={NotFound} />
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
