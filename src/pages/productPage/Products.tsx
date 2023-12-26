import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, cssTransition, toast } from 'react-toastify'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch, RootState } from '../../redux/store'
import {
  Product,
  addItemCart,
  fetchProductItem,
  quantity,
  sortProduct
} from '../../redux/slices/products/productsSlice'

import Category from '../homePage/Category'
import { Link } from 'react-router-dom'

import NavAll from '../homePage/NavAll'
import { BsFilterLeft } from 'react-icons/bs'

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productsVistor = useSelector((state: RootState) => state.productsReducer)
  const categories = useSelector((state: RootState) => state.categoryReducer)
  const [show, setShow] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(
      fetchProductItem({
        page: currentPage,
        filter: categories.filter ? categories.filter.join(',') : '',
        sortBy: productsVistor.sortState,
        limit: 8,
        search:productsVistor.searchTirm
        
      })
    )
  }, [currentPage, categories.filter, productsVistor.sortState,productsVistor.searchTirm])

  //searching
  let searchItems: Product[] = []
  if (productsVistor.searchTirm) {
    searchItems = productsVistor.items.filter((item) => {
      const searchValue = productsVistor.searchTirm.toString().toLowerCase()
      return item.title.toLowerCase().includes(searchValue)
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleIncrement = (id: string, count: number) => {
    dispatch(quantity({ id: id, quantity: count + 1 }))
  }

  const handleDecrement = (id: string, count: number) => {
    if (count != 1) dispatch(quantity({ id: id, quantity: count - 1 }))
  }

  const pageNumbers = []

  for (let i = 1; i <= productsVistor.totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingSelect = e.target.value
    dispatch(sortProduct(sortingSelect))
  }
  const handleAddingCart = (id: string) => {
    dispatch(addItemCart(id))
    dispatch(quantity({ id: id, quantity: 1 }))
    toast.success('Product add successfully to cart ', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <button key={number} onClick={() => handlePageChange(number)}>
      {number}
    </button>
  ))

  return (
    <section>
      <NavAll />
      <div style={{ margin: '0 80px' }}></div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <h2 className="h2-title">
        All games <BsFilterLeft className="filter" onClick={() => setShow(!show)} />
      </h2>

      <div className={`filter-items ${show ? 'show' : ''}`}>
        <Category />

        <div className="custom-select">
          <label htmlFor="sorting">sort by : </label>
          <select name="sorting" onChange={handleSorting}>
            <option value="">none</option>
            <option value="title">name</option>
            <option value="price">price</option>
          </select>
        </div>
      </div>
      <hr className="hr-black" />
      <div className="products-container">
        {productsVistor.searchTirm && (
          <p>
            {' '}
            result search of (<strong>{productsVistor.searchTirm}</strong>){' '}
          </p>
        )}
        {productsVistor.items.map((item) => (
          <div key={item._id} className="product3">
            <Link to={`/product/${item.slug}`}>
              <img src={item.image} alt={item.title} width={200} />
            </Link>

            <h3>{item.title}</h3>
            <p>{item.description.slice(0, 15)}..read more</p>

            <div>
              <span> {item.price == 0 ? 'free ' : '$'+item.price}</span>
            </div>
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => handleDecrement(String(item._id), Number(item.quantity))}>
                -
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleIncrement(String(item._id), Number(item.quantity))}>
                +
              </button>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddingCart(String(item._id))}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr className="hr-black" />
      <div className="pagination">{renderPageNumbers}</div>
    </section>
  )
}

export default Products
