import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import CartModal from "./CartModal";
import { useSelector } from 'react-redux'

const CartItem = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useSelector((state) => state.user)
  const [error, setError] = useState(null)

  const handleRemove = async () => {
    const data = { _id: product.productId }
    console.log(data)
    
    const response = await fetch(`https://e-shop-backend.herokuapp.com/cart/deleteProduct`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      setError(null)
      window.location.reload()
    }

    if(!response.ok){
      setError(json)
    }

  };

  const handleRedactClick = () => {
    setShowModal(true);
  };

  return (
    <tr>
      <td>
        <img src={product.img} alt={product.title} width="50" />
        {product.title}
      </td>
      <td>{product.quantity}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>${(product.price * product.quantity).toFixed(2)}</td>
      <td>
        <Button variant="danger" className="my-2 mx-1" onClick={handleRemove}>
          Remove
        </Button>
        <Button
          variant="secondary"
          className="mx-1"
          onClick={handleRedactClick}
        >
          Redact
        </Button>
        <CartModal
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          _id={product.productId}
        />
        {error && <div className="text-danger mt-1">{error}</div>}
      </td>
    </tr>
  );
};

export default CartItem;
