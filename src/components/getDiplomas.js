import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { ButtonGroup, Button,Form ,ButtonToolbar} from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';




export class getDiplomas extends Component {

    state = {
        diplomas: {
            id: 0,
            idDegree: 0,
            idStudent: 0,
        },
        
        idS: 0,
      contract:'',
      INE: 0,
      firstName: '',
      lastName: '',
      birth: ''



    }

  async componentDidMount () {
    const contract = createContract(this.getDiplomaStorageAddress ())
    this.setState({contract})
    
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
    console.log(diplomaCount)

    for (var i = 1; i <= diplomaCount; i++) {
        const dip = await contract.methods.diplomas(i).call()
        if(dip.idStudent == this.state.idS){
            const diploma= await contract.methods.degrees(dip.idDegree).call()
        this.setState({
          diplomas: [...this.state.diplomas, diploma]
        })
    }
        console.log(dip)
      }

    
}
    async setId(){
        const id = await this.state.contract.methods.checkStudent(this.state.INE,this.state.firstName,this.state.lastName,this.state.birth).call()
        console.log(id, 'setId')
        this.setState({idS: id})
    }

async onSubmitGetId(event) {
    event.preventDefault();
    await this.setId()
    console.log(this.state.idS)
    await this.getDiplomas(this.getDiplomaStorageAddress())
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

constructor(props) {
    super(props)
    this.state = {
      account:'',
      diplomaCount: 0,
      diplomas: [],
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmitGetId = this.onSubmitGetId.bind(this);
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
                  <h4 className="card-header">All the Diplomas are here below</h4>
                  <div className="card-body">
                    <p className="card-text">Voici la liste des diplomes enregistrés sur la blockchain. </p>
                  </div>
              </div>
            </div>
        </div>    
      </div>

      <div>
      <Form>
          <Form.Group controlId="formGroupEmail">
              <Form.Label>INE number</Form.Label>
              <Form.Control 
                  placeholder= 'Enter the INE number'
                  name="INE"
                  type="number"
                  onChange={this.onChange} />
          </Form.Group>
          
          <Form.Group controlId="formGroupPassword">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                  placeholder='Enter the First Name'
                  name="firstName"
                  type="text"
                  onChange={this.onChange} />
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                  placeholder= 'Enter the Last Name'
                  name="lastName"
                  type="text"
                  onChange={this.onChange} />
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
              <Form.Label>Birthday</Form.Label>
              <Form.Control 
                  placeholder= 'Enter the Birthday'
                  name="birth"
                  type="number"
                  onChange={this.onChange} />
          </Form.Group>
      </Form>

      <ButtonToolbar>
      <Button variant="primary" 
        onClick={this.onSubmitGetId}
        >Check Student
      </Button>
          
        

    </ButtonToolbar> 
      
      </div>
          
            
      <div>
     <table className="table">
      <thead className="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Editor</th>
        <th scope="col">Name</th>
        <th scope="col">School Name</th>
        <th scope="col">Year</th>
        <th scope="col">idSchool</th>
        </tr>
  </thead>
  <tbody>
      
    <tr>
                <th scope="row">
                  {this.state.diplomas.map((diploma, key) => {
                    return (
                      <div key={key}>
                        <td>{diploma.id}</td>
                      </div>
                    );
                  })}
                </th>
    <th scope="row">
          { this.state.diplomas.map((diploma, key) => {
            return(
              
              <div key={key}>
                <td>
                  {diploma.editor}
                </td>
              </div>
              
             )
          })}
      </th>

    <td>
      { this.state.diplomas.map((diploma, key) => {
            return(
              
              <div key={key}>
                <td>
                  {diploma.name}
                </td>
              </div> 
              
                 )
        })}
    </td> 

    <td> 
      { this.state.diplomas.map((diploma, key) => {
            return(
              <div key={key}>
                <td>
                  {diploma.schoolName}
              </td>
            </div> 
              
                 )
        })}
    </td>
    <td> 
      { this.state.diplomas.map((diploma, key) => {
            return(
              <div key={key}>
                <td>
                  {diploma.year}
              </td>
            </div> 
              
                 )
        })}
    </td>
    <td> 
      { this.state.diplomas.map((diploma, key) => {
            return(
              <div key={key}>
                <td>
                  {diploma.idSchool}
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

export default getDiplomas;