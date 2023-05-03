import { useEffect, useState } from "react"
import { Button, Row } from "react-bootstrap"
import DeviceItem from "./DeviceItem"
import { useSelector } from 'react-redux'


const DeviseList = () => {
  const [products, setProducts] = useState([])
  const {brand, type } = useSelector((state) => state.query)
  const [page, setPage] = useState(1)
  const limit = 8

  const next = products.length < limit

  const searchParams = new URLSearchParams();
  searchParams.append('page', page);
  searchParams.append('limit', limit)
  if (brand) {
    searchParams.append('brand', brand);
    searchParams.append('limit', limit)
  }
  if (type) {
    searchParams.append('type', type);
    searchParams.append('limit', limit)
  }
  const queryString = searchParams.toString();
  

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://e-shop-backend.herokuapp.com/product/getProducts?${queryString}`)
      const json = await response.json()
      setProducts(json)
    }
    fetchProducts()

  },[brand, type, queryString]) 
  return (
    <div>
      <Row className=" d-flex">
        {products.map(product => 
          <DeviceItem key={product._id} product={product} />
        )}
      </Row>
      <Row>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</Button>
          <span className="mx-3 my-3">Page {page} </span>
        <Button className="mb-5" onClick={() => setPage(page + 1)} disabled={next}>Next</Button>
      </Row>
    </div>
  )
}

export default DeviseList