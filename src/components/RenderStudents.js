import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { ButtonGroup, Button } from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';




export class RenderStudents extends Component {

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
}



  render() {
    return (
      <div>
          <header>
              <NavBar/>
          </header>

          <div className="container">
           <div className="row mt-5 text-center">
            <div className="col-lg-10 mb-4 grid-margin">
              <div className="card h-100">
                  <h4 className="card-header">All the students are here below</h4>
                  <div className="card-body">
                    <p className="card-text">Voici la liste des étudiants enregistrés sur la blockchain. </p>
                  </div>
              </div>
            </div>
        </div>    
      </div>
          
            
      <div>
     <table className="table">
      <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">INE</th>
      <th scope="col">First Name </th>
      <th scope="col">Last Name</th>
      <th scope="col">Birthday</th>
      <th scope="col">Editor</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <th scope="row">
          { this.state.students.map((student, key) => {
            return(
              
              <div key={key}>
                <td>
                  {student.id}
                </td>
              </div>
              
             )
          })}
      </th>

    <td>
      { this.state.students.map((student, key) => {
            return(
              
              <div key={key}>
                <td>
                  {student.INE}
                </td>
              </div> 
              
                 )
        })}
    </td> 

    <td> 
      { this.state.students.map((student, key) => {
            return(
              <div key={key}>
                <td>
                  {student.firstName}
              </td>
            </div> 
              
                 )
        })}
    </td>  
      
    <td> 
      { this.state.students.map((student, key) => {
            return(
              <div key={key}>
                <td>
                  {student.lastName}
              </td>
            </div> 
              
                 )
        })}
    </td> 
      
    <td> 
      { this.state.students.map((student, key) => {
            return(
              <div key={key}>
                <td>
                  {student.birth}
              </td>
            </div> 
              
                 )
        })}
    </td> 
    <td> 
      { this.state.students.map((student, key) => {
            return(
              <div key={key}>
                <td>
                  {student.editor}
              </td>
            </div> 
              
                 )
        })}
    </td> 
      
    </tr>
  </tbody>
</table>


    <div className="container">
          <ButtonGroup size="lg" >
                <Button variant="primary" 
                    onClick={this.onSubmitBack}
                    >Back
                </Button>
                <Button variant="light" 
                    onClick={this.onSubmitReload}
                    >Refresh
                </Button>
          </ButtonGroup>
    </div> 
                  
  </div>  
      
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

export default RenderStudents;