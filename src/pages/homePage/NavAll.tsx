import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { IoSearch } from 'react-icons/io5'
import { FaRegUser } from 'react-icons/fa6'
import { BiLogIn } from 'react-icons/bi'

import { AiOutlineShoppingCart } from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { searchProduct } from '../../redux/slices/products/productsSlice'
import { logout } from '../../redux/slices/products/usersSlice'

import { SiGamejolt } from 'react-icons/si'

const NavAll = () => {
  const [searchValue, setSearchValue] = useState('')
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)
  const { cart } = useSelector((state: RootState) => state.productsReducer)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value
    setSearchValue(searchInput)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(searchProduct(searchValue))
    navigate('/products')
    setSearchValue('')
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <nav className="nav-all">
        <p className="logo">
          GAME
          <SiGamejolt />
          OVER
        </p>

        <div>
          <ul>
            <li>
              <Link to={'/'}>home</Link>
            </li>
            <li>
              <Link to={'/products'}>product</Link>
            </li>
            {userLoginData?.isAdmin  && (
              <li>
                <Link to="/dashboard/admin/users">admin</Link>
              </li>
            )}
            {userLoginData && (
              <li>
                <Link to={'/dashboard/vistor'}>profile</Link>
              </li>
            )}
            {!userLoginData && (
              <li>
                <Link to={'/register'}>register</Link>
              </li>
            )}
          </ul>
        </div>

        <div className="search-container">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="search"
              name="searchPrpduct"
              value={searchValue}
              id=""
              onChange={handleSearchChange}
            />
            <IoSearch className="icon" />
          </form>

          {!userLoginData ? (
            <div>
              <Link to="/login">
                <FaRegUser />
              </Link>
            </div>
          ) : (
            <div>
              <BiLogIn onClick={handleLogout} style={{ cursor: 'pointer' }} />
            </div>
          )}

          <div>
            <Link to="/cart">
              <AiOutlineShoppingCart />
            </Link>
            <span className="numberCart">{cart.length > 0 && cart.length}</span>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavAll
