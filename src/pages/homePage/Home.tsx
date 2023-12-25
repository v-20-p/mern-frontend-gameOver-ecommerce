import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Products from '../productPage/Products'
import { Link } from 'react-router-dom'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { ToastContainer, cssTransition, toast } from 'react-toastify';
import { BsFillPlusCircleFill } from 'react-icons/bs'
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { addItemCart, fetchProductItem, quantity } from '../../redux/slices/products/productsSlice'


const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items } = useSelector((state: RootState) => state.productsReducer)
  useEffect(()=>{
    dispatch(fetchProductItem({limit:20,filter:'',}))
  },[])

  const handleAddingCart = (id: string ) => {
    dispatch(addItemCart(id));
    dispatch(quantity({id:id,quantity:1}))
    toast.success('Product add successfully to cart ', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      
      });
  
  }
  const handleIncrement = (id:string,count:number) => {
    dispatch(quantity({id:id,quantity:count+1}))
 };

 const handleDecrement =  (id:string,count:number) => {
   if(count!=1)
   dispatch(quantity({id:id,quantity:count-1}))
};
  return (
    <>
      <div className="hero">
        <div className="hero-shadow">
          <Navbar />
          <div className="hero-content">
            <h1>FIND YOUR NEXT GAMEING ADVENTURE !</h1>
            <p>Welcome to our video game shop Discover exciting new games.</p>

            <Link className="explore" to="">
              explore now
            </Link>
          </div>
        </div>
      </div>

      <section>
        <div className="featured-games">
          <h2>Featured Games</h2>

          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className="Carousel"
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 5,
                partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 1,
                partialVisibilityGutter: 30
              }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable>
            {items.slice(0, 10).map((item) => (
              <div key={item._id} className="product">
                <Link to={`/product/${item._id}`}>
                  <img src={item.image} alt={item.title} width={200} />
                </Link>

                <h3>{item.title}</h3>
                <p>{item.description.slice(0, 15)}..read more</p>

                <div>
                  <span>price : ${item.price == 0 ? 'free ' : item.price}</span>
                  
                </div>
                <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => handleDecrement(String(item._id), Number(item.quantity))}
              >
                -
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleIncrement(String(item._id), Number(item.quantity))}
              >
                +
              </button>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddingCart(String(item._id))}
              >
                Add to Cart
              </button>
            </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="newest-container">
          <div className="new-release ">
            <div className="darker">
              <div></div>
              <div>
                <p>NEW RELEASE</p>
              </div>
              <div>
                <Link to="">
                  {''}
                  <button>shop now</button>
                </Link>
              </div>
            </div>
            <div className="newGame">
              {items.slice(16, 19).map((item) => (
                <div key={item._id} className="product2">
                  <Link to={`/product/${item._id}`}>
                    <img src={item.image} alt={item.title} width={200} />
                  </Link>

                  <h3>{item.title}</h3>

                  <div>
                    <span>price: {item.price == 0 ? 'free' : item.price}$</span>
       
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
