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
        <NavDropdown.Item href="http://localhost:3000/FunctionsChoice/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
          FunctionsChoice
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderStudents/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
          Render Students
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateStudent/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
          Create Student
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckStudent/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
          CheckStudent
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateDiploma/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        CreateDiploma
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderDiplomas/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        RenderDiplomas
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckDiplomas/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        CheckDiplomas
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderSchools/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        RenderSchools
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateSchool/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        CreateSchool
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckSchools/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        CheckSchools
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderDegrees/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        RenderDegrees
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateDegree/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        CreateDegree
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckDegrees/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        CheckDegrees
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/AddAddress/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        AddAddress
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderAddresses/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        RenderAddresses
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/DiplomaWithId/0x90c25eeae1fdc27aac6ec3424a8f9329e5ed3406">
        DiplomaWithId
        </NavDropdown.Item>
      </NavDropdown>
    );
  }
}

export default DropDown;
