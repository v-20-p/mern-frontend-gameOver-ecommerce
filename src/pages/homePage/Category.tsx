import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { TypeCategories, changeHandle, fetchCategories, filterByCategories } from '../../redux/slices/products/categorySlice'


type CheckedCategory = {
  ischecked: boolean
  id: number
  name: string
}

const Category = () => {
  const {categories,filter} = useSelector((state: RootState) => state.categoryReducer)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  

  const categoryCheckBoxHandle =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target
    const updatedCategories = categories.map((category) =>
      category.id === Number(id) ? { ...category, ischecked: checked } : category
    )
    
    dispatch(changeHandle(updatedCategories))
    dispatch(filterByCategories())
     console.log(filter)
  }

  return (
    <div>
      {categories.map(({ id, name }) => (
        <div key={id}>
          <label htmlFor="category">{name}</label>
          <input type="checkbox" onChange={categoryCheckBoxHandle} value={name} id={String(id)} />
        </div>
      ))}
    </div>
  )
}

export default Category
