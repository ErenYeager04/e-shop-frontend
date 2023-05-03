import { useEffect } from "react"
import Container from 'react-bootstrap/Container';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, SIGNUP_ROUTE, CART_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from '../store/userSlice'
import { useLogout } from '../utils/useLogout'

const NavBar = () => {
  const dispatch = useDispatch()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
  
    if(user) {
      dispatch(addUser(user))
    }
  }, [dispatch])

  const {userId} = useSelector((state) => state.user)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <Link className="navbar-brand" to={SHOP_ROUTE}>E-shop</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ">
            {userId ?
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to={ADMIN_ROUTE}>Admin</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={CART_ROUTE}>Cart</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleClick}>Log out</button>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={LOGIN_ROUTE}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={SIGNUP_ROUTE}>Signup</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </Container>
    </nav>
  )
}

export default NavBar

