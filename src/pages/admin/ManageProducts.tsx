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
    price: 0,
    rate: 0,
    cartId: 0
  }
  const [productForm, setproductForm] = useState(initialValue)
  const [errors, setErrors] = useState('')

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
    }

    setproductForm({
      ...productForm,
      [name]: value
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!productForm.name || !productForm.description) {
      return setErrors('ALl field should be fill')
    }

    if (productForm.id) {
      dispatch(updateProduct(productForm))
    } else {
      setproductForm({
        ...productForm,
        id: productsAdmin.items[productsAdmin.items.length - 1].id + 1
      })

      dispatch(addProduct(productForm))
    }
    setErrors('')
  }

  return (
    <div className="admin-content">
      <h2 className="h2">products</h2>
      <div className="form" style={{ height: '550px' }}>
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
          {errors && <p className="error-message">{errors}</p>}
          <button type="submit">{productForm.id ? 'edit' : 'add'}</button>
        </form>
      </div>
      <div className="table">
        <div className="table-header">
          <p>id</p>
          <p>image</p>
          <p>name</p>

          <p>Actions 1</p>
          <p>Actions 2</p>
        </div>

        {productsAdmin.items.map((product) => (
          <div key={product.id} className="table-row">
            <p>{product.id}</p>
            <p>
              <img src={product.image} alt={product.name} width="50" />
            </p>
            <p>{product.name}</p>

            <p
              style={{ color: 'darkblue', cursor: 'pointer' }}
              onClick={() => handleDeleteItem(product.id)}>
              delete
            </p>
            <p
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => handleEditItem(product.id)}>
              edit
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageProducts
