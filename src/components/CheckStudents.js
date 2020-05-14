import React, { Component }  from 'react'
import { createContract } from '../ethereum/DiplomaStorageContract'
import { web3 } from './../ethereum/web3';
import { Button, ButtonGroup, Form, Spinner, Modal, ButtonToolbar } from 'react-bootstrap';
import NavBar from './../assets/NavBar';
import { PopupCheckStudent } from './../assets/PopupCheckStudent';





export class CheckStudents extends Component {


    state = {
        gotIt: "",
        INE: 0,
        firstName: '',
        lastName: '',
        birth: 0,
        id: 0,
        students: {
            id: 0,
            INE: 0,
            fisrtName: '',
            lastName: '',
            birth: 0,
        },
        answer:'',
        student:'',
        ModalShow: false,

    }

  async componentDidMount () {
    console.log('this.props.match.params.address',this.props.match.params.address)
    this.loadBcData()
    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
    console.log("contrat",contract)
    this.getContractState(contract)
    await this.getStudent(this.getDiplomaStorageAddress(),this.state.id)
  }

  async getStudentId(INE,firstName,lastName,birth){
    const contract = createContract(this.getDiplomaStorageAddress())
    const id = await contract.methods.checkStudent(INE,firstName,lastName,birth).call()
    this.setState({id})
    console.log('id',id)
    return(id)
  }

  async getContractState(contract){
    this.setState({loading:true})
    const master = contract.methods.master().call()
    console.log('master')
    const studentCount = await contract.methods.studentCount().call()
    this.setState({studentCount: studentCount})
    console.log('studentCount GCS',studentCount)
  }

  async loadBcData(){
    const accounts = await web3.eth.getAccounts()
    console.log("account", accounts[0])
    this.setState({account: accounts[0]})
    console.log("addresseContrat",this.getDiplomaStorageAddress())

    const contract = createContract(this.getDiplomaStorageAddress())
    const studentCount = await this.state.contract.methods.studentCount().call()
    this.setState({studentCount: studentCount})
    console.log('contract',contract)
    console.log('SC',studentCount)
  }
 
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      contract: createContract(this.getDiplomaStorageAddress()),
      INE: 0,
      firstName: '',
      lastName: '',
      birth: 0,
      id : 0,
      account: '',
      studentCount: 0,
      students: [],
      answer:'',
      student:'',
      infos: ''

      
    }
  }
  
  
  getDiplomaStorageAddress () {
    return this.props.match.params.address
  }

  async getStudent(address,id) {
    const contract = createContract(address)
    
    this.setState({ contract })
    console.log(contract)

    const student = await contract.methods.students(id).call()
    this.setState({
        students: [student]
    })
    this.setState({student,student})
    console.log("students", this.state.students)
    console.log("student", this.state.student)

    const studentCount = await contract.methods.studentCount().call()
    this.setState({studentCount})
  }

  



  async onChange(event) {
    
      const target = event.target;
      const value =  target.value;
      const name = target.name;
  
      await this.setState({
        [name]: value
      });
      console.log(name,value,this.state)  
  }

  



    async onSubmit(event) {
    const infos = this.state.firstName.concat(' ', this.state.lastName).concat(' né le ', this.state.birth)
    this.setState({infos})
    const contract = createContract(this.getDiplomaStorageAddress())
    event.preventDefault();
    const id = await this.getStudentId(this.state.INE,this.state.firstName,this.state.lastName,this.state.birth)
    console.log('idf',id)
    if (id > 0) {
      this.setState({answer : " Est inscrit dans la Blockchain Ethereum"});
    } else{
      this.setState({answer : " N'est pas inscrit"});
    }
    console.log('answer',this.state.answer,this.state.student)

    await this.getStudent(this.getDiplomaStorageAddress(),parseInt(id))


    
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
                <h4 className="card-header">Check Student</h4>
                <div className="card-body">
                  <p className="card-text">Rentrez les informations de l'étudiant dont vous voulez vérifier l'existance:  </p>
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
        onClick={() => this.setState({ModalShow: true})}
        >Check Student
      </Button>
      <PopupCheckStudent
          show={this.state.ModalShow}
          onHide={ModalClose}
          onSubmit={this.onSubmit}
          answer={this.state.answer}
          firstName = {this.state.infos}
          
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

export default CheckStudents;
