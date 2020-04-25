import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Table } from 'semantic-ui-react'



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
    const currentStudents = await this.getStudents(this.getDiplomaStorageAddress()
    )
    this.setState({
        students: currentStudents
    })
  }
  
  getDiplomaStorageAddress () {
    return this.props.match.params.address
  }

  async getStudents(address) {
    const contract = createContract(address)
    this.setState({ contract })

    const student = await contract.methods.students(1).call().then(console.log)
    this.setState({student}) 
 
    const idStudent =  contract.new({data: "idStudent"})
    this.setState({idStudent})
    const INE = await contract.methods.students(1).call()
    this.setState({INE})
    const firstName = await contract.methods.students(1).call()
    this.setState({firstName})
    const lastName = await contract.methods.students(1).call()
    this.setState({lastName})
    const birth = await contract.methods.students(1).call()
    this.setState({birth})
    
    /* const studentCount = await contract.methods.studentCount().call()
    this.setState({studentCount}) */

    /* for (var i = 1; i<=studentCount; i++) {
        const student = await contract.methods.students(i).call().then(console.log)
        this.setState({student})

        const idStudent = await contract.methods.idStudent(0).call()
        this.setState({idStudent})
        const INE = await contract.methods.student(1).call()
        const firstName = await contract.methods.student(2).call()
        const lastName = await contract.methods.student(3).call()
        const birth = await contract.methods.student(4).call()
    this.setState({
        students:[...this.state.students, student]
    }) */
    return {
        idStudent: idStudent,
        INE: INE,
        firstName: firstName,
        lastName: lastName,
        birth: birth,
    }
};
  


  /* createStudent(INE, firstName, lastName, birth) {
    this.setState({ loading: true })
    this.state.contract.methods.createStudent(INE, firstName, lastName, birth).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  } */

  render() {
    return (
      <div>
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
                      {this.state.students.idStudent}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell ssigleline="true"> 
                     idStudent
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.idStudent}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell sigleline="true"> 
                     INE
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.INE}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell sigleline="true"> 
                     First Name 
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.firstName}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell sigleline="true"> 
                     Last Name
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.lastName}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell sigleline="true"> 
                     Birthday 
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.birth}
                  </Table.Cell>
                  </Table.Row>


              </Table.Body>
          </Table>
        
      </div>
    );
  }
}

export default CreateStudent;