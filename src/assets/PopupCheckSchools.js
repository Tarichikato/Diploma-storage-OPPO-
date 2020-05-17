import React, { Component } from 'react' ;
import { Button, Modal } from 'react-bootstrap';

export class PopupCheckSchools extends Component {

    constructor(props) {
        super(props);
    }

render () {
  return (

      <Modal
    {...this.props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Check School
      </Modal.Title>
    </Modal.Header>
      <Modal.Body>
      <div className='container'>
        School: {this.props.firstName}
      </div>
      <div className='container'>
        Result: {this.props.answer}
      </div>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={this.props.onHide}>Close</Button>
      <Button variant="primary" onClick={this.props.onSubmit}>Check School</Button>
    </Modal.Footer>
  </Modal>

  );
}

}

 export default PopupCheckSchools;
