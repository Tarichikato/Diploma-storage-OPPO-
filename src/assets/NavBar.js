import React from 'react';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, InputGroup, Card} from 'react-bootstrap';
import { DropDown } from './DropDown';

function NavBar() { 
    return (
      <Navbar expand="lg" variant="dark" bg="dark">
      <Navbar.Brand href="#home">Diploma Storage</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="http://localhost:3000/" className ="text-white text-uppercase ml-5">Home</Nav.Link>
              <Nav.Link href="http://localhost:3000/FunctionsChoice/0x3f60320F7479B7aB8ba5ec87C5b116A5068a8f4f

" className ="text-white text-uppercase ml-5">Function Choice</Nav.Link>
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