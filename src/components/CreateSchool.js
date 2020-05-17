import React, { Component }  from 'react'
import { createContract } from './../ethereum/DiplomaStorageContract'
import { Button, ButtonGroup, Form, Spinner, Modal, ButtonToolbar } from 'react-bootstrap';
import { web3 } from './../ethereum/web3';
import NavBar from './../assets/NavBar';
import { PopupCreateSchool } from '../assets/PopupCreateSchool';




export class CreateSchool extends Component {


      state = {
          schools: {
            idSchool: 0,
            address: "",
            schoolName: 'N/A',
            schoolCount: 0,
            answer: '',
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

      const schoolCount = await contract.methods.schoolCount().call()
      this.setState({schoolCount})

      for (var i = 1; i <= schoolCount; i++) {
          const school = await contract.methods.schools(i).call()
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
        ModalShow: false,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }


  createSchool(schoolName,address) {
      this.state.contract.methods.createSchool(schoolName,address).send({ from: this.state.account })
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
      this.createSchool(this.state.schoolName,this.state.address)
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
                    <h4 className="card-header">Create School</h4>
                    <div className="card-body">
                      <p className="card-text">Rentrez les informations de l école que vous voulez créer:  </p>
                    </div>
                </div>
              </div>
          </div>
        </div>


          <Form>
              <Form.Group controlId="formGroupEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                      placeholder= 'Enter the address'
                      name="address"
                      type="text"
                      onChange={this.onChange} />
              </Form.Group>

              <Form.Group controlId="formGroupPassword">
                  <Form.Label>SchoolName</Form.Label>
                  <Form.Control
                      placeholder='Enter the schoolName'
                      name="schoolName"
                      type="text"
                      onChange={this.onChange} />
              </Form.Group>


          </Form>

          <div>

        <ButtonToolbar>
          <Button variant="primary"
            onClick={() => this.setState({ModalShow: true})}
            >Create School
          </Button>

          <PopupCreateSchool
            show={this.state.ModalShow}
            onHide={ModalClose}
            onSubmit={this.onSubmit}
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

export default CreateSchool;
