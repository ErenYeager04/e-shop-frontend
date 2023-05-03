
import DeviseList from '../components/DeviseList';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { makeQuery } from '../store/querySlice'

const Shop = () => {
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const dispatch = useDispatch()
  const [uniqueBrands, setUniqueBrands] = useState([])
  const [uniqueTypes, setUniqueTypes] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://e-shop-backend.herokuapp.com/product/getProducts`)
      const json = await response.json()
      const allBrands = json.map(product => product.brand);
      const uniqueBrands = [...new Set(allBrands)];
      setUniqueBrands(uniqueBrands)

      const allTypes = json.map(product => product.type);
      const uniqueTypes = [...new Set(allTypes)];
      setUniqueTypes(uniqueTypes)

    }
    fetchProducts()

  },[])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your code to handle the form submission\
    dispatch(makeQuery({brand,type}))

  }
  return (
    <Container>
      <Row className=' mt-3'>
      <Col md={3}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='type'>
              <Form.Label>Type</Form.Label>
              <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value=''>Select a type</option>
                {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Select value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value=''>Select a brand</option>
                {uniqueBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </Form.Select>
            </Form.Group>
            <Button variant='primary' type='submit' className='my-3'>
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <DeviseList/>
        </Col>
      </Row>
    </Container>
  )
}

export default Shop