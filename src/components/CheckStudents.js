import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Button, ButtonGroup, Form, Spinner, Modal, ButtonToolbar } from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';




export class CheckStudents extends Component {

  

    state = {
        students: {
            name:'N/A',
            idStudent: 0,
            INE: 0,
            fisrtName: 'N/A',
            lastName: 'N/A',
            birth: 0,
        }

    }

  async componentDidMount () {
    await this.getStudents(this.getDiplomaStorageAddress()
    )
  }
  
  getDiplomaStorageAddress () {
    return this.props.match.params.address
  }

  async getStudents(address) {
    const contract = createContract(address)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts)
    
    this.setState({ contract })
    console.log(contract)

    const studentCount = await contract.methods.studentCount().call()
    this.setState({studentCount})

    for (var i = 1; i <= studentCount; i++) {
        const student = await contract.methods.students(i).call()
        this.setState({
          students: [...this.state.students, student]
        })
      }
    
}

constructor(props) {
    super(props)
    this.state = {
      account:'',
      studentCount: 0,
      students: [],
      ModalShow: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmitCheck = this.onSubmitCheck.bind(this);
}


checkStudent(INE, firstName, lastName, birth) {
    console.log("Account" , this.state.account)
    return this.state.contract.methods.checkStudent(INE, firstName, lastName, birth).send({ from: this.state.account })
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


    onSubmitCheck(event) {
    event.preventDefault();
    if (this.checkStudent(this.state.INE,this.state.firstName,this.state.lastName,this.state.birth)==0){
	alert("Cet étudiant n'existe pas :(");
    }
    else {
	alert("Cet étudiant existe !!!");
    }
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
                  <h4 className="card-header">Check Students</h4>
                  <div className="card-body">
                    <p className="card-text">Rentrez les informations de l'étudiant que vous recherchez:  </p>
                  </div>
              </div>
            </div>
        </div>    
      </div>


        <Form>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>INE number</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the INE number'
                    name="INE"
                    type="number"
                    onChange={this.onChange} />
            </Form.Group>
            
            <Form.Group controlId="formGroupPassword">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    placeholder='Enter the First Name'
                    name="firstName"
                    type="text"
                    onChange={this.onChange} />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the Last Name'
                    name="lastName"
                    type="text"
                    onChange={this.onChange} />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
                <Form.Label>Birthday</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the Birthday'
                    name="birth"
                    type="number"
                    onChange={this.onChange} />
            </Form.Group>
        </Form>
      
        <div>
        
      <ButtonToolbar>
        <Button variant="primary" 
                 onClick={this.onSubmitCheck}
                >Check Students
        </Button>

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

export default CheckStudents;
