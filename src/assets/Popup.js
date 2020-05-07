import React, { Component } from 'react' ;
import { Button, Modal } from 'react-bootstrap';

export class Popup extends Component {

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
        <div className='container'>
            Tes sur de vouloir créer un étudiant? C'est irréversible poto
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={this.props.onSubmit}>Yes bro</Button>
        <Button variant="primary" onClick={this.props.onHide}>No! Close</Button>
      </Modal.Footer>
    </Modal>

    );
}
   
}
  
 export default Popup;