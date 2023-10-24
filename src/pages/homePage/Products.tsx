import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import {
  Product,
  fetchProductItem,
  sortProduct,
} from '../../redux/slices/products/productVisitorSlice'


import Category from './Category'

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productsVistor = useSelector((state: RootState) => state.productsVistorReducer)
  const categories = useSelector((state: RootState) => state.categoryReducer)


  useEffect( () => {
    dispatch(fetchProductItem())
  }, [])

  //searching
  let filtterdItems: Product[] = []
  if (productsVistor.searchTirm) {
    filtterdItems = productsVistor.items.filter((item) => {
      const searchValue = productsVistor.searchTirm.toString().toLowerCase()
      return item.name.toLowerCase().includes(searchValue)
    })
  }
  if(categories.filter){


    filtterdItems = productsVistor.items.filter((item) =>
    item.categories.some((cat) => categories.filter.includes(cat)));
  }
  

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingSelect = e.target.value
    dispatch(sortProduct(sortingSelect))
  }

  return (
    <section>
      {productsVistor.isLoading && <h3> Loading products...</h3>}
      {productsVistor.searchTirm && <p> search : {productsVistor.searchTirm}</p>}

      {filtterdItems.length > 0 && (
        <>
          <div className="productsVistor-container">
            {filtterdItems.map((product) => (
              <div key={product.id}>
                <img src={product.image} alt={product.name} width="50" />
                <p>{product.name}</p>
                {product.categories}
              </div>
            ))}
          </div>
          <hr />
        </>
      )}

      <div>
        <label htmlFor="sorting">sort by</label>
        <select name="sorting" onChange={handleSorting}>
          <option value="">none</option>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>

        <Category />
      </div>

      <div className="products-container">
        {productsVistor.items.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} width="50" />
            <p>{product.name}</p>
            {product.categories}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products
