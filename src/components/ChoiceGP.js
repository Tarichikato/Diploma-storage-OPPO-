import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, InputGroup, Card, ButtonGroup} from 'react-bootstrap';
import NavBar from './../assets/NavBar';


export class ChoiceGP extends Component {

  state = {
    address: this.getDiplomaStorageAddress()
}

getDiplomaStorageAddress () {
    return this.props.match.params.address  
  }

constructor(props) {
    super(props);

    
    this.onSubmitCheckDiplomas = this.onSubmitCheckDiplomas.bind(this);


    this.onSubmitgetDiplomas = this.onSubmitgetDiplomas.bind(this);
    

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
        <Card className="bg-dark text-white" style={{ width: '60rem' }}>
            <Card.Header as="h5">Diploma</Card.Header>
            <Card.Body>
                <Card.Title>Que souhaitez vous faire?</Card.Title>
                <Card.Text>
                  Choissiez une action ci dessous:  
                </Card.Text>

                <ButtonGroup vertical >
                <Button variant="light" 
                    onClick={this.onSubmitCheckDiplomas}
                    >Verifier un diploma
                </Button>
                <Button variant="primary" 
                    onClick={this.onSubmitgetDiplomas}
                    >Voir tous les diplomes d'une personne
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


    onSubmitCheckDiplomas(event) {
        event.preventDefault();
        this.props.history.push(`/CheckDiplomas/${this.state.address}`)
      }
      
      
     
      
      onSubmitgetDiplomas(event) {
        event.preventDefault();
        this.props.history.push(`/getDiplomas/${this.state.address}`)
      }





}

export default ChoiceGP;