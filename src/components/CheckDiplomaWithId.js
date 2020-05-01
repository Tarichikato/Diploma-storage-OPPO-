import React, { Component }  from 'react'
import { createContract } from '../ethereum/DiplomaStorageContract'
import { Table } from 'semantic-ui-react'
import '/home/ubuntu/Documents/BC_Projects/OPPO-DS/src/App.css';
import Web3 from 'web3'
import { web3 } from '../ethereum/web3'
import { Button, Header, Form} from 'semantic-ui-react';




export class CheckDiplomaWithId extends Component {


    state = {
      diplomaId: 0,
      degreeId: 0,
      schoolId: 0,
      valid: '',
      DiplomaEditor: '',
      studentId: 0,
      INE: 0,
      fisrtName: '',
      lastName: '',
      StudentEditor: '',
      birth: 0,
      idDegree: 0,
      DegreeEditor: '',
      nameDegree: '',
      schoolName: '',
      year: 0,
      students: {
        idStudent: 0,
        INE: 0,
        fisrtName: 'N/A',
        lastName: 'N/A',
        birth: 0,
    },
        degrees: {
          idDegree: 0,
          nameDegree: '',
        },

        diplomas: {
          idDegree: 0,
          idStudent: 0,
        }

    }

  async componentDidMount () {
    this.loadBcData()
    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
    console.log("contrat",contract)
    this.getContractState(contract)
    const master =await  contract.methods.master().call()
    console.log('master',master)
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
    const diplomaCount = await contract.methods.diplomaCount().call()
    this.setState({diplomaCount})
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

  async getDiploma(address,id) {
    const contract = createContract(address)
    
    this.setState({ contract })
    console.log(contract)

    console.log('id',id, typeof id)
    const diploma = await contract.methods.diplomas(id).call()
    console.log('diploma',diploma)
    console.log('0',diploma[0])
    this.setState({
        diplomas: [diploma]
    })
    console.log("diplomas", this.state.diplomas)
    console.log("diploma", this.state.diplomas[0][0])
    this.setState({degreeId : this.state.diplomas[0][0]})
    this.setState({studentId : this.state.diplomas[0][1]})
    if(this.state.diplomas[0][2]){
      this.setState({valid : 'True'})
    }else{this.setState({valid : 'False'})}

    this.setState({DiplomaEditor : this.state.diplomas[0][3]})

    const student = await contract.methods.students(this.state.studentId).call()
    this.setState({INE : student[1]})
    this.setState({fisrtName : student[2]})
    this.setState({lastName : student[3]})
    this.setState({birth : student[4]})
    this.setState({StudentEditor : student[5]})

    const degree = await contract.methods.degrees(this.state.degreeId).call()
    this.setState({nameDegree : degree[0]})
    this.setState({schoolName : degree[1]})
    this.setState({year : degree[2]})
    this.setState({degreeEditor : degree[4]})
  }

  



  onChange(event) {
    this.setState({id: event.target.value});
}

    async onSubmit(event) {
    event.preventDefault();
    this.setState({id: event.target.value});
    this.getDiploma(this.getDiplomaStorageAddress(),parseInt(this.state.id))

    
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


          <p>DiplomaCount : {this.state.diplomaCount}</p>
          <p>Contract address: {this.getDiplomaStorageAddress()}</p>
          <p>Account : {this.state.account}</p>

          <p><font size = '5'>Diploma</font></p>
          <p>&emsp;&emsp;&emsp;Degree Id : {this.state.degreeId} </p>
          <p>&emsp;&emsp;&emsp;StudentId : {this.state.studentId} </p>
          <p>&emsp;&emsp;&emsp;Valid : {this.state.valid} </p>

          
          <p><font size = '5'> Student</font></p>
          <p><span class="tabulation">&emsp;&emsp;&emsp; INE : {this.state.INE} </span></p>
          <p><span class="tabulation">&emsp;&emsp;&emsp; First name : {this.state.fisrtName} </span></p>
          <p><span class="tabulation">&emsp;&emsp;&emsp; Last Name : {this.state.lastName} </span></p>
          <p><span class="tabulation">&emsp;&emsp;&emsp; Birth : {this.state.birth} </span></p>
          
          <p><font size = '5'>Degree</font></p>
          <p>&emsp;&emsp;&emsp; Degree name : {this.state.nameDegree} </p>
          <p>&emsp;&emsp;&emsp;schoolName : {this.state.schoolName} </p>
          <p>&emsp;&emsp;&emsp;Year : {this.state.year} </p>
          

          <p><font size = '5'>Editors</font></p>
          <p>&emsp;&emsp;&emsp;DiplomaEditor : {this.state.DiplomaEditor} </p>
          <p>&emsp;&emsp;&emsp;Student Editor: {this.state.StudentEditor} </p>
          <p>&emsp;&emsp;&emsp;DegreeEditor : {this.state.degreeEditor} </p>
   
        </div>
    );
  }
}

export default CheckDiplomaWithId;