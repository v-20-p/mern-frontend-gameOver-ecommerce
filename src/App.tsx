import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.scss'
import { useEffect } from 'react'
import Cart from './pages/cartPage/Cart'
import Admin from './pages/admin/Admin'
import Home from './pages/homePage/Home'
import Login from './pages/registrationPages/Login'
import VistorProfile from './pages/profile/VistorProfile'

import ProtectedLoginRoute from './protectedRoutes/ProtectedLoginRoute'
import ProtectedRoleRoute from './protectedRoutes/ProtectedRoleRoute '
import ManageUsers from './pages/admin/ManageUsers'
import ManageCategories from './pages/admin/ManageCategories'
import ManageProducts from './pages/admin/ManageProducts'
import ListOrders from './pages/admin/ListOrders'
import ProductDetails from './pages/productPage/ProductDetails'
import Register from './pages/registrationPages/Register'

import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import { fetchUsers } from './redux/slices/products/usersSlice'
import { fetchProductItem } from './redux/slices/products/productsSlice'
import { fetchCategories } from './redux/slices/products/categorySlice'

import Products from './pages/productPage/Products'

import { AiFillFacebook, AiFillLinkedin } from 'react-icons/ai'
import { FaTwitterSquare } from 'react-icons/fa'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchProductItem())
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/login" element={<Login />} ></Route>
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<ProtectedLoginRoute />}>
            <Route path="/dashboard/vistor" element={<VistorProfile />} />
          </Route>

          <Route path="/cart" element={<Cart />} />

          <Route path="/dashboard" element={<ProtectedRoleRoute />}>
            <Route path="/dashboard/admin" element={<Admin />}>
              <Route path="/dashboard/admin/users" element={<ManageUsers />} />
              <Route path="/dashboard/admin/categories" element={<ManageCategories />} />
              <Route path="/dashboard/admin/products" element={<ManageProducts />} />
              <Route path="/dashboard/admin/orders" element={<ListOrders />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <footer>
        <hr />
        <div className="footer-content">
          <div>
            <h3>Powered by</h3>
            <p>GAME over</p>
          </div>

          <div style={{ width: '20vw' }}>
            <h3>About Us</h3>
            <p>
              We are a passionate team of gamers who love to provide you with the best gaming
              experience.
            </p>
          </div>

          <div>
            <h3>Products</h3>
            <ul style={{ display: 'block' }}>
              <li>Games</li>
              <li>Gaming Consoles</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h3>Contact Us</h3>
            <p>Feel free to reach out to us on social media:</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '30px' }}>
              <AiFillFacebook />
              <FaTwitterSquare />
              <AiFillLinkedin />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
