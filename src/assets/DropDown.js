import React, { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { Home } from "./../components/Home";

export class DropDown extends Component {
  render() {
    return (
      <NavDropdown
        title="Functions"
        id="basic-nav-dropdown"
        className="text-white text-uppercase ml-5"
      >
        {/* Je n'arrive pas à quand on clique dans le menu déroulant Function, 
            puis sur RenderStudents à renvoyer la bonne URL sans faire comme ça, 
            j'aimerai que ça récupère automatiquement
            l'addresse du contrat rentré sur Home */}
        <NavDropdown.Item href="http://localhost:3000/RenderStudents/0x0Ea8a6f81c03504D8bb7396178EccE66AB3c3Ce4">
          Render Students
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateStudent/0x0Ea8a6f81c03504D8bb7396178EccE66AB3c3Ce4">
          Create Student
        </NavDropdown.Item>
        <NavDropdown.Item>Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    );
  }
}

export default DropDown;
