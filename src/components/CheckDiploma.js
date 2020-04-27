import React, { Component }  from 'react'
import { createContract } from '../ethereum/DiplomaStorageContract'
import { Table } from 'semantic-ui-react'
import Web3 from 'web3'
import { web3 } from '../ethereum/web3'
import { Button, Header, Form, Checkbox} from 'semantic-ui-react';




export class CheckDiploma extends Component {


    state = {
        gotIt: "",
        INE: 0,
        firstName: 'N/A',
        lastName: 'N/A',
        birth: 0,
        id: 0,
        dYear : 0,
        nameDegree : '',
        nameSchool : '',
        diplomas: {
            id: 0,
            INE: 0,
            firstName: '',
            lastName: '',
            birth: 0,
            idDegree: 0,
            nameDegree: 0,
            schoolName: 'N/A',
        }

    }

  async componentDidMount () {
    this.loadBcData()
    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
    console.log("contrat",contract)
    this.getContractState(contract)
    //await this.getDiploma(this.getDiplomaStorageAddress(),this.state.id)
  }

  async getDiplomaId(INE,firstName,lastName,birth,dYear,nameDegree,nameSchool){
    const contract = createContract(this.getDiplomaStorageAddress())
    const id = await contract.methods.getIdDiploma(INE,firstName,lastName,birth,dYear,nameDegree,'Telecom Sud Paris').call()
    this.setState({id})
    console.log('idGetDiplomaID',id)
    return(id)
  }

  async getContractState(contract){
    this.setState({loading:true})
    const master = await contract.methods.master().call()
    console.log('master',master)
    const diplomaCount = await contract.methods.diplomaCount().call()
    this.setState({diplomaCount: diplomaCount})
    console.log('dilplomaCount GCS',diplomaCount)
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
    const diplomaCount = await this.state.contract.methods.diplomaCount().call()
    this.setState({diplomaCount: diplomaCount})
  }
 
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      gotIt: '',
      contract: createContract(this.getDiplomaStorageAddress()),
      INE: 0,
      firstName: 'N/A',
      lastName: 'N/A',
      birth: 0,
      id : 0,
      dYear : 0,
      nameDegree : 'N/A',
      nameSchool : 'N/A',
      account: '',
      diplomaCount: 0,
      diplomas: [],

      
    }
  }
  
  
  getDiplomaStorageAddress () {
    return '0x64399f5759209029856F40854699f65e57ED4225'
  }

  async getDiploma(address,id) {
    const contract = createContract(address)
    
    this.setState({ contract })
    console.log(contract)

    const diploma = await contract.methods.diplomas(id).call()
    this.setState({
        diplomas: [diploma]
    })
    console.log("diploma", this.state.diplomas)

    const diplomaCount = await contract.methods.diplomaCount().call()
    this.setState({diplomaCount})
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
    const contract = createContract(this.getDiplomaStorageAddress())
    event.preventDefault();
    const id = await this.getDiplomaId(this.state.INE,this.state.firstName,this.state.lastName,this.state.birth,
        this.state.dYear,this.state.nameDegree,this.state.nameSchool)
    console.log('idf',id)
    if (id > 0) {
      this.setState({gotIt : "HO YEAY BROOOOOO YOU GOT IT"});
    } else{
      this.setState({gotIt : "SORRY BRO"});
    }

    await this.getDiploma(this.getDiplomaStorageAddress(),parseInt(id))
    await this.getDiploma(this.getDiplomaStorageAddress(),this.state.id)
    console.log('student',this.state.student)


    
}

  render() {
    return (

      
      
        <div>

<form>
        <label>
          INE :
          <input
            name="INE"
            type="number"
            value={this.state.INE}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          firstName :
          <input
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          lastName :
          <input
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          Birth :
          <input
            name="birth"
            type="number"
            value={this.state.birth}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          Degree Year :
          <input
            name="dYear"
            type="number"
            value={this.state.dYear}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          Title of the Degree :
          <input
            name="nameDegree"
            type="text"
            value={this.state.nameDegree}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          Name of the School :
          <input
            name="schoolName"
            type="text"
            value={this.state.schoolName}
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
          
          <p>Diploma Id: {this.state.diplomaId} </p>


    <Header as='h1'>{this.state.firstName} {this.state.lastName} {this.state.gotIt} </Header>

          <p>StudentCount : {this.state.diplomaCount}</p>

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
                       Diploma
                    </Table.Cell>
                    <Table.Cell sigleline="true">
              
                <ul id="taskList" className="list-unstyled">
                  { this.state.diplomas.map((diploma, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                  {diploma.id}
                  
                
                </div>
              )
            })}
          </ul>
                   
  
  
                    </Table.Cell>
                    </Table.Row>
  
                    <Table.Row>
                    <Table.Cell ssigleline="true"> 
                       INE
                    </Table.Cell>
                    <Table.Cell sigleline="true">
  
  
                    <ul id="taskList" className="list-unstyled">
                  { this.state.diplomas.map((diploma, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {diploma.INE}
                 
                
                </div>
              )
            })}
          </ul>
  
  
                    </Table.Cell>
                    </Table.Row>
  
                    <Table.Row>
                    <Table.Cell sigleline="true"> 
                       First Name 
                    </Table.Cell>
                    <Table.Cell sigleline="true">
  
  
                    <ul id="taskList" className="list-unstyled">
                  { this.state.diplomas.map((diploma, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {diploma.firstName}
                 
                
                </div>
              )
            })}
          </ul>
  
                    </Table.Cell>
                    </Table.Row>
  
                    <Table.Row>
                    <Table.Cell sigleline="true"> 
                       Last Name
                    </Table.Cell>
                    <Table.Cell sigleline="true">
  
  
                    <ul id="taskList" className="list-unstyled">
                  { this.state.diplomas.map((diploma, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {diploma.lastName}
                 
                
                </div>
              )
            })}
          </ul>
  
  
                    </Table.Cell>
                    </Table.Row>
  
                    <Table.Row>
                    <Table.Cell sigleline="true"> 
                       Birthday
                    </Table.Cell>
                    <Table.Cell sigleline="true">
  
  
                    <ul id="taskList" className="list-unstyled">
                  { this.state.diplomas.map((diploma, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {diploma.birth}
                 
                
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

export default CheckDiploma;