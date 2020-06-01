import React, { Component } from "react";
import { createContract } from "./../ethereum/DiplomaStorageContract";
import { ButtonGroup, Button } from "react-bootstrap";
import { web3 } from "./../ethereum/web3";
import NavBar from "./../assets/NavBar";
import { BoundingBox } from "react-bootstrap-icons";

export class getDiplomas extends Component {
  state = {
    students: {
      id: 0,
      name: 'N/A',
      schoolName: 'N/A',
      year: 0,
      idSchool: 0,
    },
    INE: 18821453685,
    firstname: 'Bob',
    lastName: 'Martin',
    birth: 20072015,
  };

  async componentDidMount() {
    await this.getDegrees(this.getDiplomaStorageAddress());
  }

  getDiplomaStorageAddress() {
    return this.props.match.params.address;
  }

  async getDegrees(address) {
    const contract = createContract(address);
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log(accounts);
    console.log(this.state)
    await contract.methods.editCv(this.state.INE,this.state.firstname,this.state.lastName,this.state.birth).send({ from: this.state.account })

    this.setState({ contract });
    console.log(contract);

    const degreeCount = await contract.methods.cvCount().call();
    this.setState({ degreeCount });

    for (var i = 1; i <= degreeCount; i++) {
      const degree = await contract.methods.cv(i).call();
      this.setState({
        degrees: [...this.state.degrees, degree],
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      degreeCount: 0,
      degrees: [],
      INE: 18821453685,
    firstname: 'Bob',
    lastName: 'Martin',
    birth: 20072015,
    };
  }

  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>

        <div className="container">
          <div className="row mt-5 text-center">
            <div className="col-lg-10 mb-4 grid-margin">
              <div className="card h-100">
                <h4 className="card-header">All the degrees are here below</h4>
                <div className="card-body">
                  <p className="card-text">
                    Voici la liste des degrees enregistrés sur la blockchain.{" "}
                  </p>
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
                <th scope="col">School Name</th>
                <th scope="col">Year</th>
                <th scope="col">idSchool</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  {this.state.degrees.map((degree, key) => {
                    return (
                      <div key={key}>
                        <td>{degree.id}</td>
                      </div>
                    );
                  })}
                </th>

                <td>
                  {this.state.degrees.map((degree, key) => {
                    return (
                      <div key={key}>
                        <td>{degree.name}</td>
                      </div>
                    );
                  })}
                </td>

                <td>
                  {this.state.degrees.map((degree, key) => {
                    return (
                      <div key={key}>
                        <td>{degree.schoolName}</td>
                      </div>
                    );
                  })}
                </td>

                <td>
                  {this.state.degrees.map((degree, key) => {
                    return (
                      <div key={key}>
                        <td>{degree.year}</td>
                      </div>
                    );
                  })}
                </td>

                <td>
                  {this.state.degrees.map((degree, key) => {
                    return (
                      <div key={key}>
                        <td>{degree.idSchool}</td>
                      </div>
                    );
                  })}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="container">
            <ButtonGroup size="lg">
              <Button variant="primary" onClick={this.onSubmitBack}>
                Back
              </Button>
              <Button variant="light" onClick={this.onSubmitReload}>
                Refresh
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }

  onSubmitBack(event) {
    event.preventDefault();
    window.history.back();
  }

  onSubmitReload(event) {
    event.preventDefault();
    window.location.reload();
  }
}

export default getDiplomas;
