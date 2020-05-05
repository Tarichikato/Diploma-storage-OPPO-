import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, InputGroup, Card, ButtonGroup} from 'react-bootstrap';
import NavBar from './../assets/NavBar';


export class FunctionsChoice extends Component {

  state = {
    address: this.getDiplomaStorageAddress()
}

getDiplomaStorageAddress () {
    return this.props.match.params.address  
  }

constructor(props) {
    super(props);

    
    this.onSubmitRenderStudents = this.onSubmitRenderStudents.bind(this);
    this.onSubmitCreateStudent = this.onSubmitCreateStudent.bind(this);
}

    render() {
        return(
            <div className="App">
      <header>
       <NavBar/>
      </header>

      <div className="container">
        <div className="row mt-5">
            <div className="col-lg-10 mb-4 grid-margin">
              <div className="card h-100">
                  <h4 className="card-header">Choose what you want to do</h4>
                  <div className="card-body">
                    <p className="card-text">Avec cette application, vous avez la possibilité de choisir ce que vous voulez faire. Choissiez une fonction ci-dessous. </p>
                  </div>
              </div>
            </div>
        </div>    
      </div>

    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4 mb-4 grid-margin">
        <Card className="bg-dark text-white">
            <Card.Header as="h5">Students</Card.Header>
            <Card.Body>
                <Card.Title>These functions are concernig students.</Card.Title>
                <Card.Text>
                  Choissiez une des fonctions ci-dessous :  
                </Card.Text>

                <ButtonGroup vertical >
                <Button variant="primary" 
                    onClick={this.onSubmit}
                    >Check Students
                </Button>
                <Button variant="light" 
                    onClick={this.onSubmitRenderStudents}
                    >Renders Students
                </Button>
                <Button variant="primary" 
                    onClick={this.onSubmitCreateStudent}
                    >Create Students
                </Button>
                </ButtonGroup>

            </Card.Body>
        </Card>
        </div>
        
        <div className="col-lg-4 mb-4 grid-margin">
          <Card className="bg-dark text-white">
            <Card.Header as="h5">Diplomas</Card.Header>
            <Card.Body>
                <Card.Title>These functions are concernig diplomas.</Card.Title>
                <Card.Text>
                  Choissiez une des fonctions ci-dessous :
                </Card.Text>
                <ButtonGroup vertical >
                <Button variant="primary" 
                    onClick={this.onSubmit}
                    >Check Diplomas
                </Button>
                <Button variant="light" 
                    onClick={this.onSubmit}
                    >Renders Diplomas
                </Button>
                <Button variant="primary" 
                    onClick={this.onSubmit}
                    >Create Diplomas
                </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
        
        </div> 
        <div className="col-lg-4 mb-4 grid-margin">
          <Card className="bg-dark text-white">
            <Card.Header as="h5">Degrees</Card.Header>
            <Card.Body>
                <Card.Title>These functions are concernig degrees.</Card.Title>
                <Card.Text>
                  Choissiez une des fonctions ci-dessous :
                </Card.Text>
                <ButtonGroup vertical >
                <Button variant="primary" 
                    onClick={this.onSubmit}
                    >Check Degrees
                </Button>
                <Button variant="light" 
                    onClick={this.onSubmit}
                    >Renders Degrees
                </Button>
                <Button variant="primary" 
                    onClick={this.onSubmit}
                    >Create Degrees
                </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
        
        </div> 
        <div className="col-lg-4 mb-4 grid-margin">
          <Card className="bg-dark text-white">
            <Card.Header as="h5">Schools</Card.Header>
            <Card.Body>
                <Card.Title>These functions are concernig schools.</Card.Title>
                <Card.Text>
                  Choissiez une des fonctions ci-dessous :
                </Card.Text>
                <ButtonGroup vertical >
                <Button variant="primary" 
                    onClick={this.onSubmit}
                    >Check Schools
                </Button>
                <Button variant="light" 
                    onClick={this.onSubmit}
                    >Renders Schools
                </Button>
                <Button variant="primary" 
                    onClick={this.onSubmit}
                    >Create Schools
                </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
        
        </div> 
      </div>
    </div>
    </div>

</div>

        );
    }

    onSubmitRenderStudents(event) {
      event.preventDefault();
       this.props.history.push(`/RenderStudents/${this.state.address}`)
  }

  onSubmitCreateStudent(event) {
    event.preventDefault();
     this.props.history.push(`/CreateStudent/${this.state.address}`)
}


}

export default FunctionsChoice;