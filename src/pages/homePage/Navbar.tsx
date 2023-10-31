import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { IoSearch } from 'react-icons/io5'
import { FaRegUser } from 'react-icons/fa6'
import { BiLogIn } from 'react-icons/bi'


import { AiOutlineShoppingCart } from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { searchProduct } from '../../redux/slices/products/productsSlice'
import { logoutUser } from '../../redux/slices/products/usersSlice'

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('')
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)
  const { cart } = useSelector((state: RootState) => state.productsReducer)
  const dispatch = useDispatch<AppDispatch>()
  const navigate= useNavigate()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value
    setSearchValue(searchInput)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(searchProduct(searchValue))
    navigate("/products")
    setSearchValue('')
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
    <nav>
      <p>logo</p>

      <div>
        <ul>
          <li>
            <Link to={'/'}>home</Link>
          </li>
          <li>
            <Link to={'/products'}>product</Link>
          </li>
          {userLoginData?.role=="admin"&& 
          <li>
          <Link to="/dashboard/admin">
          admin 
        </Link>
        </li>
        }
        {userLoginData &&
        <li><Link to={"/dashboard/profile"}>profile</Link></li>
        }
        
        </ul>
      </div>

      <div className="search-container">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="search"
            name="searchPrpduct"
            value={searchValue}
            id=""
            style={{color:"white"}}
            onChange={handleSearchChange}
          />
          <IoSearch className="icon" />
        
        </form>

        {!userLoginData ? (
          <div>
            <Link to="login">
              <FaRegUser />
            </Link>
          </div>
        ) : (
          <div>
          <BiLogIn onClick={handleLogout} style={{cursor:"pointer"}}/>
         
         
          
          </div>
        )}

        <div>
          <Link to="/cart">
            <AiOutlineShoppingCart />
          </Link>
          <span>{cart.length > 0 && cart.length}</span>
        </div>
        

          
          
        

      </div>
      
    </nav>
    <hr />
    </>
  )
}

export default Navbar
