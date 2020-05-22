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
    this.onSubmitCheckStudents = this.onSubmitCheckStudents.bind(this);

    this.onSubmitRenderDiplomas = this.onSubmitRenderDiplomas.bind(this);
    this.onSubmitCreateDiploma = this.onSubmitCreateDiploma.bind(this);
    this.onSubmitCheckDiplomas = this.onSubmitCheckDiplomas.bind(this);

    this.onSubmitRenderSchools = this.onSubmitRenderSchools.bind(this);
    this.onSubmitCreateSchool = this.onSubmitCreateSchool.bind(this);
    this.onSubmitCheckSchools = this.onSubmitCheckSchools.bind(this);

    this.onSubmitRenderDegrees = this.onSubmitRenderDegrees.bind(this);
    this.onSubmitCreateDegree = this.onSubmitCreateDegree.bind(this);
    this.onSubmitCheckDegrees = this.onSubmitCheckDegrees.bind(this);

    this.onSubmitAddAddress = this.onSubmitAddAddress.bind(this);
    this.onSubmitRenderAddresses = this.onSubmitRenderAddresses.bind(this);
    this.onSubmitRenderMasters = this.onSubmitRenderMasters.bind(this);
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
                    onClick={this.onSubmitCheckStudents}
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
                    onClick={this.onSubmitCheckDiplomas}
                    >Check Diplomas
                </Button>
                <Button variant="light" 
                    onClick={this.onSubmitRenderDiplomas}
                    >Renders Diplomas
                </Button>
                <Button variant="primary" 
                    onClick={this.onSubmitCreateDiploma}
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
                    onClick={this.onSubmitCheckDegrees}
                    >Check Degrees
                </Button>
                <Button variant="light" 
                    onClick={this.onSubmitRenderDegrees}
                    >Renders Degrees
                </Button>
                <Button variant="primary" 
                    onClick={this.onSubmitCreateDegree}
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
                    onClick={this.onSubmitCheckSchools}
                    >Check Schools
                </Button>
                <Button variant="light" 
                    onClick={this.onSubmitRenderSchools}
                    >Renders Schools
                </Button>
                <Button variant="primary" 
                    onClick={this.onSubmitCreateSchool}
                    >Create Schools
                </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
        
        </div>

        <div className="col-lg-4 mb-4 grid-margin">
          <Card className="bg-dark text-white">
            <Card.Header as="h5">Gestion</Card.Header>
            <Card.Body>
                <Card.Title>These functions are concernig autorisations.</Card.Title>
                <Card.Text>
                  Choissiez une des fonctions ci-dessous :
                </Card.Text>
                <ButtonGroup vertical >
                <Button variant="primary" 
                    onClick={this.onSubmitAddAddress}
                    >AddAddress
                </Button>
                <Button variant="light"
                    onClick={this.onSubmitRenderAddresses}
                    >RenderAddresses
                </Button>
                <Button variant="primary" 
                    onClick={this.onSubmitRenderMasters}
                    >RenderMasters
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


    //STUDENTS INFORMATIONS
onSubmitRenderStudents(event) {
    event.preventDefault();
    this.props.history.push(`/RenderStudents/${this.state.address}`)
}

  onSubmitCreateStudent(event) {
    event.preventDefault();
    this.props.history.push(`/CreateStudent/${this.state.address}`)
}

onSubmitCheckStudents(event) {
  event.preventDefault();
  this.props.history.push(`/CheckStudent/${this.state.address}`)
}


    //DIPLOMAS INFORMATIONS
onSubmitRenderDiplomas(event) {
    event.preventDefault();
    this.props.history.push(`/RenderDiplomas/${this.state.address}`)
}

onSubmitCreateDiploma(event) {
  event.preventDefault();
  this.props.history.push(`/CreateDiploma/${this.state.address}`)
}

onSubmitCheckDiplomas(event) {
  event.preventDefault();
  this.props.history.push(`/CheckDiplomas/${this.state.address}`)
}


    //SCHOOLS INFORMATIONS
onSubmitRenderSchools(event) {
    event.preventDefault();
    this.props.history.push(`/RenderSchools/${this.state.address}`)
}

onSubmitCreateSchool(event) {
  event.preventDefault();
  this.props.history.push(`/CreateSchool/${this.state.address}`)
}

onSubmitCheckSchools(event) {
  event.preventDefault();
  this.props.history.push(`/CheckSchools/${this.state.address}`)
}


    //DEGREES INFORMATIONS
onSubmitRenderDegrees(event) {
    event.preventDefault();
    this.props.history.push(`/RenderDegrees/${this.state.address}`)
}

onSubmitCreateDegree(event) {
  event.preventDefault();
  this.props.history.push(`/CreateDegree/${this.state.address}`)
}

onSubmitCheckDegrees(event) {
  event.preventDefault();
  this.props.history.push(`/CheckDegrees/${this.state.address}`)
}

//Autorisations

onSubmitAddAddress(event) {
  event.preventDefault();
  this.props.history.push(`/AddAddress/${this.state.address}`)
}

onSubmitRenderAddresses(event) {
  event.preventDefault();
  this.props.history.push(`/RenderAddresses/${this.state.address}`)
}

onSubmitRenderMasters(event) {
  event.preventDefault();
  this.props.history.push(`/RenderMasters/${this.state.address}`)
}





}

export default FunctionsChoice;