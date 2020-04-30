import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Table, Button,Form,Checkbox } from 'semantic-ui-react'
import Web3 from 'web3'
import { web3 } from '../ethereum/web3'



export class CreateStudent extends Component {

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

  async getStudentId(INE,firstName,lastName,birth){
    const contract = createContract(this.getDiplomaStorageAddress())
    const id = await contract.methods.checkStudent(INE,firstName,lastName,birth).call()
    console.log('id',id)
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
    const studentCount = await this.state.contract.methods.studentCount().call()
    this.setState({studentCount: studentCount})
    console.log('stuentCount LBD',studentCount)
  }
 
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      
      idStudent: 0,
      INE: 0,
      fisrtName: 'N/A',
      lastName: 'N/A',
      birth: 0,
      studentCount: 0,
    }
  }
  
  
  getDiplomaStorageAddress () {
    return '0x64399f5759209029856F40854699f65e57ED4225'
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

  


   async createStudent(INE, firstName, lastName, birth) {
    this.setState({loading:true})
    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
    contract.methods.createStudent(INE,firstName,lastName,birth).send({ from: '0xeFb7aFb416f0626a8f08AD4bF397773355E702ef' })
    const studentCount = await contract.methods.studentCount().call()
    this.setState({studentCount: studentCount})
    console.log("studentCount2",studentCount)
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
  await this.createStudent(this.state.INE,this.state.firstName,this.state.lastName,this.state.birth)
}

 

          render() {
    return (

      
      
        <div>

<p>Account : {this.state.account}</p>

<p>StudentCount : {this.state.studentCount}</p>

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
        
        </div>
    );
  }
}

export default CreateStudent;