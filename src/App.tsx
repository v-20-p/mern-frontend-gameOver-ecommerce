import { ProductsManager } from './adminComponents/ProductsManager'
import {BrowserRouter , Routes , Route} from 'react-router-dom'

import './App.css'

import Cart from './pages/cartPage/Cart'
import Admin from './pages/admin/Admin'
import Home from './pages/homePage/Home'
import Login from './pages/registrationPages/Login'
import VistorProfile from './pages/profile/VistorProfile'

import ProtectedLoginRoute from './protectedRoutes/ProtectedLoginRoute'
import ProtectedRoleRoute from './protectedRoutes/ProtectedRoleRoute '




function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='login' element={<Login/>}/>

        <Route path='/dashboard' element={<ProtectedLoginRoute/>} >
            <Route path='/dashboard/profile' element={<VistorProfile/>} />
        </Route>

        <Route path='cart' element={<Cart/>}/>

        <Route path='/dashboard' element={<ProtectedRoleRoute/>}>
          <Route path='/dashboard/admin' element={<Admin/>}/>
        </Route> 
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
