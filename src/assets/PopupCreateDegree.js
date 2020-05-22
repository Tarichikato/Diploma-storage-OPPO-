import React, { Component } from 'react' ;
import { Button, Modal } from 'react-bootstrap';

export class PopupCreateDegree extends Component {

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
        <p className='container'>
            Tes sur de vouloir créer un diplome? C'est irréversible poto
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={this.props.onSubmit}>Yes bro</Button>
        <Button variant="danger" onClick={this.props.onHide}>No! Close</Button>
      </Modal.Footer>
    </Modal>

    );
}
   
}
  
 export default PopupCreateDegree;
