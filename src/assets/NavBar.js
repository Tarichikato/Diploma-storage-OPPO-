import React from 'react';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, InputGroup, Card} from 'react-bootstrap';
import { DropDown } from './DropDown';
import * as Icon from 'react-bootstrap-icons';

function NavBar() { 
    return (
      <Navbar expand="lg" variant="dark" bg="dark">
      <Navbar.Brand href="#home">Diploma Storage</Navbar.Brand>
      <Icon.Award y color="white" size="25"/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="http://localhost:3000/" className ="text-white text-uppercase ml-5">
              <Icon.House y color="white" size="20"/></Nav.Link>
              <Nav.Link href="http://localhost:3000/FunctionsChoice/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406" className ="text-white text-uppercase ml-5">Function Choice</Nav.Link>
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