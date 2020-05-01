import React, { Component } from 'react';
import { Header, Button, Form, Container, Image } from 'semantic-ui-react';


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
        
            <Header as='h1'> What do you want? </Header>

            <Container as='h2'>
                    <p>
                        Please, choose a function below : 
                    </p>
            </Container>
        
        <Form>
        
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

         <Image src='https://i0.wp.com/kryptosphere.org/wp-content/uploads/2019/08/logo-sans-fondnegatifnoir.png?fit=940%2C788&ssl=1' size='small' circular />

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