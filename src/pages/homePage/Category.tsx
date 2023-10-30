import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import {
  changeHandle,
  fetchCategories,
  filterByCategories
} from '../../redux/slices/products/categorySlice'



const Category = () => {
  const { categories} = useSelector((state: RootState) => state.categoryReducer)
  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>()

  const categoryCheckBoxHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target
    const updatedCategories = categories.map((category) =>
      category.id === Number(id) ? { ...category, ischecked: checked } : category
    )

    dispatch(changeHandle(updatedCategories))
    dispatch(filterByCategories())
  }
  const handleCategoryButtonHover = () => {
    setIsCheckboxVisible(true);
  };

  const handleCategoryButtonLeave = () => {
    setIsCheckboxVisible(false);
  };

  const handleCheckboxMouseEnter = () => {
    setIsCheckboxVisible(true);
  };

  const handleCheckboxMouseLeave = () => {
    setIsCheckboxVisible(false);
  };

  return (
    <div className="category-container">
    <div
      className="category-hover"
      onMouseEnter={handleCategoryButtonHover}
      onMouseLeave={handleCategoryButtonLeave}
    >
      category
    </div>
    {isCheckboxVisible && (
      <div          
      className="checkbox"
      onMouseEnter={handleCheckboxMouseEnter}
      onMouseLeave={handleCheckboxMouseLeave}
      >
        {categories.map(({ id, name }) => (
          <article key={id}>
            <input
              type="checkbox"
              onChange={categoryCheckBoxHandle}
              value={name}
              id={String(id)}
            />
            <div>
              <span>{name}</span>
            </div>
          </article>
        ))}
      </div>
    )}
  </div>

  )

}

export default Category
