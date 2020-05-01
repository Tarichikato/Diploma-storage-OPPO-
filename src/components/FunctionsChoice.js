import React, { Component } from 'react';
import { Header, Button, Form, Container } from 'semantic-ui-react';


export class FunctionsChoice extends Component{

    state = {
        address: this.getDiplomaStorageAddress()
    }

    getDiplomaStorageAddress () {
        return this.props.match.params.address
      }

    constructor(props) {
        super(props);

        
        this.onSubmitCreateStudent = this.onSubmitCreateStudent.bind(this);
        this.onSubmitCheckDiploma = this.onSubmitCheckDiploma.bind(this);
        this.onSubmitCreateDiploma = this.onSubmitCreateDiploma.bind(this);
    }

    render () {
        return (
            <div>
                <div className="site-wrapper">

                <div className="site-wrapper-inner">

                <div className="container">
        
           
        
        {/* <Form>
        
        <Button 
            type="submit"
            onClick={this.onSubmitCreateStudent}
            >
                Get Students
            </Button>

            <Button 
            type="submit"
            onClick={this.onSubmitCheckDiploma}
            >
                Check Diploma
             </Button>

             <Button 
            type="submit"
            onClick={this.onSubmitCreateDiploma}
            >
                Create Diploma
             </Button>

         </Form>

            <Form>
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
             </Form>
 */}
         
                
            </div>
         </div>
         <div className="inner cover">
          <h1 className="cover-heading">Diploma Storage</h1>
          <p className="lead">Si'il vous plais, choisisez la fonction voulu ci dessous : </p>
          
            <p>
            
            <Button content ='Create Student'
            className="btn btn-lg btn-default"
            type="submit"
            onClick={this.onSubmitCreateStudent}
            >
            </Button>

            <Button content = 'Check Diploma'
            className="btn btn-lg btn-default"
            type="submit"
            onClick={this.onSubmitCheckDiploma}
            >
             </Button>

             <Button content = 'Create Diploma'
            className="btn btn-lg btn-default"
            type="submit"
            onClick={this.onSubmitCreateDiploma}
            >
             </Button>

             </p>

             <p className='back-refresh'>
             
             <Button content = "Back"
             className="btn btn-lg btn-default"
            type="submit"
            onClick={this.onSubmitBack}
            >
                Back
             </Button>

             <Button content = 'Refresh'
             className="btn btn-lg btn-default"
            type="submit"
            onClick={this.onSubmitReload}
            >
             </Button>
             </p>
                
          
            </div>
        </div>
    </div>

        
        );
    }

    

    onSubmitCreateStudent(event) {
        event.preventDefault();
         this.props.history.push(`/CreateStudent/${this.state.address}`)
    }

    onSubmitCheckDiploma(event) {
        event.preventDefault();
         this.props.history.push(`/CheckDiploma/${this.state.address}`)
    }

    onSubmitCreateDiploma(event) {
        event.preventDefault();
         this.props.history.push(`/CreateDiploma/${this.state.address}`)
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

export default FunctionsChoice;