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
        <div className='container'>
          Result: {this.props.diplomaResult}
        </div>
        <div className='container'>
          Student: {this.props.students}
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={this.props.onHide}>Close</Button>
        <Button variant="primary" onClick={this.props.onSubmit}>Check Diploma</Button>
      </Modal.Footer>
    </Modal>

    );
}
   
}
  
 export default PopupCDiploma;