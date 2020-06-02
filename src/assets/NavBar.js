import React from 'react';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, InputGroup, Card} from 'react-bootstrap';
import { DropDown } from './DropDown';
import * as Icon from 'react-bootstrap-icons';

function NavBar() { 
    return (
      <Navbar expand="lg" variant="dark" bg="dark">
      <Navbar.Brand href="http://localhost:3000/">Smart CV</Navbar.Brand>
      <Icon.Award y color="white" size="25"/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
            <Nav.Link href="https://kryptosphere.org/" className ="text-white text-uppercase ml-5">Kryptosphere</Nav.Link>
              <Nav.Link href="http://localhost:3000/" className ="text-white text-uppercase ml-5">
              <Icon.House y color="white" size="20"/></Nav.Link>
              <Nav.Link href="http://localhost:3000/FunctionsChoice/0x925C5Ff691A44574f73f55A19bF1201A38BDC531" className ="text-white text-uppercase ml-5">Function Choice</Nav.Link>
              <Nav.Link href="http://localhost:3000/RoleChoice/0x925C5Ff691A44574f73f55A19bF1201A38BDC531" className ="text-white text-uppercase ml-5">Role Choice</Nav.Link>
              <DropDown/>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
      </Navbar.Collapse>
    </Navbar>

    );
}

export default NavBar;