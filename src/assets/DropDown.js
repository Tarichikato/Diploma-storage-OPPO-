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
        <NavDropdown.Item href="http://localhost:3000/FunctionsChoice/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
          FunctionsChoice
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderStudents/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
          Render Students
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateStudent/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
          Create Student
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckStudent/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
          CheckStudent
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateDiploma/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        CreateDiploma
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderDiplomas/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        RenderDiplomas
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckDiplomas/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        CheckDiplomas
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderSchools/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        RenderSchools
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateSchool/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        CreateSchool
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckSchools/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        CheckSchools
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderDegrees/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        RenderDegrees
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CreateDegree/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        CreateDegree
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/CheckDegrees/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        CheckDegrees
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/AddAddress/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        AddAddress
        </NavDropdown.Item>
        <NavDropdown.Item href="http://localhost:3000/RenderAddresses/0x925C5Ff691A44574f73f55A19bF1201A38BDC531">
        RenderAddresses
        </NavDropdown.Item>
        
      </NavDropdown>
    );
  }
}

export default DropDown;
