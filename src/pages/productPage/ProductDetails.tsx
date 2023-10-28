import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addItemCart, getSingleProduct } from '../../redux/slices/products/productsSlice'
import { fetchCategories } from '../../redux/slices/products/categorySlice'
import Navbar from './../homePage/Navbar';


const ProductDetails = () => {
    const {id}= useParams()
    const dispatch = useDispatch<AppDispatch>()


    useEffect(()=>{
        const fetchdata= async()=>{
            await dispatch(getSingleProduct(id))
            await dispatch(fetchCategories())

        }
        fetchdata()
        
    },[dispatch])
    const {categories} = useSelector((state: RootState) => state.categoryReducer)
    const {singleProduct} = useSelector((state: RootState) => state.productsReducer)
    const findCategory = () => {
        if (singleProduct && singleProduct.categories) {
          return singleProduct.categories.map((category) => {
            const foundCategory = categories.find((cat) => cat.id === category);
            if (foundCategory) {
              return (
                <span key={foundCategory.id}>|{foundCategory.name}|</span>
              );
            }
          });
        }
        return null; 
      };


      
  return (
    <div>
        <Navbar/>
        <img src={singleProduct.image} alt={singleProduct.name} width={340}/>
        <h1>{singleProduct.name}</h1>
        <p>category -- {findCategory()}</p>
        <h2>description</h2>
        <p>{singleProduct.description}</p>
        <input type="button" value="add to cart" onClick={() => dispatch(addItemCart(singleProduct.id))} />

    </div>
  )
}

export default ProductDetails