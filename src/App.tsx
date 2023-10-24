import { ProductsManager } from './adminComponents/ProductsManager'
import {BrowserRouter , Routes , Route} from 'react-router-dom'

import './App.css'
import Home from './pages/homePage/Home'


function App() {
  return (
    <div className="App">
      {/* <h1>Vite + React + Toolkit + Tailwind</h1> */}
      {/* <ProductsManager /> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
