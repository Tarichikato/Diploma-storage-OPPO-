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
            <NavDropdown.Item href="http://localhost:3000/RenderStudents/0xF7F3bFdc7605b258bA9c628033541A812bEd5234">Render Students</NavDropdown.Item>
            <NavDropdown.Item href="http://localhost:3000/CreateStudent/0xF7F3bFdc7605b258bA9c628033541A812bEd5234">Create Student</NavDropdown.Item>
            <NavDropdown.Item href="http://localhost:3000/CheckStudents/0xF7F3bFdc7605b258bA9c628033541A812bEd5234">Check Students</NavDropdown.Item>
            <NavDropdown.Item>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
       
        );
    }
}

export default DropDown;


