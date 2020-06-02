import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, InputGroup, Card} from 'react-bootstrap';
import NavBar from './../assets/NavBar';



export class Home extends Component {

    state = {
        address: '0x925C5Ff691A44574f73f55A19bF1201A38BDC531'
    }

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

render() {
  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <div className="container">
        <div className="row mt-5">
            <div className="col-lg-4 mb-4 grid-margin">
              <div className="card h-100">
                  <h4 className="card-header">About us</h4>
                  <div className="card-body">
                    <p className="card-text">Nous sommes étudiants à Télécom Sud Paris et nous avons conçu cette application full stack.</p>
                  </div>
                  <div className="card-footer">
                    <Button variant="btn btn-primary">Learn More</Button>
                  </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 grid-margin">
              <div className="card h-100">
                  <h4 className="card-header">About this application</h4>
                  <div className="card-body">
                    <p className="card-text">Cette application offre plusieurs possibilité comme vérifier le diplôme d'un candidat, ou bien ajouter un étudiant à une école...</p>
                  </div>
                  <div className="card-footer">
                    <Button variant="btn btn-primary">Learn More</Button>
                  </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 grid-margin">
              <div className="card h-100">
                  <h4 className="card-header">About Blockchain</h4>
                  <div className="card-body">
                    <p className="card-text">Cette applciation a été codé et insérer sur la blockchain Ethereum : immuable, inviolable et immodifiable.</p>
                  </div>
                  <div className="card-footer">
                    <Button variant="btn btn-primary">Learn More</Button>
                  </div>
              </div>
            </div>
        </div>
      </div>

      <div>
                <Button variant="primary" 
                    onClick={this.onSubmit}
                    >Acceder à l'application</Button>
        </div> 
    </div>
    
    );
  
    }

    onChange(event) {
        this.setState({address: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.history.push(`/RoleChoice/${this.state.address}`)
        const contractAddress = this.state.address
        console.log(contractAddress)
    }
}


export default Home;

