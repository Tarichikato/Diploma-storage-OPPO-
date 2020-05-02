import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Table, Button,Form,Checkbox } from 'semantic-ui-react'
import Web3 from 'web3'
import { web3 } from '../ethereum/web3'



export class CreateDiploma extends Component {

    state = {
       
            idStudent: 0,
            INE: 0,
            fisrtName: 'N/A',
            lastName: 'N/A',
            birth: 0,
            studentCount: 0,
        

    }

  async componentDidMount () {
    this.loadBcData()
    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
    console.log("contrat",contract)
    this.getContractState(contract)  
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
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const network = await web3.eth.net.getNetworkType()
    console.log("network",network)
    const accounts = await web3.eth.getAccounts()
    console.log("account", accounts[0])
    this.setState({account: accounts[0]})
    console.log("addresseContrat",this.getDiplomaStorageAddress())

    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
  }
 
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      
      INE: 0,
      fisrtName: 'N/A',
      lastName: 'N/A',
      birth: 0,
      dYear: 0,
      DegreeName: '',
      SchoolName: '',
      studentCount: 0,
    }
  }
  
  
  getDiplomaStorageAddress () {
    return '0xbE41F8E5073E899aa266De4f6603cec84Bb073bc'
  }

  async getStudent(address,id) {
    const contract = createContract(address)
    
    this.setState({ contract })
    console.log(contract)

    const student = await contract.methods.students(id).call()
    this.setState({
        students: [student]
    })
    console.log("student", this.state.students)

    const studentCount = await contract.methods.studentCount().call()
    this.setState({studentCount})
  }

  


   async createDiploma(INE, firstName, lastName, birth,dYear,DegreeName,SchoolName) {
    this.setState({loading:true})
    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
    const answer = await contract.methods.createDiploma(INE,firstName,lastName,birth,dYear,DegreeName,SchoolName).call()
    console.log('answer',answer)
    const diplomaCount = await contract.methods.diplomaCount().call()
    this.setState({diplomaCount: diplomaCount})
    console.log("studentCount CD",diplomaCount)
  } 

  async onChange(event) {
    
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    console.log(name,value,this.state) 
    this.setState({
      [name]: value
    });
    console.log(name,value,this.state)  
}





  async onSubmit(event) {
  event.preventDefault();
  await this.createDiploma(this.state.INE,this.state.firstName,this.state.lastName,this.state.birth,this.state.dYear,this.state.DegreeName,this.state.SchoolName)
}

 

          render() {
    return (

      
      
        <div>

<p>Account : {this.state.account}</p>

<p>DiplomaCount : {this.state.diplomaCount}</p>

<p>Contract address: {this.getDiplomaStorageAddress()}</p>


<form>
        <label>
          INE :
          <input
            placeholder= 'Enter INE here'
            name="INE"
            type="number"
            //value={this.state.INE}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          firstName :
          <input
            placeholder='First Name'
            name="firstName"
            type="text"
            //value={this.state.firstName}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          lastName :
          <input
            placeholder='Last Name'
            name="lastName"
            type="text"
            //value={this.state.lastName}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          Birth :
          <input
            placeholder='Birth'
            name="birth"
            type="number"
            //value={this.state.birth}
            onChange={this.onChange} />
        </label>
        <label>
            Degree Year :
          <input
            placeholder='Degree Year'
            name="dYear"
            type="number"
            //value={this.state.birth}
            onChange={this.onChange} />
        </label>
        <label>
          DegreeName :
          <input
            placeholder='DegreeName'
            name="DegreeName"
            type="text"
            //value={this.state.birth}
            onChange={this.onChange} />
        </label>
        <label>
          SchoolName :
          <input
            placeholder='SchoolName'
            name="SchoolName"
            type="text"
            //value={this.state.birth}
            onChange={this.onChange} />
        </label>
      </form>

      <Button
          type='submit'
          onClick={this.onSubmit}
          >
          Submit
      </Button>

          
        

        <p>INE: {this.state.INE}</p>
        <p>FirstName: {this.state.firstName}</p>
        <p>LastName: {this.state.lastName}</p>
        <p>Birth: {this.state.birth}</p>
        <p>dYear: {this.state.dYear}</p>
        <p>DegreeName: {this.state.DegreeName}</p>
        <p>Birth: {this.state.SchoolName}</p>
        
        </div>
    );
  }
}

export default CreateDiploma;