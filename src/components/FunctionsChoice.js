import React, { Component } from 'react';
import { Header, Button, Form } from 'semantic-ui-react';


export class FunctionsChoice extends Component{

    state = {
        address: '0x08180a4D9290e977203c42E58328c44E147DE93A'
    }

    constructor(props) {
        super(props);

        
        this.onSubmitCreateStudent = this.onSubmitCreateStudent.bind(this);
        this.onSubmitCheckDiploma = this.onSubmitCheckDiploma.bind(this);
    }

    render () {
        return (
            <div>
        
            <Header as='h1'> Choose your function </Header>
        
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
         </Form>
         </div>
        );
    }

    

    onSubmitCreateStudent(event) {
        event.preventDefault();
         this.props.history.push(`/CheckDiploma/${this.state.address}`)
    }

    onSubmitCheckDiploma(event) {
        event.preventDefault();
         this.props.history.push(`/CheckDiploma/${this.state.address}`)
    }

}

export default FunctionsChoice;