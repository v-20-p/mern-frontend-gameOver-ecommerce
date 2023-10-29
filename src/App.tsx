import {BrowserRouter , Routes , Route} from 'react-router-dom'

import './App.css'

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




function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='/dashboard' element={<ProtectedLoginRoute/>} >
            <Route path='/dashboard/profile' element={<VistorProfile/>} />
        </Route>

        <Route path='/cart' element={<Cart/>}/>

        <Route path='/dashboard' element={<ProtectedRoleRoute/>}>
          <Route path='/dashboard/admin' element={<Admin/>}>
            <Route path='/dashboard/admin/users' element={<ManageUsers/>}/>
            <Route path='/dashboard/admin/categories' element={<ManageCategories/>}/>
            <Route path='/dashboard/admin/products' element={<ManageProducts/>}/>
            <Route path='/dashboard/admin/orders' element={<ListOrders/>}/>
            </Route>
        
   

          </Route>
    
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
