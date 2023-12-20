import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { AppDispatch, RootState } from '../../redux/store'

interface Category {
  _id: string
  title: string
}
interface initialValue{
  description: string;
  discounts?: never[];
  image?: string;
  price: number;
  quantity?: number;
  shipping?: number;
  slug?: string;
  sold?: number;
  title: string;
  categoryId:TypeCategories[] |[]
  updatedAt?: string;
  _id?: string;
}
import {  deleteProduct, fetchProductItem, newProduct, updateProduct } from '../../redux/slices/products/productsSlice'
import { baseURL } from '../../api'
import { TypeCategories } from '../../redux/slices/products/categorySlice'

const ManageProducts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productsAdmin = useSelector((state: RootState) => state.productsReducer)
  const { categories } = useSelector((state: RootState) => state.categoryReducer)

  const initialValue :initialValue = {
    _id: '',
    title: '',
    image: '',
    description: '',
    categoryId: [],
    // variants: [],
    // sizes: [],
    price: 0,
    quantity:10,
    discounts:[]
    // rate: 0,
    // cart_Id: 0
  }
  const [productForm, setproductForm] = useState(initialValue)
  const [errors, setErrors] = useState('')


  const handleDeleteItem = (_id: string) => {
    dispatch(deleteProduct(_id))
    dispatch(fetchProductItem())
    

  }
  const handleEditItem = (_id: string) => {
    const editedItem = productsAdmin.items.find((item) => item._id == _id)
    if (editedItem) {
      console.log(editedItem)
      setproductForm({ ...editedItem, _id: String(editedItem._id ),categoryId:(editedItem.categoryId.map((cat)=>cat._id) as [])})
    }
  }

  const onChaneHandleItem = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
  ) => {
    const { name, value ,} = e.target
    const isList = name === 'categoryId' || name === 'variants' || name === 'sizes'
    const isImage= name=== 'image'

    if (!isList && !isImage) {
      setproductForm({
        ...productForm,
        [name]: value
      })

    } 
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    setproductForm((productForm:any) => ({
      ...productForm,
      image: file,
    }));
  };

  const onChangeListHandleItem = (categoryId: string) => {
    setproductForm((productForm: any) => ({
      ...productForm,
      categoryId: [...productForm.categoryId, categoryId]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!productForm.title || !productForm.description) {
      return setErrors('ALl field should be fill')
    }

    if (productForm._id) {
      
      dispatch(updateProduct({id:productForm._id,data:productForm}))
      dispatch(fetchProductItem())
    } else {
      dispatch(newProduct(productForm))
      dispatch(fetchProductItem())
      
    }
    setErrors('')
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }
  const onRemoveHandleItem = (categoryId: string) => {
    setproductForm((productForm: any) => ({
      ...productForm,
      categoryId: productForm.categoryId.filter((id: string) => id !== categoryId)
    }))
  }

  const titleOfcategory = (categoryIds: string[]) => {
    const titles = categories.filter((cat) => categoryIds.includes(cat._id)).map((cat) => cat.title)

    return titles.join(' , ')
  }

  return (
    <div className="admin-content">
      <h2 className="h2">products</h2>
      <div className="form" style={{ height: '550px' }}>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">name of Pruduct</label>
          <input
            type="text"
            name="title"
            id=""
            value={productForm.title}
            onChange={onChaneHandleItem}
          />
          <br />
          <label htmlFor="">price</label>
          <input
            type="text"
            name="price"
            value={productForm.price}
            onChange={onChaneHandleItem}
          />
          <br />
          <label htmlFor="">price</label>
          <input
            type="text"
            name="quantity"
     
            value={productForm.quantity}
            onChange={onChaneHandleItem}
          />
          <br />
          <label htmlFor="">image url</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <br />
          <span>
            {categories.map(
              (cat) => productForm.categoryId.find((cate: Category) => cat._id == cate._id)?.title
            )}
          </span>
          <div className="custom-dropdown" onBlur={closeDropdown} tabIndex={0} ref={dropdownRef}>
            <label htmlFor="categories">Categories</label>
            <div
              className={`dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
              onClick={toggleDropdown}>
              {productForm.categoryId.length > 0
                ? titleOfcategory((productForm.categoryId as string []))
                : 'Select Categories'}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className={`dropdown-option ${
                      productForm.categoryId.includes(category._id as never) ? 'selected' : ''
                    }`}
                    onClick={() =>
                      productForm.categoryId.includes(category._id as never)
                        ? onRemoveHandleItem(category._id)
                        : onChangeListHandleItem(category._id)
                    }>
                    {category.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <br />
          <label htmlFor="">sizes</label>
          {/* <input
            type="text"
            name="sizes"
            id=""
            value={productForm.sizes.join(',')}
            onChange={onChaneHandleItem}
          /> */}
          <br />
          <label htmlFor="">variants</label>
          {/* <input
            type="text"
            name="variants"
            id=""
            value={productForm.variants.join(',')}
            onChange={onChaneHandleItem}
          /> */}
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
          <button type="submit">{productForm._id ? 'edit' : 'add'}</button>
        </form>
      </div>
      <div className="table">
        <div className="table-header">
          <p>_id</p>
          <p>image</p>
          <p>name</p>

          <p>Actions 1</p>
          <p>Actions 2</p>
        </div>

        {productsAdmin.items.map((product) => (
          <div key={product._id} className="table-row">
            <p>{product._id}</p>
            <p>
              <img src={baseURL + product.image} alt={product.title} width="50" />
            </p>
            <p>{product.title}</p>

            <p
              style={{ color: 'darkblue', cursor: 'pointer' }}
              onClick={() => handleDeleteItem(String(product._id))}>
              delete
            </p>
            <p
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => handleEditItem(String(product._id))}>
              edit
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageProducts
