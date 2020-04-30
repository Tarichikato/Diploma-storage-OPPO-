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
import {CheckSchoolWithId} from './components/CheckSchoolWithId';
import {CheckStudent} from './components/CheckStudent';
import {CheckDiploma} from './components/CheckDiploma';
import { CreateSchool } from './components/CreateSchool';
import {CheckDiplomaRudy} from './components/CheckDiplomaRudy';
import { CreateDiploma } from './components/CreateDiploma';
import {CheckDiplomaWithId} from './components/CheckDiplomaWithId';

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
            <Route path='/createSchool/' component={CreateSchool} /> 
            <Route path='/checkStudentWithId/' component={CheckStudentWithId} />
            <Route path='/checkDiplomaWithId/' component={CheckDiplomaWithId} />
            <Route path='/checkSchoolWithId/' component={CheckSchoolWithId} />
            <Route path='/checkStudent/' component={CheckStudent} />
            <Route path='/checkDiploma/' component={CheckDiploma} />
            <Route path='/checkDiplomaRudy/' component={CheckDiplomaRudy} />
            <Route path='/createDiploma/' component={CreateDiploma} /> 
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
