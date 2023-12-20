import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import {
  changeHandle,
  fetchCategories,
  filterByCategories
} from '../../redux/slices/products/categorySlice'
import { BiSolidDownArrow } from 'react-icons/bi'

// BiSolidDownArrow

const Category = () => {
  const { categories } = useSelector((state: RootState) => state.categoryReducer)
  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const categoryCheckBoxHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target
    const updatedCategories = categories.map((category) =>
      category._id === id ? { ...category, ischecked: checked } : category
    )
    dispatch(changeHandle(updatedCategories))
    dispatch(filterByCategories())
  }
  const handleCategoryHover = () => {
    setIsCheckboxVisible(true)
  }

  const handleCategoryLeave = () => {
    setIsCheckboxVisible(false)
  }

  return (
    <div className="category-container">
      <div
        className="category-hover"
        onMouseEnter={handleCategoryHover}
        onMouseLeave={handleCategoryLeave}>
        category{' '}
        <BiSolidDownArrow
          style={{ position: 'relative', top: '3px', left: '5px', fontSize: '15px' }}
        />
      </div>
      {isCheckboxVisible && (
        <div
          className="checkbox"
          onMouseEnter={handleCategoryHover}
          onMouseLeave={handleCategoryLeave}>
          {categories.map(({ _id, title, ischecked }) => (
            <article key={_id}>
              <input
                type="checkbox"
                onChange={categoryCheckBoxHandle}
                value={title}
                id={String(_id)}
                checked={ischecked}
              />
              <div>
                <span>{title}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Category
