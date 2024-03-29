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
import { RoleChoice } from './components/RoleChoice';
import { ChoiceGP } from './components/ChoiceGP';

import { RenderStudents } from './components/RenderStudents';
import { CreateStudent } from './components/CreateStudent';
import { CheckStudents } from './components/CheckStudents';

import { RenderDiplomas } from './components/RenderDiplomas';
import { CreateDiploma } from './components/CreateDiploma';
import { CheckDiplomas } from './components/CheckDiplomas';

import { RenderSchools } from './components/RenderSchools';
import { CreateSchool } from './components/CreateSchool';
import { CheckSchools } from './components/CheckSchools';

import { RenderDegrees } from './components/RenderDegrees';
import { CreateDegree } from './components/CreateDegree';
import { CheckDegrees } from './components/CheckDegrees';

import { AddAddress } from './components/AddAddress';
import { DiplomaWithId } from './components/DiplomaWithId';
import { RenderAddresses } from './components/RenderAddresses';
import { RenderMasters } from './components/RenderMasters';

import { getDiplomas } from './components/getDiplomas';


function App() {
  return (
    <div >
      <Router history={history}>
        <Route exact path='/' component={Home} />
        <Route path ='/FunctionsChoice/:address' component={FunctionsChoice} />
        <Route path ='/RoleChoice/:address' component={RoleChoice} />
        <Route path ='/ChoiceGP/:address' component={ChoiceGP} />

        <Route path ='/RenderStudents/:address' component={RenderStudents} />
        <Route path ='/CreateStudent/:address' component={CreateStudent} />
        <Route path ='/CheckStudent/:address' component={CheckStudents} />

        <Route path ='/RenderDiplomas/:address' component={RenderDiplomas} />
        <Route path ='/CreateDiploma/:address' component={CreateDiploma} />
        <Route path ='/CheckDiplomas/:address' component={CheckDiplomas} />

        <Route path ='/RenderSchools/:address' component={RenderSchools} />
        <Route path ='/CreateSchool/:address' component={CreateSchool} />
        <Route path ='/CheckSchools/:address' component={CheckSchools} />

        
        <Route path ='/RenderDegrees/:address' component={RenderDegrees} />
        <Route path ='/CreateDegree/:address' component={CreateDegree} />
        <Route path ='/CheckDegrees/:address' component={CheckDegrees} />

        <Route path ='/AddAddress/:address' component={AddAddress} />
        <Route path ='/DiplomaWithId/:address' component={DiplomaWithId} />
        <Route path ='/RenderAddresses/:address' component={RenderAddresses} />
        <Route path ='/RenderMasters/:address' component={RenderMasters} />

        <Route path ='/GetDiplomas/:address' component={getDiplomas} />

      </Router>
    </div>
  );
}

export default App;
