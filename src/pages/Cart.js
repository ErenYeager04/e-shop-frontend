import { useSelector } from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';

const Cart = () => {
  const [cart, setCart] = useState([])
  const {token} = useSelector((state) => state.user)
  const [message, setMessage] = useState(false)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`https://e-shop-backend-bd4c.onrender.com/cart/getProductsFromCart`, {  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      const json = await response.json()
  
      if (response.ok) {
        setCart(json)
      }
  }
    if(token) {
      fetchWorkouts()}
  }, [token ])

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total
  };

  return (
    <Container>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((product, index) => (
              <CartItem key={index} product={product} />
            ))}
            <tr>
              <td colSpan={3}></td>
              <td>
                <strong>Total:</strong> ${getTotalPrice().toFixed(2)}
              </td>
              <td>
                <Button variant="primary"onClick={() => setMessage(!message)}>Checkout</Button>
                {message && <div className="text-danger mt-1">I have exams, no time</div>}
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default Cart