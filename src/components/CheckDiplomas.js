import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Button, ButtonGroup, Form, Spinner, Modal, ButtonToolbar } from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';
import { PopupCDiploma } from './../assets/PopupCDiploma';




export class CheckDiplomas extends Component {

    state = {
        diplomas: {
            idStudent: 0,
            idDegree: 0,
        },

        students: {
            name:'N/A',
            idStudent: 0,
            INE: 0,
            fisrtName: 'N/A',
            lastName: 'N/A',
            birth: 0,
        }, 

        degrees: {
            idDegree: 0,
            idSchool: 0,
            year: 0,
            nameDegree: 'N/A',
            schoolName: 'N/A', 
        },

        schools: {
            schoolAddress: 'N/A',
            idSchool: 0,
            schoolName: 'N/A',
        },

        diplomaResult: 'N/A',

    }


  async componentDidMount () {
    await this.getDiplomas(this.getDiplomaStorageAddress()
    )
  }
  
  getDiplomaStorageAddress () {
    return this.props.match.params.address
  }

  async getDiplomas(address) {
    const contract = createContract(address)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts)
    
    this.setState({ contract })
    console.log(contract)

    const diplomaCount = await contract.methods.diplomaCount().call()
    this.setState({diplomaCount})

    const studentCount = await contract.methods.studentCount().call()
    this.setState({studentCount})

    const degreeCount = await contract.methods.degreeCount().call()
    this.setState({degreeCount})
    
    const schoolCount = await contract.methods.schoolCount().call()
    this.setState([schoolCount])

    for (var i = 1; i <= studentCount; i++) {
        const student = await contract.methods.students(i).call()
        this.setState({
          students: [...this.state.students, student]
        })
      }


    for (var j = 1; j <= diplomaCount; j++) {
        const diploma = await contract.methods.diplomas(j).call()
        this.setState({
          diplomas: [...this.state.diplomas, diploma]
        })
      }


      for (var k = 1; k <= schoolCount; k++) {
        const school = await contract.methods.schools(k).call()
        this.setState({
          schools: [...this.state.schools, school]
        })
      }

      for (var l = 1; l <= degreeCount; l++) {
        const degree = await contract.methods.degrees(l).call()
        this.setState({
          degrees: [...this.state.degrees, degree]
        })
      }
}

constructor(props) {
    super(props)
    this.state = {
      account:'',
      diplomaCount: 0,
      studentCount: 0,
      degreeCount: 0,
      schoolCount:0,
      students: [],
      schools: [],
      degrees: [],
      diplomas: [],
      diplomaResult: 'N/A',
      ModalShow: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}


    async checkDiploma(INE, firstName, lastName, birth, dYear, nameDegree, schoolName) {
    const contract = createContract(this.getDiplomaStorageAddress())
    
    this.setState({ contract })
    console.log(contract)
    
    
    const diplomaResult = await contract.methods.checkDiploma(INE, firstName, lastName, birth, dYear, nameDegree, schoolName).call()
    this.setState({diplomaResult})
    console.log('Diplomaaaa Result: ', diplomaResult)
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

    const diplomaResult =  this.checkDiploma(this.state.INE, this.state.firstName, this.state.lastName, this.state.birth, this.state.dYear, this.state.nameDegree, this.state.schoolName)
    this.setState(diplomaResult)
    
}

render () {
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
                  <h4 className="card-header">Check Diploma</h4>
                  <div className="card-body">
                    <p className="card-text">Rentrez les informations de l'étudiant dont vous voulez vérifier son diplôme:  </p>
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
                    onChange={this.onChange}  />
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

            <Form.Group controlId="formGroupPassword">
                <Form.Label>Degree Year</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the Degree Year'
                    name="dYear"
                    type="number"
                    onChange={this.onChange} />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
                <Form.Label>Degree Name</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the Degree Name '
                    name="nameDegree"
                    type="text"
                    onChange={this.onChange} />
            </Form.Group>
            
            <Form.Group controlId="formGroupPassword">
                <Form.Label>School Name</Form.Label>
                <Form.Control 
                    placeholder= 'Enter the School Name'
                    name="schoolName"
                    type="text"
                    onChange={this.onChange} />
            </Form.Group>
        </Form>
      

        {/* AJOUTER UN POP UP QUI DONNE LE RESULTAT DE CHECK DIPLOMA */}
        <ButtonToolbar>
        <Button variant="primary" 
          onClick={() => this.setState({ModalShow: true})}
          >Check Diploma
        </Button>

        <PopupCDiploma
          show={this.state.ModalShow}
          onHide={ModalClose}
          onSubmit={this.onSubmit}
          
        />
      </ButtonToolbar>

      

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

export default CheckDiplomas;