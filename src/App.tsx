import { ProductsManager } from './adminComponents/ProductsManager'
import {BrowserRouter , Routes , Route} from 'react-router-dom'

import './App.css'

import Home from './pages/homePage/Home'
import Login from './pages/registrationPages/Login'
import VistorProfile from './pages/profile/VistorProfile'
import ProtectedLoginRoute from './protectedRoutes/ProtectedLoginRoute'
import Cart from './pages/cartPage/Cart'


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='login' element={<Login/>}/>

        <Route path='/dashboard' element={<ProtectedLoginRoute/>} >
            <Route path='/dashboard/prfile' element={<VistorProfile/>} />
        </Route>

        <Route path='cart' element={<Cart/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
