import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Button, ButtonGroup, Form, Spinner, Modal, ButtonToolbar } from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';




export class RenderAddresses extends Component {

  state = {
    addresses:''

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

const schoolCount = await contract.methods.schoolCount().call()
this.setState({schoolCount})
const school = await contract.methods.schools(1).call()

for (var i = 1; i <= school.count2; i++) {
    const address = school.lv2
    this.setState({
      addresses: [...this.state.addresses, address]
    })
  }

}

constructor(props) {
super(props)
this.state = {
  account:'',
  schoolCount: 0,
  addresses: [],
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
              <h4 className="card-header">All the schools are here below</h4>
              <div className="card-body">
                <p className="card-text">Voici la liste des écoles enregistrés sur la blockchain. </p>
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
  <th scope="col">Name</th>
  <th scope="col">Level 1</th>
  <th scope="col">Level 2</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">
{ this.state.addresses.map((address, key) => {
        return(
          
          <div key={key}>
            <td>
              {address}
            </td>
          </div> 
          
             )
    })}
  </th>
<td>
  { this.state.addresses.map((address, key) => {
        return(
          
          <div key={key}>
            <td>
              {address}
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

export default RenderAddresses;