import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"


const Admin = () => {
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.user)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(null)


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("img", img);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("type", type);

    const response = await fetch(`https://e-shop-backend.herokuapp.com/product/makeProduct`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      setError(null)
      setTitle('')
      setBrand('')
      setDesc('')
      setPrice('')
      setType('')
      setImg(null)
      navigate(`/`);

    }
    
    if (!response.ok){
      setError("Fields suppose to be filled")
    }
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <Container>
      <h1>Add new product</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="img">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>
        {error && <div className="text-danger mt-1">{error}</div>}
        <Button variant="primary" className=" my-4" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Admin;

