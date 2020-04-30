import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Table, Button } from 'semantic-ui-react'
import { web3 } from './../ethereum/web3'




export class CreateStudent extends Component {

    state = {
        students: {
            name:'N/A',
            idStudent: 0,
            INE: 0,
            fisrtName: 'N/A',
            lastName: 'N/A',
            birth: 0,
        }

    }

  async componentDidMount () {
    await this.getStudents(this.getDiplomaStorageAddress()
    )
  }
  
  getDiplomaStorageAddress () {
    return this.props.match.params.address
  }

  async getStudents(address) {
    const contract = createContract(address)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts)
    
    this.setState({ contract })
    console.log(contract)

    const studentCount = await contract.methods.studentCount().call()
    this.setState({studentCount})

    for (var i = 1; i <= studentCount; i++) {
        const student = await contract.methods.students(i).call()
        this.setState({
          students: [...this.state.students, student]
        })
      }
    
}

constructor(props) {
    super(props)
    this.state = {
      account:'',
      studentCount: 0,
      students: [],
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}


createStudent(INE, firstName, lastName, birth) {
    this.state.contract.methods.createStudent(INE, firstName, lastName, birth).send({ from: this.state.account })
    console.log("Account" , this.state.account)
}


    onChange(event) {
    
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    console.log(name,value,this.state) 
    this.setState({
      [name]: value
    });
    console.log(name,value,this.state)  
}


    onSubmit(event) {
    event.preventDefault();
    this.createStudent(this.state.INE,this.state.firstName,this.state.lastName,this.state.birth)
  }


  render() {
    return (
      <div>
          
          <form>
        <label>
          INE :
          <input
            placeholder= 'Enter the INE number'
            name="INE"
            type="number"
            //value={this.state.INE}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          firstName :
          <input
            placeholder='Enter the First Name'
            name="firstName"
            type="text"
            //value={this.state.firstName}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          lastName :
          <input
            placeholder='Enter the Last Name'
            name="lastName"
            type="text"
            //value={this.state.lastName}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          Birth :
          <input
            placeholder='Enter the Birthday'
            name="birth"
            type="number"
            //value={this.state.birth}
            onChange={this.onChange} />
        </label>
      


            <Button
                type='submit'
                onClick={this.onSubmit}
                >
                    Create Student
            </Button>
          </form>

          <Table celled padded color ="yellow">
              <Table.Header>
                  <Table.Row>
                      <Table.HeaderCell>Student n°</Table.HeaderCell>
                      <Table.HeaderCell>INE</Table.HeaderCell>
                      <Table.HeaderCell>First Name</Table.HeaderCell>
                      <Table.HeaderCell>Last Name</Table.HeaderCell>
                      <Table.HeaderCell>Birthday</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>

              <Table.Body>

                  <Table.Row>
                  <Table.Cell>
            
              <ul id="taskList" className="list-unstyled">
                { this.state.students.map((student, key) => {
                     return(
                        <div className="taskTemplate"  key={key}>
            
                        {student.id}
        
                        </div>
                         )
                 })}
            </ul>
                 
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
                 
                <Table.Cell>

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