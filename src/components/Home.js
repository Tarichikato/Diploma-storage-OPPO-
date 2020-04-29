import React, { Component } from 'react';
import { Button, Header, Form} from 'semantic-ui-react';

export class Home extends Component {

    state = {
        function: ''
    }

    constructor(props) {
        super(props);

        this.onSubmitCreateStudent = this.onSubmitCreateStudent.bind(this);
        this.onSubmitCreateSchool = this.onSubmitCreateSchool.bind(this);
        this.onSubmitCheckStudent = this.onSubmitCheckStudent.bind(this);
        this.onSubmitCheckStudentWithId = this.onSubmitCheckStudentWithId.bind(this);
        this.onSubmitCheckDiploma = this.onSubmitCheckDiploma.bind(this);
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
                
                <Button
                        type='submit'
                        onClick={this.onSubmitCheckDiploma}
                    >
                        CheckDiploma
                </Button>
                <Button
                        type='submit'
                        onClick={this.onSubmitCreateStudent}
                    >
                        CreateStudent
                </Button>
                <Button
                        type='submit'
                        onClick={this.onSubmitCreateSchool}
                    >
                        CreateSchool
                </Button>
                <Button
                        type='submit'
                        onClick={this.onSubmitCheckStudent}
                    >
                        CheckStudent
                </Button>
                <Button
                        type='submit'
                        onClick={this.onSubmitCheckStudentWithId}
                    >
                        CheckStudentWithId
                </Button>
               
            </div>
        );
    }

    onChange(event) {
        this.setState({function: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.history.push(`/${this.state.function}`)
    }

    onSubmitCreateStudent(event) {
        event.preventDefault();
         this.props.history.push(`/createStudent`)
    }

    onSubmitCreateSchool(event) {
        event.preventDefault();
         this.props.history.push(`/createSchool`)
    }

    onSubmitCheckDiploma(event) {
        event.preventDefault();
         this.props.history.push(`/checkDiploma`)
    }

    onSubmitCheckStudentWithId(event) {
        event.preventDefault();
         this.props.history.push(`/checkStudentWithId`)
    }

    onSubmitCheckStudent(event) {
        event.preventDefault();
         this.props.history.push(`/checkStudent`)
    }

   
}