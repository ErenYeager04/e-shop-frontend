import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux'

const RatingModal = ({ showModal, handleClose, _id }) => {
  const { token } = useSelector((state) => state.user)
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    const data = { _id, rating }

    const response = await fetch(`https://e-shop-backend.herokuapp.com/product/addRating`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      setError(null)
      handleClose();
    }

    if(!response.ok){
      setError(json)
    }
    // Close modal
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rating</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="rating">
          <Form.Label>Rating:</Form.Label>
          <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
      {error && <div className="text-danger mt-1">{error}</div>}
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RatingModal;
