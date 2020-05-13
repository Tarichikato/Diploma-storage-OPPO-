import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Button, ButtonGroup, Form, Spinner, Modal, ButtonToolbar } from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';
import { PopupCreateDegree } from './../assets/PopupCreateDegree';




export class CreateDegree extends Component {

  

    state = {
        degrees: {
            year:'',
            name:'N/A',
            SchoolName: 'N/A',
            account:'',
            infos:'',
            contract:'',
        }

    }

  async componentDidMount () {
    const address = this.getDiplomaStorageAddress()
    const contract = createContract(address)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({contract})
    console.log('accounts',accounts)
    console.log('contrat',contract)
  }
  
  getDiplomaStorageAddress () {
    return this.props.match.params.address
  }


constructor(props) {
    super(props)
    this.state = {
      account:'',
      year:'',
      name:'N/A',
      SchoolName: 'N/A',
      ModalShow: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}


createDegree(year,name,SchoolName) {
    console.log('account',this.state.account)
    this.state.contract.methods.createDegree(year,name,SchoolName).send({ from: this.state.account })
    console.log("Account" , this.state.account)
}


    onChange(event) {
    
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    console.log(name,value,this.state) 
    this.setState({
      [name]: value
    });
    console.log(name,value,this.state)  
}


    onSubmit(event) {
    event.preventDefault();
    this.createDegree(this.state.year,this.state.name,this.state.SchoolName)
  }


  render() {
    let ModalClose =() => this.setState({ModalShow:false})

    return (
      <div>
        <div>
            <NavBar/>
        </div>

        <div className="container">
          <div className="row mt-5 text-center center">
            <div className="col-lg-10 mb-4 grid-margin">
              <div className="card h-100">
                  <h4 className="card-header">Create Degree</h4>
                  <div className="card-body">
                    <p className="card-text">Rentrez les informations du diplome que vous voulez créer:  </p>
                  </div>
              </div>
            </div>
        </div>    
      </div>


        <Form>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>year</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the year'
                    name="year"
                    type="number"
                    onChange={this.onChange} />
            </Form.Group>
            
            <Form.Group controlId="formGroupPassword">
                <Form.Label>name</Form.Label>
                <Form.Control 
                    placeholder='Enter the name of the Degree'
                    name="name"
                    type="text"
                    onChange={this.onChange} />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
                <Form.Label>SchoolName</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the name of the School'
                    name="SchoolName"
                    type="text"
                    onChange={this.onChange} />
            </Form.Group>

           
        </Form>
      
        <div>
        
      <ButtonToolbar>
        <Button variant="primary" 
          onClick={() => this.setState({ModalShow: true})}
          >Create Degree
        </Button>

        <PopupCreateDegree
          show={this.state.ModalShow}
          onHide={ModalClose}
          onSubmit={this.onSubmit}
        />
      </ButtonToolbar> 

        </div>

        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4 mb-4 grid-margin">
          <ButtonGroup size="lg" >
                <Button variant="primary" 
                    onClick={this.onSubmitBack}
                    >Back
                </Button>
                <Button variant="light" 
                    onClick={this.onSubmitReload}
                    >Refresh
                </Button>
          </ButtonGroup>
        </div>
      </div>
    </div> 
            
      </div>
    );
  }

  onSubmitBack(event) {
    event.preventDefault();
    window.history.back()
    }

  onSubmitReload(event) {
    event.preventDefault();
    window.location.reload()
    }
}

export default CreateDegree;
