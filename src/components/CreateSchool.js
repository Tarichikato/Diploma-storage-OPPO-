import React, { Component }  from 'react'
import { createContract } from '../ethereum/DiplomaStorageContract'
import { Table, Button,Form,Checkbox } from 'semantic-ui-react'
import Web3 from 'web3'
import { web3 } from '../ethereum/web3'



export class CreateSchool extends Component {

    state = {
       
            idSchool: 0,
            address: "",
            schoolName: 'N/A',
            schoolCount: 0,
            answer: '',
        

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
      
      idSchool: 0,
      address: "",
      schoolName: 'N/A',   
      schoolCount: 0,
      answer: '',
    }
  }
  
  
  getDiplomaStorageAddress () {
    return '0x64399f5759209029856F40854699f65e57ED4225'
  }


  


   async createSchool(address,schoolName) {
    this.setState({loading:true})
    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
    const answer = await contract.methods.createSchool(address,schoolName).send({ from: '0xB0e2E24a6Cc3dDA0c0af4A7e5aa0A0b983b98002' })
    const schoolCount = await contract.methods.schoolCount().call()
    this.setState({answer : answer})
    console.log('answer',answer)
    this.setState({schoolCount: schoolCount})
    console.log("NEW schoolCount",schoolCount)
  } 

  async onChange(event) {
    
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    console.log('OC1',name,value,this.state) 
    await this.setState({
      [name]: value
    });
    console.log('OC2',name,value,this.state)  
}





  async onSubmit(event) {
  event.preventDefault();
  await this.createSchool(this.state.address,this.state.schoolName)
}

 

          render() {
    return (

      
      
        <div>

<p>Account : {this.state.account}</p>

<p>SchoolCount : {this.state.schoolCount}</p>

<p>Contract address: {this.getDiplomaStorageAddress()}</p>


<form>
        <label>
          adresse :
          <input
            placeholder= 'Enter adresse here'
            name="address"
            type="text"
            //value={this.state.INE}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          schoolName :
          <input
            placeholder='School Name'
            name="schoolName"
            type="text"
            //value={this.state.firstName}
            onChange={this.onChange} />
        </label>
        
      </form>

      <Button
          type='submit'
          onClick={this.onSubmit}
          >
          Submit
      </Button>

          
        

        <p>adress: {this.state.adress}</p>
        <p>schoolName: {this.state.schoolName}</p>
        
        </div>
    );
  }
}

export default CreateSchool;