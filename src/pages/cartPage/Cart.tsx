import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify/react';
import { ToastContainer, cssTransition, toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../redux/store'

import { clearCart, deleteItemCart, quantityForCart } from '../../redux/slices/products/productsSlice'

import NavAll from '../homePage/NavAll'

import { BsFillTrashFill } from 'react-icons/bs'
import { MdOutlinePayment } from 'react-icons/md'
import { FaCcApplePay, FaCcPaypal, FaCcAmazonPay } from 'react-icons/fa'

import PopUp from '../../PopUp'
import { useNavigate } from 'react-router'
import { placeOrder } from '../../redux/slices/products/ordersSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart } = useSelector((state: RootState) => state.productsReducer)
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const handleDeleteCart = (cartId: number) => {
    const deletedItem = cart.find((item) => item.cartId === cartId)

    if (deletedItem) {
      const updatedCart = cart.filter((item) => item.cartId != deletedItem.cartId)

      dispatch(deleteItemCart(updatedCart))
    }
  }

  const calculateTotalPrice = () => {
    let subtotal = 0
  
    subtotal=cart.reduce((total, item) => total + item.price *Number(item.quantity), 0);

    const tax = (subtotal * 0.15).toFixed(2) // 15% tax

    return {
      subtotal,
      tax,
      total: (subtotal + parseFloat(tax)).toFixed(2)
    }
  }

  const { subtotal, tax, total } = calculateTotalPrice()


  const handleSumbit=()=>{
    const order={

      products:cart.map((item)=>({product:item._id,quantity:item.quantity})),
      user:userLoginData?._id,
      status:'pending',
    }

    dispatch(placeOrder(order))
    dispatch(clearCart())
    navigate('/')
  }

  const handleIncrement = (id:string,count:number) => {
    dispatch(quantityForCart({id:id,quantity:count+1}))
 };

 const handleDecrement =  (id:string,count:number) => {
   if(count!=1)
   dispatch(quantityForCart({id:id,quantity:count-1}))
};

  return (
    <div>
      <NavAll />
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
      
      <div>
        {cart.length > 0 ? (
          <>
            <h2 className="h2">cart</h2>
            <div className="cart">
              <div className="cart-item" style={{minHeight:"500px"}}>
              <hr className="hr-black" />
                {cart.map(({ cartId, image, title, description, price,quantity,_id }) => (
              
                    
                    
                    
                    <div key={cartId} className="product4">
                      <img src={image} alt={title} />
                      <div style={{ display: 'block', width: '450px' }}>
                        <h3>{title}</h3>
                        <p>{description.slice(0, 30)}...</p>
                        <h4>${price}</h4>
                        


              <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => handleDecrement(String(_id), Number(quantity))}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleIncrement(String(_id), Number(quantity))}
              >
                +
              </button>
            </div>
            
                        
                      </div>
                      <div className="delete" onClick={() => handleDeleteCart(Number(cartId))}>
                        <BsFillTrashFill />
                        
                      </div>
                      
                    </div>
               
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
                {userLoginData ?<PopUp nameBtn={<>Checkout <MdOutlinePayment style={{ position: 'relative', top: '3px' }} /></>}>
                  <br />
                  <Icon icon="noto:party-popper" fontSize={50} />
                  <h4>Are you want confirm ?</h4>
                  <div className="Summary" style={{width:'60%'}}>
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
                  
                  <button onClick={handleSumbit} style={{cursor:"pointer"}}>confirm</button>
                </PopUp>:<PopUp nameBtn={<>Checkout <MdOutlinePayment style={{ position: 'relative', top: '3px' }} /></>}>
                  <br />
                  <Icon  icon="flat-color-icons:cancel" fontSize={50} />
                  <h4>you are not login 🥲</h4>
                  <div className="Summary" style={{width:'60%'}}>
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
                  
                  <p>to login click <Link to={'/login'} style={{cursor:"pointer"}}>hare</Link></p>
                </PopUp>}
                
                  
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
