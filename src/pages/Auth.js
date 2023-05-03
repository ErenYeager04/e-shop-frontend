import { Button, Card, Container, Form, Row, Col } from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import { SIGNUP_ROUTE } from "../utils/consts"
import { LOGIN_ROUTE } from "../utils/consts"
import { useState } from "react"
import { useLogin } from "../utils/useLogin"
import { useSignup } from "../utils/useSignup"


const Auth = () => {
  const { login, error } = useLogin()
  const { signup, error: error1 } = useSignup()
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    if(isLogin){
      await login(email, password)

    }else {
      await signup(email, password)
    }
  }
  return (
  <Container className="d-flex justify-content-center align-items-center vh-100">
    <Card className="p-5">
      <h2 className="text-center">{isLogin ? "Login" : "Sign up"}</h2>
      <Form className="d-flex flex-column">
        <Form.Control 
        className="mt-3" 
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email} 
        placeholder="Your email" />
        <Form.Control 
        className="mt-3" 
        placeholder="Your password"
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password} />
        {(error || error1) && <div className="text-danger mt-1">{error || error1}</div>}
        <Row className="mt-3">
          {isLogin ? (
            <Col className="text-center">
              Don't have an account? <NavLink to={SIGNUP_ROUTE}>Sign up</NavLink>
            </Col>
          ) : (
            <Col className="text-center">
              Already have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
            </Col>
          )}
          <Col className="text-center">
            <Button variant="outline-success" onClick={handleSubmit} className="w-100">
              {isLogin ? "Login" : "Sign up"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  </Container>

  )
}

export default Auth
