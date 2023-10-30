import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import {
  Product,
  addProduct,
  fetchProductItem,
  removeProduct,
  updateProduct
} from '../../redux/slices/products/productsSlice'

const ManageProducts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productsAdmin = useSelector((state: RootState) => state.productsReducer)

  const initialValue: Product = {
    id: 0,
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price:0,
    rate:0
  }
  const [productForm, setproductForm] = useState(initialValue)


  const handleDeleteItem = (id: number) => {
    dispatch(removeProduct({ productId: id }))
  }
  const handleEditItem = (id: number) => {
    const editedItem = productsAdmin.items.find((item) => item.id == id)
    if (editedItem) {
      console.log(editedItem)
      setproductForm({ ...editedItem, id: editedItem.id })
    }
  }

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

    if (productForm.id) {
      dispatch(updateProduct(productForm))
    } else {
      setproductForm({
        ...productForm,
        id: productsAdmin.items[productsAdmin.items.length - 1].id + 1
      })

      dispatch(addProduct(productForm))
    }
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
            value={productForm.categories.join(',')}
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
          <button type="submit">{productForm.id ? 'edit' : 'add'}</button>
        </form>
      </div>
      <div>
        {productsAdmin.items.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} width="50" />
            <p>{product.name}</p>
            <p>{product.id}</p>
            <input type="button" value="delete" onClick={() => handleDeleteItem(product.id)} />
            <input type="button" value="edit" onClick={() => handleEditItem(product.id)} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ManageProducts
