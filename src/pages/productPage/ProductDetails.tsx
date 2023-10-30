import React,{useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addItemCart, getSingleProduct } from '../../redux/slices/products/productsSlice'
import { fetchCategories } from '../../redux/slices/products/categorySlice'
import Navbar from './../homePage/Navbar';


const ProductDetails = () => {
    const {id}= useParams()
    const dispatch = useDispatch<AppDispatch>()
    const {categories} = useSelector((state: RootState) => state.categoryReducer)
    const {singleProduct} = useSelector((state: RootState) => state.productsReducer)
    const navigate=useNavigate()


    useEffect(()=>{
        const fetchdata= async()=>{
            
            await dispatch(fetchCategories())
            await dispatch(getSingleProduct(id))

        }
        fetchdata()
        
    },[dispatch])

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

      const handleAddingCart=()=>{
        dispatch(addItemCart(singleProduct))
        navigate("/cart")
      }

      
  return (
    <div>
        <Navbar/>
        <img src={singleProduct.image} alt={singleProduct.name} width={340}/>
        <h1>{singleProduct.name}</h1>
        <p>category -- {findCategory()}</p>
        <h2>description</h2>
        <p>{singleProduct.description}</p>
        <input type="button" value="add to cart" onClick={handleAddingCart} />

    </div>
  )
}

export default ProductDetails