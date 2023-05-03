import { Card, Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import CartModal from "./CartModal"
import RatingModal from "./RatingModal"

const DeviceItem = ({product}) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false)
  
  const handleImgClick = () => {
    navigate(`/product/${product._id}`);
  };
  
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Card className="mb-4"  style={{cursor: 'pointer'}}>
        <Card.Img onClick={handleImgClick} style={{objectFit: 'cover', height: '180px'}} variant="top" src={product.img} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.price}$</Card.Text>
          <Button variant="primary" onClick={() => setShowModal(true)}>Add to Cart</Button>
          <CartModal showModal={showModal} handleClose={() => setShowModal(false)} _id={product._id} />
          <Button variant="secondary" className="ms-2 my-2" onClick={() => setShowRatingModal(true)}>Rate</Button>
          <RatingModal showModal={showRatingModal} handleClose={() => setShowRatingModal(false)} _id={product._id} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DeviceItem;

