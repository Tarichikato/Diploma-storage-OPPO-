import React, { Component } from 'react';
import { Button, Header, Form, Image, Container} from 'semantic-ui-react';

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

                <Container as='h2'>
                    <p>
                        This application allows you to know if your candidates has the real diploma of his school!
                    </p>
                </Container>
                
                <Container as='h3'>
                    <p>
                        Please, enter the address contract : 
                    </p>
                </Container>

                <Form>
                    <Form.Input
                        type='text'
                        value={this.state.address}
                        onChange={this.onChange}
                    />


                    <Button basic color = 'red' content='Submit'
                        type='submit'
                        onClick={this.onSubmit}
                    >
                        
                       
                    </Button>
                </Form>

                <Image src='https://i0.wp.com/kryptosphere.org/wp-content/uploads/2019/08/logo-sans-fondnegatifnoir.png?fit=940%2C788&ssl=1' size='small' circular />
            
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