import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addItemCart, fetchSingleProduct } from '../../redux/slices/products/productsSlice'

import NavAll from '../homePage/NavAll'
import { FaPlaystation, FaXbox } from 'react-icons/fa'
import { FaComputer } from 'react-icons/fa6'
import { BsNintendoSwitch } from 'react-icons/bs'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const { singleProduct } = useSelector((state: RootState) => state.productsReducer)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchSingleProduct(String(id)))
  }, [id, dispatch])

  const findCategory = () => {
    if (singleProduct && singleProduct.categoryId) {
      return singleProduct.categoryId.map((category) => {
        const foundCategory = categories.find((cat) => cat._id == category._id)

        if (foundCategory) {
          return (
            <span key={foundCategory._id} className="game-category">
              {foundCategory.title}
            </span>
          )
        }
      })
    }
    return null
  }

  const handleAddingCart = () => {
    dispatch(addItemCart(singleProduct._id))
    navigate('/cart')
  }
  if (!singleProduct) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <NavAll />
      <div className="image-container">
        <img src={`${singleProduct.image}`} alt={singleProduct.title} className="image-theme" />
        <div className="game">
          <img src={`${singleProduct.image}`} alt={singleProduct.title} width={340} />
          <div>
            <h1>{singleProduct.title}</h1>
            <p>{findCategory()}</p>

            <p className="price">${singleProduct.price != 0 ? singleProduct.price : 'free'}</p>
            {/* <p>⭐{singleProduct.rate}/5</p> */}
          </div>
        </div>
        <div className="description">
          <h2>description</h2>
          <p>{singleProduct.description}</p>
          <br />
          <h3 style={{ color: 'green', fontWeight: 'bolder' }}>in stock</h3>
          <ul>
            <li>shopping in 24 hours</li>
            <li>only in saudi arabia</li>
          </ul>
        </div>
        <div className="dawn-game">
          <button type="button" onClick={handleAddingCart}>
            add to cart
          </button>

          {/* <div> */}
          {/* {singleProduct.variants && singleProduct.variants.some((va) => va === 'PS5') && (
              <FaPlaystation />
            )}
            {singleProduct.variants && singleProduct.variants.some((va) => va === 'Xbox One') && (
              <FaXbox />
            )}
            {singleProduct.variants && singleProduct.variants.some((va) => va === 'PC') && (
              <FaComputer />
            )}
            {singleProduct.variants &&
              singleProduct.variants.some((va) => va === 'Nintendo Switch') && <BsNintendoSwitch />} */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
