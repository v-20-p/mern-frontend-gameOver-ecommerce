import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'

import {
  Product,
  addItemCart,
  fetchProductItem,
  sortProduct
} from '../../redux/slices/products/productsSlice'

import Category from './Category'
import { Link } from 'react-router-dom'

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productsVistor = useSelector((state: RootState) => state.productsReducer)
  const categories = useSelector((state: RootState) => state.categoryReducer)

  useEffect(() => {
    dispatch(fetchProductItem())
  }, [])

  //searching
  let searchItems: Product[] = []
  if (productsVistor.searchTirm) {
    searchItems = productsVistor.items.filter((item) => {
      const searchValue = productsVistor.searchTirm.toString().toLowerCase()
      return item.name.toLowerCase().includes(searchValue)
    })
    console.log(fetchProductItem)
  }

  let filtterdItems = productsVistor.items
  if (categories.filter) {
    filtterdItems = productsVistor.items.filter((item) =>
      item.categories.some((cat) => categories.filter!.includes(cat))
    )
  }

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortingSelect = e.target.value
    dispatch(sortProduct(sortingSelect))
  }
  const handleAddingCart = (id: number) => {
    const itemToCart = productsVistor.items.find((product) => product.id === id)
    if (itemToCart){
      dispatch(addItemCart(itemToCart))
    } 
  }

  return (
    <section>
      {productsVistor.isLoading && <h3> Loading products...</h3>}
      {productsVistor.searchTirm && <p> search : {productsVistor.searchTirm}</p>}

      {searchItems.length > 0 && (
        <>
          <div className="productsVistor-container">
            {searchItems.map((product) => (
              <div key={product.id}>
                <img src={product.image} alt={product.name} width="50" />
                <p>{product.name}</p>
                <input type="button" value="add to cart" />
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
        {filtterdItems.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} width="50" />
            <p>{product.name}</p>
            <input type="button" value="add to cart" onClick={() => handleAddingCart(product.id)} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products
