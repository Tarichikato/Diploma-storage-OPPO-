import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';


export class DropDown extends Component {

render () {
    return (
        
        <NavDropdown title="Functions" id="basic-nav-dropdown" className ="text-white text-uppercase ml-5">
            {/* Je n'arrive pas à quand on clique dans le menu déroulant Function, 
            puis sur RenderStudents à renvoyer la bonne URL sans faire comme ça, 
            j'aimerai que ça récupère automatiquement
            l'addresse du contrat rentré sur Home */}
            <NavDropdown.Item href="http://localhost:3000/RenderStudents/0x7F40EB094ACa301A3D7B20193ec9F89FF68F255E">Render Students</NavDropdown.Item>
            <NavDropdown.Item href="http://localhost:3000/CreateStudent/0x7F40EB094ACa301A3D7B20193ec9F89FF68F255E">Create Student</NavDropdown.Item>
            <NavDropdown.Item>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
       
        );
    }
}

export default DropDown;


