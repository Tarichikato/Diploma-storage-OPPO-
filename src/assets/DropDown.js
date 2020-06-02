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
        <NavDropdown.Item href="http://localhost:3000/FunctionsChoice/0xf199868e3d5cced5aea036593e4742dae64baed7">
          FunctionsChoice
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderStudents/0xf199868e3d5cced5aea036593e4742dae64baed7">
          Render Students
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateStudent/0xf199868e3d5cced5aea036593e4742dae64baed7">
          Create Student
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckStudent/0xf199868e3d5cced5aea036593e4742dae64baed7">
          CheckStudent
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateDiploma/0xf199868e3d5cced5aea036593e4742dae64baed7">
        CreateDiploma
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderDiplomas/0xf199868e3d5cced5aea036593e4742dae64baed7">
        RenderDiplomas
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckDiplomas/0xf199868e3d5cced5aea036593e4742dae64baed7">
        CheckDiplomas
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderSchools/0xf199868e3d5cced5aea036593e4742dae64baed7">
        RenderSchools
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateSchool/0xf199868e3d5cced5aea036593e4742dae64baed7">
        CreateSchool
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckSchools/0xf199868e3d5cced5aea036593e4742dae64baed7">
        CheckSchools
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderDegrees/0xf199868e3d5cced5aea036593e4742dae64baed7">
        RenderDegrees
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateDegree/0xf199868e3d5cced5aea036593e4742dae64baed7">
        CreateDegree
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckDegrees/0xf199868e3d5cced5aea036593e4742dae64baed7">
        CheckDegrees
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/AddAddress/0xf199868e3d5cced5aea036593e4742dae64baed7">
        AddAddress
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderAddresses/0xf199868e3d5cced5aea036593e4742dae64baed7">
        RenderAddresses
        </NavDropdown.Item>
        
      </NavDropdown>
    );
  }
}

export default DropDown;
