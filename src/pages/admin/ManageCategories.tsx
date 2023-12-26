import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import {
  deleteCategory,
  fetchCategories,
  newCategory,
  updateCategory
} from '../../redux/slices/products/categorySlice'

interface initialValue {
  _id: string
  title: string
  ischecked: boolean
  slug: string
}
const ManageCategories = () => {
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const dispatch = useDispatch<AppDispatch>()
  const initialValue = { _id: '', title: '', ischecked: false, slug: '' }
  const [categoryForm, setCategoryForm] = useState(initialValue)
  const [formErrors, setFormErrors] = useState('')

  const handleEdit = (slug: string) => {
    const editedCategory = categories.find((category) => category.slug == slug)
    if (editedCategory) {
      setCategoryForm({ ...(editedCategory as initialValue), title: editedCategory.title })
    }
  }
  const handleDelete = (slug: string) => {
    dispatch(deleteCategory(slug))
  }

  const onChaneHandleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCategoryForm({ ...categoryForm, title: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryForm.title) {
      return setFormErrors('Name is required')
    }

    if (categoryForm._id) {
      dispatch(updateCategory({ slug: categoryForm.slug, data: { title: categoryForm.title } }))
      dispatch(fetchCategories())
    } else {
      dispatch(newCategory({ title: categoryForm.title }))
    }
    setCategoryForm(initialValue)
    setFormErrors('')
  }

  return (
    <div className="admin-content">
      <h2 className="h2">categories</h2>
      <div className="form" style={{ height: '250px' }}>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">name of Pruduct</label>
          <input
            type="text"
            name="name"
            id=""
            value={categoryForm.title}
            onChange={onChaneHandleCategory}
          />
          {formErrors && <p className="error-message">{formErrors}</p>}
          <button type="submit">{categoryForm._id ? 'edit' : 'add'}</button>
        </form>
      </div>
      <div>
        <div className="table">
          <div className="table-header">
            <p>Name</p>

            <p>Action 1</p>
            <p>Action 2</p>
          </div>
          {categories.map(({ _id, title, slug }) => (
            <div key={_id} className="table-row">
              <p>{title}</p>

              <p
                style={{ color: 'darkblue', cursor: 'pointer' }}
                onClick={() => handleEdit(String(slug))}>
                edit
              </p>
              <p
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => handleDelete(String(slug))}>
                delete
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageCategories
