import React, { Component } from 'react' ;
import { Button, Modal } from 'react-bootstrap';

export class PopupCheckDegree extends Component {

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
          Check Degree
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          Informations: {this.props.infos}
        </div>
        <div className='container'>
          Result: {this.props.answer}
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={this.props.onHide}>Close</Button>
        <Button variant="primary" onClick={this.props.onSubmit}>Check Degree</Button>
      </Modal.Footer>
    </Modal>

    );
}

}

 export default PopupCheckDegree;
