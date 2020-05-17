import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Button, ButtonGroup, Form, Spinner, Modal, ButtonToolbar } from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';
import { PopupAddAddress } from './../assets/PopupAddAddress';




export class AddAddress extends Component {

  

    state = {
            lv:0,
            address: '',
            name: '' ,
            contract: ''
    }

  async componentDidMount () {
    const address = this.getDiplomaStorageAddress()
    const contract = createContract(address)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(this.state.account)
    const master = await  contract.methods.master().call()
    console.log('master',master)
    
    this.setState({ contract })
    console.log(contract)
  }
  
  getDiplomaStorageAddress () {
    return this.props.match.params.address
  }

  

constructor(props) {
    super(props)
    this.state = {
      account:'',
      lv: 0,
      address: '',
      name: '',
      contract: '',
      ModalShow: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}


addAddress(lv,address, name) {
    this.state.contract.methods.addAddress(name, address,lv).send({ from: this.state.account })
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
    this.addAddress(this.state.lv,this.state.address,this.state.name)
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
                  <h4 className="card-header">Add Address</h4>
                  <div className="card-body">
                    <p className="card-text">Autorisation:  </p>
                  </div>
              </div>
            </div>
        </div>    
      </div>


        <Form>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Level of autorisation</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the level'
                    name="lv"
                    type="number"
                    onChange={this.onChange} />
            </Form.Group>
            
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    placeholder='Enter the address of the acount you want to autorise'
                    name="address"
                    type="text"
                    onChange={this.onChange} />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
                <Form.Label>name</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the Name Of the School'
                    name="name"
                    type="text"
                    onChange={this.onChange} />
            </Form.Group>

        </Form>
      
        <div>
        
      <ButtonToolbar>
        <Button variant="primary" 
          onClick={() => this.setState({ModalShow: true})}
          >Add Address
        </Button>

        <PopupAddAddress
          show={this.state.ModalShow}
          onHide={ModalClose}
          onSubmit={this.onSubmit}
          address={this.state.address}
          lv = {this.state.lv}
          schoolName = {this.state.name}
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

export default AddAddress;