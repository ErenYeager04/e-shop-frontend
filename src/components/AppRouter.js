
import Admin from "../pages/Admin"
import Cart from "../pages/Cart"
import ProductPage from "../pages/ProductPage"
import Auth from "../pages/Auth"
import Shop from "../pages/Shop"
import {Routes, Route, Navigate}  from 'react-router-dom'
import { ADMIN_ROUTE, CART_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE, SHOP_ROUTE } from "../utils/consts"
import { useSelector } from 'react-redux'



const AppRouter = () => {
  const {usesId} = useSelector((state) => state.user)
  const user = true

  return (
    <Routes >
        <Route key={ADMIN_ROUTE} path={ADMIN_ROUTE} element={user ? <Admin/> : <Navigate to={SHOP_ROUTE}/>}exact/>
        <Route key={CART_ROUTE} path={CART_ROUTE} element={user ? <Cart/> : <Navigate to={SHOP_ROUTE}/>} exact/> 
        <Route key={SHOP_ROUTE} path={SHOP_ROUTE} element={<Shop/>} exact/>
        <Route key={LOGIN_ROUTE} path={LOGIN_ROUTE} element={<Auth/>} exact/>
        <Route key={SIGNUP_ROUTE} path={SIGNUP_ROUTE} element={<Auth/>} exact/>
        <Route key={PRODUCT_ROUTE} path={PRODUCT_ROUTE} element={<ProductPage/>} exact/>
    </Routes>
  )
}

export default AppRouter