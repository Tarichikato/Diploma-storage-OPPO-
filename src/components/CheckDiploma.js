import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Table, Button } from 'semantic-ui-react'
import { web3 } from './../ethereum/web3'




export class CheckDiploma extends Component {

   /*  state = {
        students: {
            name:'N/A',
            idStudent: 0,
            INE: 0,
            fisrtName: 'N/A',
            lastName: 'N/A',
            birth: 0,
        }

    } */

  async componentDidMount () {
    await this.getDiplomas(this.getDiplomaStorageAddress()
    )
  }
  
  getDiplomaStorageAddress () {
    return this.props.match.params.address
  }

  async getDiplomaId(INE,firstName,lastName,birth,degreeYear,degreeName,nameSchool){
    const contract = createContract(this.getDiplomaStorageAddress())
    const id = await contract.methods.getIdDiploma(INE, firstName, lastName, birth, degreeYear, degreeYear, nameSchool).call()
    this.setState({id})
    console.log('idGetDiplomaID',id)
    return(id)
  }


  async getDiplomas(address) {
    const contract = createContract(address)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts)
    
    this.setState({ contract })
    console.log(contract)

    const diplomaCount = await contract.methods.diplomaCount().call()
    this.setState({diplomaCount})

    for (var i = 1; i <= diplomaCount; i++) {
        const diploma = await contract.methods.diplomas(i).call()
        this.setState({
          diplomas: [...this.state.diplomas, diploma]
        })
      }
    
}

constructor(props) {
    super(props)
    this.state = {
      account:'',
      diplomaCount: 0,
      diplomas: [],
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}


checkDiploma(INE, firstName, lastName, birth, degreeYear, degreeName, schoolName) {
    this.state.contract.methods.checkDiploma(INE, firstName, lastName, birth, degreeYear, degreeName, schoolName).send({ from: this.state.account })
    console.log("Account" , this.state.account)
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
    const diplomaResult = await this.checkDiploma(this.state.INE,this.state.firstName,this.state.lastName,this.state.birth, this.state.degreeYear, this.state.degreeName, this.state.schoolName)
    this.setState({diplomaResult})
    console.log(diplomaResult)
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
        <label>
          Degree Year :
          <input
            placeholder='Enter the Degree Year'
            name="YearDegree"
            type="number"
            //value={this.state.degreeYear}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          Name Degree :
          <input
            placeholder='Enter the Degree Name'
            name="nameDegree"
            type="text"
            //value={this.state.degreeName}
            onChange={this.onChange} />
        </label>
        <br />
        <label>
          Name of the School :
          <input
            placeholder='Enter the Name School'
            name="schoolName"
            type="text"
            //value={this.state.schoolName}
            onChange={this.onChange} />
        </label>
      


            <Button
                type='submit'
                onClick={this.onSubmit}
                >
                    Check Diploma
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
                      <Table.HeaderCell>Year Degree</Table.HeaderCell>
                      <Table.HeaderCell>Name Degree</Table.HeaderCell>
                      <Table.HeaderCell>School Name</Table.HeaderCell>
                      <Table.HeaderCell>Got Diploma?</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>

              <Table.Body>

                  <Table.Row>
                  <Table.Cell>
            
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
                 
                <Table.Cell>

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

                <Table.Cell sigleline="true">

                <ul id="taskList" className="list-unstyled">
                    { this.state.diplomas.map((diploma, key) => {
                        return(
                        <div className="taskTemplate"  key={key}>
                
                        {diploma.degreeYear}
               
                        </div>
                        )
                    })}
                </ul>

                </Table.Cell>

                <Table.Cell sigleline="true">

                <ul id="taskList" className="list-unstyled">
                    { this.state.diplomas.map((diploma, key) => {
                        return(
                        <div className="taskTemplate"  key={key}>
                
                        {diploma.degreeName}
               
                        </div>
                        )
                    })}
                </ul>

                </Table.Cell>

                <Table.Cell sigleline="true">

                <ul id="taskList" className="list-unstyled">
                    { this.state.diplomas.map((diploma, key) => {
                        return(
                        <div className="taskTemplate"  key={key}>
                
                        {diploma.schoolName}
               
                        </div>
                        )
                    })}
                </ul>

                </Table.Cell>
                <Table.Cell sigleline="true">

                {this.state.diplomaResult}

                </Table.Cell>
                </Table.Row>


              </Table.Body>
          </Table>
        
      </div>
    );
  }
}

export default CheckDiploma;