import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import CartModal from "../components/CartModal"
import RatingModal from "../components/RatingModal"
import { FaStar } from 'react-icons/fa';

const DevicePage = () => {
  const url = new URL(window.location.href);
  const id = url.pathname.split('/')[2];
  const [product, setProduct] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [ratings, setRatings] = useState([])
  const [showRatingModal, setShowRatingModal] = useState(false)


  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`https://e-shop-backend.herokuapp.com/product/getProducts/${id}`)
      const json = await response.json()
      const ratings = await json.rating
      const rating = await ratings.map(r => {return r.rating})
      setRatings(rating)
      if (!response.ok) {
        setProduct(null)
      }
  
      if (response.ok) {
        setProduct(json)

      }
  
    }
    fetchWorkouts()
    
  }, [id])
  
  function calculateAverage(array) {
    var total = 0;
    var count = 0;

    array.forEach(function(item, index) {
        total += item;
        count++;
    });

    return total / count;
  }
  const avgRating = calculateAverage(ratings)
  return (
    <Container className="my-5">
      {product && (
        <>
          <Row>
            <Col md={6}>
              <Card>
                <Card.Img variant="top" src={product.img} />
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>{product.brand} {product.title}</Card.Title>
                  <Card.Text>{product.desc}</Card.Text>
                  <hr />
                  <h5>Product Information:</h5>
                  <p>Price: ${product.price}</p>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <Button variant="secondary" className="ms-2 " onClick={() => setShowRatingModal(true)}>Rate</Button>
                      <RatingModal showModal={showRatingModal} handleClose={() => setShowRatingModal(false)} _id={product._id} />
                    </Col>
                    <Col md={6}>
                      <Button variant="primary" onClick={() => setShowModal(true)}>Add to Cart</Button>
                      <CartModal showModal={showModal} handleClose={() => setShowModal(false)} _id={product._id} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="my-5">
          <Col>
            <h3>Product Reviews</h3>
            <div className="d-flex align-items-center">
              <div className="me-2">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={index}
                      size={20}
                      color={ratingValue <= avgRating ? "#ffc107" : "#e4e5e9"}
                      style={{ border: "1px solid #ccc", borderRadius: "50%" }}
                    />
                  );
                })}
              </div>
              <span>({avgRating} stars)</span>
            </div>
          </Col>
          </Row>
        </>
      )}
    </Container>
  )
}



export default DevicePage
