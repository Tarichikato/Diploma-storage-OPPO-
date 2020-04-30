import React, { Component }  from 'react'
import { createContract } from '../ethereum/DiplomaStorageContract'
import { Table } from 'semantic-ui-react'
import Web3 from 'web3'
import { web3 } from '../ethereum/web3'
import { Button, Header, Form} from 'semantic-ui-react';




export class CheckSchoolWithId extends Component {


    state = {
        schools: {
            idSchool: 0,
            name: 'N/A',
            editor: 'N/A',
        }

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
  }
 
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      id : 0,
      account: '',
      schoolCount: 0,
      schools: [],

      
    }
  }
  
  
  getDiplomaStorageAddress () {
    return '0x64399f5759209029856F40854699f65e57ED4225'
  }

  async getSchool(address,id) {
    const contract = createContract(address)
    
    this.setState({ contract })
    console.log(contract)

    const school = await contract.methods.schools(id).call()
    console.log('school',school)
    this.setState({
        schools: [school]
    })
    console.log("schools", this.state.schools)

    const schoolCount = await contract.methods.schoolCount().call()
    this.setState({schoolCount})
  }

  



  onChange(event) {
    this.setState({id: event.target.value});
}

    async onSubmit(event) {
    event.preventDefault();
    this.setState({id: event.target.value});
    this.getSchool(this.getDiplomaStorageAddress(),parseInt(this.state.id))

    
}

  render() {
    return (

      
      
        <div>

                  <Form>
                    <Form.Input
                        label='Id'
                        type='number'
                        value={this.state.address}
                        onChange={this.onChange}
                    />
                    <Button
                        type='submit'
                        onClick={this.onSubmit}
                    >
                        Submit
                    </Button>
                </Form>


          <p>Account : {this.state.account}</p>

          <p>Id : {this.state.id} </p>

          <p>SchoolCount : {this.state.schoolCount}</p>

          <p>Contract address: {this.getDiplomaStorageAddress()}</p>

            <Table celled padded color ="yellow">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
  
                <Table.Body>
  
                    <Table.Row>
                    <Table.Cell sigleline="true"> 
                       School
                    </Table.Cell>
                    <Table.Cell sigleline="true">
              
                <ul id="taskList" className="list-unstyled">
                  { this.state.schools.map((student, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {student.idSchool}
                  
                
                </div>
              )
            })}
          </ul>
                   
  
  
                    </Table.Cell>
                    </Table.Row>
  
                    <Table.Row>
                    <Table.Cell ssigleline="true"> 
                       Name
                    </Table.Cell>
                    <Table.Cell sigleline="true">
  
  
                    <ul id="taskList" className="list-unstyled">
                  { this.state.schools.map((school, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {school.name}
                 
                
                </div>
              )
            })}
          </ul>
  
  
                    </Table.Cell>
                    </Table.Row>
  
                    <Table.Row>
                    <Table.Cell sigleline="true"> 
                       Editor
                    </Table.Cell>
                    <Table.Cell sigleline="true">
  
  
                    <ul id="taskList" className="list-unstyled">
                  { this.state.schools.map((school, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {school.editor}
                 
                
                </div>
              )
            })}
            </ul>

  
  
  
                    </Table.Cell>
                    </Table.Row>
  
  
                </Table.Body>
            </Table>
          
        </div>
    );
  }
}

export default CheckSchoolWithId;