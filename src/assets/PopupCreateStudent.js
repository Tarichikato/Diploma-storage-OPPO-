import React, { Component } from 'react' ;
import { Button, Modal } from 'react-bootstrap';

export class PopupCreateStudent extends Component {

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
          Create Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='container'>
            Etes vous sur de vouloir créer un étudiant sur la blockchain Ethereum? Cette action est irréversible. 
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={this.props.onSubmit}>Oui</Button>
        <Button variant="danger" onClick={this.props.onHide}>Non</Button>
      </Modal.Footer>
    </Modal>

    );
}
   
}
  
 export default PopupCreateStudent;