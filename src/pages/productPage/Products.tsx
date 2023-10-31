import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'

import { Product, addItemCart, sortProduct } from '../../redux/slices/products/productsSlice'

import Category from '../homePage/Category'
import { Link } from 'react-router-dom'
import Navbar from './../homePage/Navbar'
import NavAll from '../homePage/NavAll'
import { BsFilterLeft } from 'react-icons/bs'
import { BsFillPlusCircleFill } from 'react-icons/bs'

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productsVistor = useSelector((state: RootState) => state.productsReducer)
  const categories = useSelector((state: RootState) => state.categoryReducer)
  const [show, setShow] = useState(false)

  const itemsPerPage =10
  const [currentPage, setCurrentPage] = useState(1)

  //searching
  let searchItems: Product[] = []
  if (productsVistor.searchTirm) {
    searchItems = productsVistor.items.filter((item) => {
      const searchValue = productsVistor.searchTirm.toString().toLowerCase()
      return item.name.toLowerCase().includes(searchValue)
    })
  }
  let filtterdItems = productsVistor.items

  const totalPages = Math.ceil(filtterdItems.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  let currentItems = filtterdItems.slice(indexOfFirstItem, indexOfLastItem)
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }
  if (categories.filter) {
    filtterdItems = productsVistor.items.filter((item) =>
      item.categories.some((cat) => categories.filter!.includes(cat))
    )
    if (filtterdItems.length == 0) {
      filtterdItems = productsVistor.items
    }
    currentItems = filtterdItems.slice(indexOfFirstItem, indexOfLastItem)
    
  }


  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingSelect = e.target.value
    dispatch(sortProduct(sortingSelect))
  }
  const handleAddingCart = (id: number) => {
    const itemToCart = productsVistor.items.find((product) => product.id === id)
    if (itemToCart) {
      dispatch(addItemCart(itemToCart))
    }
  }



  const renderPageNumbers = pageNumbers.map((number) => (
    <button key={number} onClick={() => handlePageChange(number)}>
      {number}
    </button>
  ))

  return (
    <section>
      <NavAll />
      {productsVistor.isLoading && <h3> Loading products...</h3>}
      {productsVistor.searchTirm && <p> search : {productsVistor.searchTirm}</p>}

      {searchItems.length > 0 && (
        <>
          <div className="productsVistor-container">
            {searchItems.map((product) => (
              <div key={product.id}>
                <img src={product.image} alt={product.name} width="50" />
                <p>{product.name}</p>
                <input type="button" value="add to cart" />
              </div>
            ))}
          </div>
          <hr />
        </>
      )}
      <h2 className="h2-title">
        All games <BsFilterLeft className="filter" onClick={() => setShow(!show)} />
      </h2>

      <div className={`filter-items ${show ? 'show' : ''}`}>
        <Category />

        <div className="custom-select">
          <label htmlFor="sorting">sort by : </label>
          <select name="sorting" onChange={handleSorting}>
            <option value="">none</option>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </div>
      </div>
      <hr className="hr-black" />
      <div className="products-container">
        {currentItems.map((item) => (
          <div key={item.id} className="product3">
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} width={200} />
            </Link>

            <h3>
              {item.name} {item.id}
            </h3>
            <p>{item.description.slice(0, 15)}..read more</p>
            <div className="center-plus">
              <BsFillPlusCircleFill className="plus" onClick={() => handleAddingCart(item.id)} />
            </div>
            <div>
              <span>price : ${item.price == 0 ? 'free ' : item.price}</span>
              <span>⭐ {item.rate}</span>
            </div>
          </div>
        ))}
        
      </div>
      <hr  className='hr-black'/>
      <div className="pagination">{renderPageNumbers}</div>
    </section>
  )
}

export default Products
