import React, { Component } from 'react' ;
import { Button, Modal } from 'react-bootstrap';

export class PopupCDiploma extends Component {

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
          Check Diploma
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='container'>
           Result :  
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    );
}
   
}
  
 export default PopupCDiploma;