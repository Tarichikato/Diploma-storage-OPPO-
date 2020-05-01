import React, { Component } from 'react';
import { Button, Header, Form} from 'semantic-ui-react';

export class Home extends Component {

    state = {
        function: ''
    }

    constructor(props) {
        super(props);

        this.onSubmitCreateStudent = this.onSubmitCreateStudent.bind(this);
        this.onSubmitCreateDiploma = this.onSubmitCreateDiploma.bind(this);
        this.onSubmitCreateSchool = this.onSubmitCreateSchool.bind(this);
        this.onSubmitCheckStudent = this.onSubmitCheckStudent.bind(this);
        this.onSubmitCheckStudentWithId = this.onSubmitCheckStudentWithId.bind(this);
        this.onSubmitCheckDiplomaWithId = this.onSubmitCheckDiplomaWithId.bind(this);
        this.onSubmitCheckSchoolWithId = this.onSubmitCheckSchoolWithId.bind(this);
        this.onSubmitCheckDiploma = this.onSubmitCheckDiploma.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div>

                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="https://kryptosphere.org/" target="_blank"> Kryptosphere | DiplomaStorage</a>
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
                    
                    
                </Form>
                <p>&emsp;</p>

                &emsp;&emsp;
                <Button
                        type='submit'
                        onClick={this.onSubmitCheckDiploma}
                    >
                        CheckDiploma
                </Button>
                &emsp;
                <Button
                        type='submit'
                        onClick={this.onSubmitCreateStudent}
                    >
                        CreateStudent
                </Button>
                &emsp;
                <Button
                        type='submit'
                        onClick={this.onSubmitCreateSchool}
                    >
                        CreateSchool
                </Button>
                &emsp;
                <Button
                        type='submit'
                        onClick={this.onSubmitCreateDiploma}
                    >
                        CreateDiploma
                </Button>
                <br />
                &emsp;
                <Button
                        type='submit'
                        onClick={this.onSubmitCheckStudent}
                    >
                        CheckStudent
                </Button>
                &emsp;
                <Button
                        type='submit'
                        onClick={this.onSubmitCheckStudentWithId}
                    >
                        CheckStudentWithId
                </Button>
                &emsp;
                <Button
                        type='submit'
                        onClick={this.onSubmitCheckDiplomaWithId}
                    >
                        CheckDiplomaWithId
                </Button>
                &emsp;
                <Button
                        type='submit'
                        onClick={this.onSubmitCheckSchoolWithId}
                    >
                        CheckSchoolWithId
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


    onSubmitCreateDiploma(event) {
        event.preventDefault();
         this.props.history.push(`/createDiploma`)
    }

    onSubmitCheckDiploma(event) {
        event.preventDefault();
         this.props.history.push(`/checkDiploma`)
    }

    onSubmitCheckStudentWithId(event) {
        event.preventDefault();
         this.props.history.push(`/checkStudentWithId`)
    }

    onSubmitCheckSchoolWithId(event) {
        event.preventDefault();
         this.props.history.push(`/checkSchoolWithId`)
    }

    onSubmitCheckDiplomaWithId(event) {
        event.preventDefault();
         this.props.history.push(`/checkDiplomaWithId`)
    }

    onSubmitCheckStudent(event) {
        event.preventDefault();
         this.props.history.push(`/checkStudent`)
    }

   
}