import React, { Component } from 'react';
import { Button, Header, Form} from 'semantic-ui-react';

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
            <div>
                <Header as='h1'>Diploma Storage</Header>

            

                <Form>
                    <Form.Input
                        label='Fonction'
                        type='text'
                        value={this.state.address}
                        onChange={this.onChange}
                    />
                    <Button
                        type='submit'
                        onClick={this.onSubmit}
                    >
                        Submit
                    </Button>
                    
                    <p>Fonctions disponibles : checkStudentWithId, createStudent, checkStudent, checkDiploma</p>
                    
                </Form>
                
               
            </div>
        );
    }

    onChange(event) {
        this.setState({address: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.history.push(`/${this.state.address}`)
    }

   
}