import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Table } from 'semantic-ui-react'
import Web3 from 'web3'
import { web3 } from '../ethereum/web3'



export class CreateStudent extends Component {

    state = {
        students: {
            idStudent: 0,
            INE: 0,
            fisrtName: 'N/A',
            lastName: 'N/A',
            birth: 0,
        }

    }

  async componentDidMount () {
    this.loadBcData()
    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
    console.log("contrat",contract)
    this.getContractState(contract)
    await this.getStudent(this.getDiplomaStorageAddress(),4)
    this.getStudentId(16, 'Pierre', 'lastName', 28041999)
    //this.createStudent(16, 'Pierre', 'lastName', 28041999)
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
    this.state = {
      account: '',
      studentCount: 0,
      students: [],
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
    contract.methods.createStudent(INE,firstName,lastName,birth).send({ from: '0xfd9e5D7BbB1871453b772B310632245ba9bf37F8' })
    const studentCount = await contract.methods.studentCount()
    //this.setState({studentCount: studentCount})
    console.log("studentCount2",studentCount)
  } 

  render() {
    return (
      
      
        <div>
          <p>Account : {this.state.account}</p>

          <p>StudentCount : {this.state.studentCount}</p>

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
                       Student
                    </Table.Cell>
                    <Table.Cell sigleline="true">
              
                <ul id="taskList" className="list-unstyled">
                  { this.state.students.map((student, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {student.idStudent}
                  
                
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
                  { this.state.students.map((student, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {student.INE}
                 
                
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
                  { this.state.students.map((student, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {student.firstName}
                 
                
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
                  { this.state.students.map((student, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {student.lastName}
                 
                
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
                  { this.state.students.map((student, key) => {
              return(
                <div className="taskTemplate"  key={key}>
                  
                    
                  {student.birth}
                 
                
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

export default CreateStudent;