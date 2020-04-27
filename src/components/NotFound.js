import React, { Component } from 'react';
import { Button, Header, Form} from 'semantic-ui-react';

export class NotFound extends Component {

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
                <Header as='h1'>Error 1 (Yes we don't have so much imagination) </Header>
                <p>
                    Click on the button "Home" to go back in a safe place
                </p>

                
            </div>
        );
    }

    onChange(event) {
        this.setState({address: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.history.push(`/createStudent/${this.state.address}`)
    }
}