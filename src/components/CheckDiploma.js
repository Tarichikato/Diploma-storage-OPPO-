import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Table, Button, Header, Container, Image } from 'semantic-ui-react'
import { web3 } from './../ethereum/web3'




export class CheckDiploma extends Component {

    state = {
        diplomas: {
            idStudent: 0,
            idDegree: 0,
        },

        students: {
            name:'N/A',
            idStudent: 0,
            INE: 0,
            fisrtName: 'N/A',
            lastName: 'N/A',
            birth: 0,
        }, 

        degrees: {
            idDegree: 0,
            idSchool: 0,
            year: 0,
            nameDegree: 'N/A',
            schoolName: 'N/A', 
        },

        schools: {
            schoolAddress: 'N/A',
            idSchool: 0,
            schoolName: 'N/A',
        },

        diplomaResult: false,

    }


  async componentDidMount () {
    await this.getDiplomas(this.getDiplomaStorageAddress()
    )
  }
  
  getDiplomaStorageAddress () {
    return this.props.match.params.address
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

    const studentCount = await contract.methods.studentCount().call()
    this.setState({studentCount})

    const degreeCount = await contract.methods.degreeCount().call()
    this.setState({degreeCount})
    
    const schoolCount = await contract.methods.schoolCount().call()
    this.setState([schoolCount])

    for (var i = 1; i <= studentCount; i++) {
        const student = await contract.methods.students(i).call()
        this.setState({
          students: [...this.state.students, student]
        })
      }


    for (var j = 1; j <= diplomaCount; j++) {
        const diploma = await contract.methods.diplomas(j).call()
        this.setState({
          diplomas: [...this.state.diplomas, diploma]
        })
      }


      for (var k = 1; k <= schoolCount; k++) {
        const school = await contract.methods.schools(k).call()
        this.setState({
          schools: [...this.state.schools, school]
        })
      }

      for (var l = 1; l <= degreeCount; l++) {
        const degree = await contract.methods.degrees(l).call()
        this.setState({
          degrees: [...this.state.degrees, degree]
        })
      }
}

constructor(props) {
    super(props)
    this.state = {
      account:'',
      diplomaCount: 0,
      studentCount: 0,
      degreeCount: 0,
      schoolCount:0,
      students: [],
      schools: [],
      degrees: [],
      diplomas: [],
      diplomaResult: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}


    async checkDiploma(INE, firstName, lastName, birth, dYear, nameDegree, schoolName) {
    const contract = createContract(this.getDiplomaStorageAddress())
    
    this.setState({ contract })
    console.log(contract)
    
    
    const diplomaResult = await contract.methods.checkDiploma(INE, firstName, lastName, birth, dYear, nameDegree, schoolName).call()
    this.setState({diplomaResult})
    console.log('Diplomaaaa Result: ', diplomaResult)
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
    //const contract = createContract(this.getDiplomaStorageAddress())

    const diplomaResult =  this.checkDiploma(this.state.INE, this.state.firstName, this.state.lastName, this.state.birth, this.state.dYear, this.state.nameDegree, this.state.schoolName)
    this.setState(diplomaResult)
    
}


  render() {
    return (
      <div>

        <Header as='h1'> Check Diploma </Header>
        
        <Container as='h2'>
                  <p>
                      Please, enter the informations to check diploma student : 
                  </p>
        </Container>
          
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
            name="dYear"
            type="text"
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
            
            <Table.Cell sigleline="true">

                {this.state.INE}

            {/* ul id="taskList" className="list-unstyled">
                { this.state.students.map((student, key) => {
                    return(
                         <div className="taskTemplate"  key={key}>

                        {student.INE}
                        
                        </div>
                        )
                    })}
                </ul> */}

                </Table.Cell>
                 
                <Table.Cell>

                    {this.state.firstName}

                {/* <ul id="taskList" className="list-unstyled">
                    { this.state.students.map((student, key) => {
                         return(
                          <div className="taskTemplate"  key={key}>
             
                            {student.firstName}
        
                            </div>
                        )
                    })}
                </ul> */}

                </Table.Cell>
                  
                 <Table.Cell sigleline="true">

                     {this.state.lastName}

             {/*    <ul id="taskList" className="list-unstyled">
                    { this.state.students.map((student, key) => {
                        return(
                         <div className="taskTemplate"  key={key}>
                
                        {student.lastName}

                        </div>
                        )
                     })}
                </ul> */}

                </Table.Cell>
                  
                <Table.Cell sigleline="true">

                    {this.state.birth}

                {/* <ul id="taskList" className="list-unstyled">
                    { this.state.students.map((student, key) => {
                        return(
                        <div className="taskTemplate"  key={key}>
                
                        {student.birth}
               
                        </div>
                        )
                    })}
                </ul> */}

                </Table.Cell>

                <Table.Cell sigleline="true">

                    {this.state.dYear}

               {/*  <ul id="taskList" className="list-unstyled">
                    { this.state.degrees.map((degree, key) => {
                        return(
                        <div className="taskTemplate"  key={key}>
                
                        {degree.year}
               
                        </div>
                        )
                    })}
                </ul> */}

                </Table.Cell>

                <Table.Cell sigleline="true">

                    {this.state.nameDegree}

               {/*  <ul id="taskList" className="list-unstyled">
                    { this.state.degrees.map((degree, key) => {
                        return(
                        <div className="taskTemplate"  key={key}>
                
                        {degree.nameDegree}
               
                        </div>
                        )
                    })}
                </ul> */}

                </Table.Cell>

                <Table.Cell sigleline="true">

                    {this.state.schoolName}

                {/* <ul id="taskList" className="list-unstyled">
                    { this.state.schools.map((school, key) => {
                        return(
                        <div className="taskTemplate"  key={key}>
                
                        {school.schoolName}
               
                        </div>
                        )
                    })}
                </ul>
 */}
                </Table.Cell>

                <Table.Cell sigleline="true">

                    {this.state.diplomaResult}


                {/* {  this.state.diplomas.map((diplomaResult, key) => {
                    return(
                         <div className="taskTemplate"  key={key}>

                        {diplomaResult.idStudent}
                        
                        </div>
                        )
                    })}  */}
               

                </Table.Cell>
                </Table.Row>


              </Table.Body>
          </Table>

          <Button 
            type="submit"
            onClick={this.onSubmitBack}
            >
                Back
             </Button>

             <Button 
            type="submit"
            onClick={this.onSubmitReload}
            >
                Refresh
             </Button>

          <Image src='https://i0.wp.com/kryptosphere.org/wp-content/uploads/2019/08/logo-sans-fondnegatifnoir.png?fit=940%2C788&ssl=1' size='small' circular />
        
      </div>
    );
  }

  onSubmitBack(event) {
    event.preventDefault();
    window.history.back()
    }

    onSubmitReload(event) {
        event.preventDefault();
        window.location.reload()
    }
}

export default CheckDiploma;