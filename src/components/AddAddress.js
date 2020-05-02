import React, { Component }  from 'react'
import { createContract } from '../ethereum/DiplomaStorageContract'
import { Table } from 'semantic-ui-react'
import Web3 from 'web3'
import { web3 } from '../ethereum/web3'
import { Button, Header, Form, Checkbox} from 'semantic-ui-react';




export class AddAddress extends Component {


    state = {
        name:'',
        address: '',
        lv:0,
        account: '',
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
    console.log('accountState', this.state.account)
    console.log("addresseContrat",this.getDiplomaStorageAddress())
  }
 
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      lv: 0,
    }
  }
  
  
  getDiplomaStorageAddress () {
    return '0xbE41F8E5073E899aa266De4f6603cec84Bb073bc'
  }

  async addAddress(name,address,lv) {
    const contract = createContract(address)

    this.setState({ contract })
    console.log(contract)
    console.log('accountStateAA', this.state.account)

    await contract.methods.addAddress(name,address,lv).send({ from: this.state.account })
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
    this.addAddress(this.state.name,this.state.address,this.state.lv)
    }

  render() {
    return (

      
      
        <div>

<form>
        <label>
          lv :
          <input
            name="lv"
            type="number"
            value={this.state.lv}
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
        <br />
        <label>
          name :
          <input
            name="name"
            type="text"
            value={this.state.name}
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
          <p>name : {this.state.name} </p>
          <p>address : {this.state.address} </p>
          <p>lv : {this.state.lv} </p>


   
          
        </div>
    );
  }
}

export default AddAddress;