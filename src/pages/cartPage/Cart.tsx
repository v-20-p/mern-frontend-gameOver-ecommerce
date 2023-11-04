import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { deleteItemCart } from '../../redux/slices/products/productsSlice'

import NavAll from '../homePage/NavAll'

import { BsFillTrashFill } from 'react-icons/bs'
import { MdOutlinePayment } from 'react-icons/md'
import { FaCcApplePay, FaCcPaypal, FaCcAmazonPay } from 'react-icons/fa'
const Cart = () => {
  const { cart } = useSelector((state: RootState) => state.productsReducer)
  const dispatch = useDispatch<AppDispatch>()
  const handleDeleteCart = (cartId: number) => {
    const deletedItem = cart.find((item) => item.cartId === cartId)

    if (deletedItem) {
      const updatedCart = cart.filter((item) => item.cartId != deletedItem.cartId)

      dispatch(deleteItemCart(updatedCart))
    }
  }

  const calculateTotalPrice = () => {
    let subtotal = 0
    cart.forEach((item) => {
      subtotal += item.price
    })

    const tax = (subtotal * 0.15).toFixed(2) // 15% tax

    return {
      subtotal,
      tax,
      total: (subtotal + parseFloat(tax)).toFixed(2)
    }
  }

  const { subtotal, tax, total } = calculateTotalPrice()

  return (
    <div>
      <NavAll />

      <div>
        {cart.length > 0 ? (
          <>
            <h2 className="h2">cart</h2>
            <div className="cart">
              <div className="cart-item">
                {cart.map(({ cartId, image, name, description, price }) => (
                  <>
                    <p>{cartId}</p>
                    <hr className="hr-black" />
                    <div key={cartId} className="product4">
                      <img src={image} alt={name} />
                      <div style={{ display: 'block', width: '450px' }}>
                        <h3>{name}</h3>
                        <p>{description.slice(0, 30)}...</p>
                        <h4>${price}</h4>
                      </div>
                      <div className="delete" onClick={() => handleDeleteCart(cartId)}>
                        <BsFillTrashFill />
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="payment">
                <h3>Summary</h3>
                <hr className="hr-black" />
                <div className="Summary">
                  <div>
                    <p>subtotal</p>
                    <p>{subtotal}</p>
                  </div>
                  <div>
                    <p>tax</p>
                    <p>{tax}</p>
                  </div>
                  <div>
                    <p>shipping</p>
                    <p>free </p>
                  </div>
                  <br />

                  <div>
                    <strong>total</strong>
                    <strong>{total}</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button>
                    Checkout <MdOutlinePayment style={{ position: 'relative', top: '3px' }} />
                  </button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    fontSize: '40px'
                  }}>
                  <FaCcApplePay />
                  <FaCcPaypal />
                  <FaCcAmazonPay />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{height:'90vh',display:'flex',justifyContent:"center",alignItems:'center'}}> <h1>nothing in cart</h1>  </div>
        )}
      </div>
    </div>
  )
}

export default Cart
