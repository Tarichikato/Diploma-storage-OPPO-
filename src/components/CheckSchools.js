import React, { Component }  from 'react'
import { createContract } from '../ethereum/DiplomaStorageContract'
//import { Table } from 'semantic-ui-react'
import { web3 } from './../ethereum/web3';
import { Button, ButtonGroup, Form, Spinner, Modal, ButtonToolbar } from 'react-bootstrap';
import NavBar from './../assets/NavBar';
import { PopupCheckSchools } from '../assets/PopupCheckSchools';





export class CheckSchools extends Component {


    state = {

        schools: {
          name : '',
          id : 0
        },
        answer:'',
        school: '',
        ModalShow: false,

    }

  async componentDidMount () {
    console.log('this.props.match.params.address',this.props.match.params.address)
    this.loadBcData()
    const contract = createContract(this.getDiplomaStorageAddress())
    this.setState({contract})
    console.log("contrat",contract)
    this.getContractState(contract)
    await this.getSchool(this.getDiplomaStorageAddress(),this.state.id)
  }

  async getSchoolId(schoolName){
    const contract = createContract(this.getDiplomaStorageAddress())
    const id = await contract.methods.checkSchool(schoolName).call()
    this.setState({id})
    console.log('id',id)
    return(id)
  }

  async getContractState(contract){
    this.setState({loading:true})
    const master = contract.methods.master().call()
    console.log('master')
    const schoolCount = await contract.methods.schoolCount().call()
    this.setState({schoolCount: schoolCount})
    console.log('schoolCount GCS',schoolCount)
  }

  async loadBcData(){
    const accounts = await web3.eth.getAccounts()
    console.log("account", accounts[0])
    this.setState({account: accounts[0]})
    console.log("addresseContrat",this.getDiplomaStorageAddress())

    const contract = createContract(this.getDiplomaStorageAddress())
    const schoolCount = await this.state.contract.methods.schoolCount().call()
    this.setState({schoolCount: schoolCount})
    console.log('contract',contract)
    console.log('SC',schoolCount)
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      contract: createContract(this.getDiplomaStorageAddress()),

      id : 0 ,
      name : ''


    }
  }


  getDiplomaStorageAddress () {
    return this.props.match.params.address
  }

  async getSchool(address,id) {
    const contract = createContract(address)

    this.setState({ contract })
    console.log(contract)

    const school = await contract.methods.schools(id).call()
    this.setState({
        schools: [school]
    })
    this.setState({school,school})
    console.log("schools", this.state.schools)
    console.log("school", this.state.school)

    const schoolCount = await contract.methods.schoolCount().call()
    this.setState({schoolCount})
  }





  async onChange(event) {

      const target = event.target;
      const value =  target.value;
      const name = target.name;

      await this.setState({
        [name]: value
      });
      console.log(name,value,this.state)
  }





    async onSubmit(event) {
    const infos = this.state.schoolName
    this.setState({infos})
    const contract = createContract(this.getDiplomaStorageAddress())
    event.preventDefault();
    const id = await this.getSchoolId(this.state.schoolName)
    console.log('id',id)
    if (id > 0) {
      this.setState({answer : " Est inscrit dans la Blockchain Ethereum"});
    } else{
      this.setState({answer : " N'est pas inscrit"});
    }
    console.log('answer',this.state.answer,this.state.school)

    await this.getSchool(this.getDiplomaStorageAddress(),parseInt(id))



}

render() {
  let ModalClose =() => this.setState({ModalShow:false})

  return (
    <div>
      <div>
          <NavBar/>
      </div>

      <div className="container">
        <div className="row mt-5 text-center center">
          <div className="col-lg-10 mb-4 grid-margin">
            <div className="card h-100">
                <h4 className="card-header">Check School</h4>
                <div className="card-body">
                  <p className="card-text">Rentrez les informations de l'école dont vous voulez vérifier l'existance:  </p>
                </div>
            </div>
          </div>
      </div>
    </div>


      <Form>
          <Form.Group controlId="formGroupEmail">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                  placeholder= 'Enter the school Name'
                  name="schoolName"
                  type="text"
                  onChange={this.onChange} />
          </Form.Group>


      </Form>

      <div>

    <ButtonToolbar>
      <Button variant="primary"
        onClick={() => this.setState({ModalShow: true})}
        >Check School
      </Button>
      <PopupCheckSchools
          show={this.state.ModalShow}
          onHide={ModalClose}
          onSubmit={this.onSubmit}
          answer={this.state.answer}
          firstName = {this.state.infos}

        />

    </ButtonToolbar>

      </div>




      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4 mb-4 grid-margin">
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

export default CheckSchools;
