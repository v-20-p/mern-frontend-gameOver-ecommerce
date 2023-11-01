import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Products from '../productPage/Products'
import { Link } from 'react-router-dom'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { addItemCart, fetchProductItem } from '../../redux/slices/products/productsSlice'
import { BsFillPlusCircleFill } from 'react-icons/bs'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items } = useSelector((state: RootState) => state.productsReducer)

  const handleAddingCart = (id: number) => {
    const itemToCart = items.find((product) => product.id === id)
    if (itemToCart) {
      dispatch(addItemCart(itemToCart))
    }
  }
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
              <div key={item.id} className="product">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} width={200} />
                </Link>

                <h3>{item.name}</h3>
                <p>{item.description.slice(0, 15)}..read more</p>
                <div className="center-plus">
                  <BsFillPlusCircleFill
                    className="plus"
                    onClick={() => handleAddingCart(item.id)}
                  />
                </div>
                <div>
                  <span>price : ${item.price == 0 ? 'free ' : item.price}</span>
                  <span>⭐ {item.rate}</span>
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
                <div key={item.id} className="product2">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} width={200} />
                  </Link>

                  <h3>{item.name}</h3>

                  <div>
                    <span>price: {item.price == 0 ? 'free' : item.price}$</span>
                    <span>⭐ {item.rate}</span>
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
