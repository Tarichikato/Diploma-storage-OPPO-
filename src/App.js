import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './assets/NavBar';
import Table from './assets/Table';
import Pagination from './assets/Pagination';
import { Home } from './components/Home';
import { Router, Switch, Route } from 'react-router-dom';
import  history  from './assets/history';
import { FunctionsChoice } from './components/FunctionsChoice';
import { RenderStudents } from './components/RenderStudents';
import { CreateStudent } from './components/CreateStudent';

function App() {
  return (
    <div >
      <Router history={history}>
        <Route exact path='/' component={Home} />
        <Route path ='/FunctionsChoice/:address' component={FunctionsChoice} />
        <Route path ='/RenderStudents/:address' component={RenderStudents} />
        <Route path ='/CreateStudent/:address' component={CreateStudent} />
      </Router>
    </div>
  );
}

export default App;
