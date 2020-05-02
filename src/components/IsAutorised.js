import React, { Component }  from 'react'
import { createContract } from '../ethereum/DiplomaStorageContract'
import { Table } from 'semantic-ui-react'
import Web3 from 'web3'
import { web3 } from '../ethereum/web3'
import { Button, Header, Form, Checkbox} from 'semantic-ui-react';




export class IsAutorised extends Component {


    state = {
        id:0,
        address: '',
        lv:5,
        master: 0,
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
    console.log('master',master)
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
  }
 
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      lv: 5,
    }
  }
  
  
  getDiplomaStorageAddress () {
    return '0xbE41F8E5073E899aa266De4f6603cec84Bb073bc'
  }

  async isAutorised(id,address) {
    const contract = createContract(address)

    this.setState({ contract })
    console.log(contract)

    const lv = await contract.methods.isAutorized(id,address).call()
    const master = await contract.methods.isMaster(address).call()
    this.setState({master:master})
    console.log('MASTER',this.state.master)
    this.setState({lv:lv})
    console.log("lv", this.state.lv)
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
    event.preventDefault();
    this.isAutorised(this.state.id,this.state.address)
    }

  render() {
    return (

      
      
        <div>

<form>
        <label>
          Id :
          <input
            name="id"
            type="number"
            value={this.state.id}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          address :
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.onChange} />
        </label>
       
      </form>

      <Button
          type='submit'
          onClick={this.onSubmit}
          >
          Submit
      </Button>


          <p>Account : {this.state.account}</p>
          <p>ID : {this.state.id} </p>
          <p>address : {this.state.address} </p>
          <p>lv : {this.state.lv} </p>
          <p>master : {this.state.master} </p>


   
          
        </div>
    );
  }
}

export default IsAutorised;