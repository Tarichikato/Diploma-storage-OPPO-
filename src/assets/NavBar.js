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
              <Nav.Link href="http://localhost:3000/FunctionsChoice/0xfd4420CA2Da4060147AbA6A4bB49A9494a38E33b

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