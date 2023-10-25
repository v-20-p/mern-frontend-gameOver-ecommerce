import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import {
  addProduct,
  fetchProductItem,
  removeProduct
} from '../../redux/slices/products/productsSlice'

const ManageProducts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productsAdmin = useSelector((state: RootState) => state.productsReducer)
  const categories = useSelector((state: RootState) => state.categoryReducer)

  const initialValue = {
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: []
  }
  const [productForm, setproductForm] = useState(initialValue)

  useEffect(() => {
    dispatch(fetchProductItem())
  }, [])

  const handleDeleteItem = (id: number) => {
    dispatch(removeProduct({ productId: id }))
  }
  const handleEditItem = (id: number) => {}
  
  const onChaneHandleItem = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setproductForm({
        ...productForm,
        [name]: value.split(',')
      })
      return
    }

    setproductForm({
      ...productForm,
      [name]: value
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addProduct(productForm))
  }
  return (
    <>
      <div>
        <h1>admin</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">name of Pruduct</label>
          <input
            type="text"
            name="name"
            id=""
            value={productForm.name}
            onChange={onChaneHandleItem}
          />
          <br />
          <label htmlFor="">image url</label>
          <input
            type="text"
            name="image"
            id=""
            value={productForm.image}
            onChange={onChaneHandleItem}
          />
          <br />
          <label htmlFor="">categories</label>
          <input
            type="text"
            name="categories"
            id=""
            value={productForm.categories}
            onChange={onChaneHandleItem}
          />
          <br />
          <label htmlFor="">sizes</label>
          <input
            type="text"
            name="sizes"
            id=""
            value={productForm.sizes.join(',')}
            onChange={onChaneHandleItem}
          />
          <br />
          <label htmlFor="">variants</label>
          <input
            type="text"
            name="variants"
            id=""
            value={productForm.variants.join(',')}
            onChange={onChaneHandleItem}
          />
          <br />
          <label htmlFor="">description</label>
          <textarea
            name="description"
            id=""
            value={productForm.description}
            onChange={onChaneHandleItem}
          />
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
      <div>
        {productsAdmin.items.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} width="50" />
            <p>{product.name}</p>
            <input type="button" value="delete" onClick={() => handleDeleteItem(product.id)} />
            <input type="button" value="edit" onClick={() => handleEditItem(product.id)} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ManageProducts
