import React, { Component } from 'react';
import { Header, Button, Form } from 'semantic-ui-react';


export class FunctionsChoice extends Component{

    state = {
        address: '0x7977FD3234b6915022F0c50EBe845618fD8a802f'
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
         this.props.history.push(`/CreateStudent/${this.state.address}`)
    }

    onSubmitCheckDiploma(event) {
        event.preventDefault();
         this.props.history.push(`/CheckDiploma/${this.state.address}`)
    }

}

export default FunctionsChoice;