import React, { Component } from 'react' ;
import { Button, Modal } from 'react-bootstrap';

export class PopupAddAddress extends Component {

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
          Create Degree
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='container'>
        Address: {this.props.address}
      </div>
      <div className='container'>
        Level: {this.props.lv}
      </div>
      <div className='container'>
        School: {this.props.schoolName}
      </div>
      
    </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={this.props.onSubmit}>Save</Button>
        <Button variant="primary" onClick={this.props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>

    );
}
   
}
  
 export default PopupAddAddress;
