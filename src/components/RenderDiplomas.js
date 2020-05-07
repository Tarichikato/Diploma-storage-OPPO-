import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { ButtonGroup, Button } from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';




export class RenderDiplomas extends Component {

    state = {
        diplomas: {
            id: 0,
            idDegree: 0,
            idStudent: 0,
        }

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
    console.log(diplomaCount)

    for (var i = 1; i <= diplomaCount; i++) {
        const diploma = await contract.methods.diplomas(i).call()
        this.setState({
          diplomas: [...this.state.diplomas, diploma]
        })
        console.log(diploma)
      }
    
}

constructor(props) {
    super(props)
    this.state = {
      account:'',
      diplomaCount: 0,
      diplomas: [],
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
                  <h4 className="card-header">All the Diplomas are here below</h4>
                  <div className="card-body">
                    <p className="card-text">Voici la liste des diplomes enregistrés sur la blockchain. </p>
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
      <th scope="col">idDegree</th>
      <th scope="col">idStudent</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <th scope="row">
          { this.state.diplomas.map((diploma, key) => {
            return(
              
              <div key={key}>
                <td>
                  {diploma.id}
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
                  {diploma.idDegree}
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
                  {diploma.iStudent}
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

export default RenderDiplomas;