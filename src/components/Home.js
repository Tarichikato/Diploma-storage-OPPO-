import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export class Home extends Component {

    state = {
        address: ''
    }

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (

            
    <div className="site-wrapper">

    <div className="site-wrapper-inner">

      <div className="container">

        <div className="masthead clearfix">
          <div className="container inner">
            <h3 className="masthead-brand">Home Page</h3>
            <nav>
              <ul className="nav masthead-nav">
                <li className="active"><a href="#">Home</a></li>
                <li><a href="https://www.facebook.com/rudy.deflisque/">Facebook</a></li>
                <li><a href="https://www.linkedin.com/in/deflisquerudy/">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="inner cover">
          <h1 className="cover-heading">Diploma Storage</h1>
          <p className="lead">Cette application permet de vérifier qu'un candidat à bien son diplôme, mais également de créer des étudiants sur la blockchain ou des diplômes.</p>
          <p className="lead">Dans un premier temps, rentrer l'adresse de votre contract s'il vous plais : 
            <p>
            
                    <Form.Input
                        className="enter-address"
                        placeholder='Enter address contract...'
                        type='text'
                        value={this.state.address}
                        onChange={this.onChange}
                    />
            </p>


                <p>
                    <Button content='Submit'
                        className="btn btn-lg btn-default"
                        type='submit'
                        onClick={this.onSubmit}
                    >                       
                    </Button>
            
             </p>
                
          </p>
        </div>

      </div>

    </div>

  </div>
        );
    }

    onChange(event) {
        this.setState({address: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.history.push(`/FunctionsChoice/${this.state.address}`)
        const contractAddress = this.state.address
        console.log(contractAddress)
    }
}
export default Home;