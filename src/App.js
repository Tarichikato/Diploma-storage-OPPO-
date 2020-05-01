import React from 'react';
import './App.css';
import { Container, Menu } from 'semantic-ui-react';
import { CreateStudent } from './components/CreateStudent';
import { Router, Switch, Route } from 'react-router-dom';
import { Component } from 'react';
import history from "./history"
import { Home } from './components/Home';
import { FunctionsChoice } from './components/FunctionsChoice';
import { CheckDiploma } from './components/CheckDiploma';
import { CreateDiploma } from './components/CreateDiploma';

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
            <Route path ='/FunctionsChoice/:address' component={FunctionsChoice} />
            <Route path='/CreateStudent/:address' component={CreateStudent}/>
            <Route path='/CheckDiploma/:address' component={CheckDiploma}/>
            <Route path='/CreateDiploma/:address' component={CreateDiploma}/>
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
