import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { ButtonGroup, Button } from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';




export class RenderMasters extends Component {

  state = {
    schools: {
        id: 0,
        name: 'N/A',
    }

}

async componentDidMount () {
await this.getSchools(this.getDiplomaStorageAddress()
)
}

getDiplomaStorageAddress () {
return this.props.match.params.address
}

async getSchools(address) {
const contract = createContract(address)
const accounts = await web3.eth.getAccounts()
this.setState({ account: accounts[0] })
console.log(accounts)

this.setState({ contract })
console.log(contract)

const schoolCount = await contract.methods.masterCount().call()
this.setState({schoolCount})

for (var i = 1; i <= schoolCount; i++) {
    const school = await contract.methods.masters(i).call()
    this.setState({
      schools: [...this.state.schools, school]
    })
  }

}

constructor(props) {
super(props)
this.state = {
  account:'',
  schoolCount: 0,
  schools: [],
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
              <h4 className="card-header">Les adresses des gérants du contrat</h4>
              <div className="card-body">
                <p className="card-text">Voici la liste des adresses avec des autorisations de niveau maximal. </p>
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
  <th scope="col">Addresse</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">
      { this.state.schools.map((school, key) => {
        return(
          
          <div key={key}>
            <td>
              {key}
            </td>
          </div>
          
         )
      })}
  </th>

<td>
  { this.state.schools.map((school, key) => {
        return(
          
          <div key={key}>
            <td>
              {school}
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

export default RenderMasters;