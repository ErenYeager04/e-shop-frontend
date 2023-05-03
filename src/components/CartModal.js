import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux'

const CartModal = ({ showModal, handleClose, _id, }) => {
  const { token } = useSelector((state) => state.user)
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    const data = { _id, quantity}
    
    const response = await fetch(`https://e-shop-backend-bd4c.onrender.com/cart/makeCart`, {
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

  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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

export default CartModal