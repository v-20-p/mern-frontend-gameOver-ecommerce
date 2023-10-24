import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from 'react-icons/fa6';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { searchProduct } from '../../redux/slices/products/productVisitorSlice';


const Navbar = () => {

  const [searchValue, setSearchValue] = useState("")
  
  const dispatch=useDispatch<AppDispatch>()

  const handleSearchChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const searchInput=e.target.value
    setSearchValue(searchInput)
  }
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    dispatch(searchProduct(searchValue))
    setSearchValue("")
  }


  return (
    <nav>
      <div>logo</div>

      <div>
        <ul>
          <li>
            <Link to={''}>home</Link>
          </li>
          <li>
            <Link to={''}>product</Link>
          </li>
          <li>
            <Link to={''}>contact</Link>
          </li>
        </ul>
      </div>

      <div className='search-container'>
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
            <input type="search" name="searchPrpduct" value={searchValue} id="" onChange={handleSearchChange}  />
            <IoSearch className="icon"/>
        </form>

        <div >
            <FaRegUser/>
        </div>
        <div>
        <AiOutlineShoppingCart/>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
