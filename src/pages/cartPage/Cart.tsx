import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { deleteItemCart } from '../../redux/slices/products/productVisitorSlice'

const Cart = () => {
  const { cart } = useSelector((state: RootState) => state.productsVistorReducer)
  const dispatch = useDispatch<AppDispatch>()
  const handleDeleteCart = (id: number) => {
    const deletedItem = cart.find((item) => item.id === id)

    if (deletedItem) {
      const updatedCart = cart.filter((item) => item.id != deletedItem.id)
      dispatch(deleteItemCart(updatedCart))
    }
  }

  return (
    <div>
      <h1>cart</h1>
      <div>
        {cart.length > 0 ? (
      
            <div>
              {cart.map(({ id, image, name }) => (
                <div key={id}>
                  <img src={image} alt={name} width="50" />
                  <p>{name}</p>
                  <input type="button" value="delete" onClick={() => handleDeleteCart(id)} />
                </div>
              ))}
            </div>
        
        ) : (
          <div>nothing in cart</div>
        )}
      </div>
    </div>
  )
}

export default Cart
