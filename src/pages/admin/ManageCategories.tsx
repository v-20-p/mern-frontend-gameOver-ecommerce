import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import {
  addCategory,
  fetchCategories,
  removeCategory,
  updateCategory
} from '../../redux/slices/products/categorySlice'

const ManageCategories = () => {
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const dispatch = useDispatch<AppDispatch>()
  const initialValue = { id: 0, name: '', ischecked: false }
  const [categoryForm, setCategoryForm] = useState(initialValue)
  const [formErrors, setFormErrors] = useState('')

  const handleEdit = (id: number) => {
    const editedCategory = categories.find((category) => category.id == id)
    if (editedCategory) {
      setCategoryForm({ ...editedCategory, name: editedCategory.name })
    }
  }
  const handleDelete = (id: number) => {
    dispatch(removeCategory({ categoryId: id }))
  }

  const onChaneHandleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCategoryForm({ ...categoryForm, name: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryForm.name) {
      return setFormErrors('Name is required')
    }

    if (categoryForm.id) {
      dispatch(updateCategory(categoryForm))
    } else {
      setCategoryForm({ ...categoryForm, id: categories[categories.length - 1].id + 1 })

      dispatch(addCategory(categoryForm))
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
            value={categoryForm.name}
            onChange={onChaneHandleCategory}
          />
          {formErrors && <p className="error-message">{formErrors}</p>}
          <button type="submit">{categoryForm.id ? 'edit' : 'add'}</button>
        </form>
      </div>
      <div>
        <div className="table">
          <div className="table-header">
            <p>Name</p>

            <p>Action 1</p>
            <p>Action 2</p>
          </div>
          {categories.map(({ id, name }) => (
            <div key={id} className="table-row">
              <p>{name}</p>

              <p style={{ color: 'darkblue', cursor: 'pointer' }} onClick={() => handleEdit(id)}>
                edit
              </p>
              <p style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(id)}>
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
