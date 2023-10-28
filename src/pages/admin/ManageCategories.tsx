import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { addCategory, fetchCategories, removeCategory, updateCategory } from '../../redux/slices/products/categorySlice'

const ManageCategories = () => {
    const {categories} = useSelector((state: RootState) => state.categoryReducer)
    const dispatch = useDispatch<AppDispatch>()
    const initialValue={id:0,name:'',ischecked:false}
    const [categoryForm,setCategoryForm]=useState(initialValue)
    useEffect(() => {
        dispatch(fetchCategories())
      }, [])
      const handleEdit=(id:number)=>{
        const editedCategory=categories.find((category)=>category.id ==id)
        if(editedCategory){
          setCategoryForm({...editedCategory ,name:editedCategory.name})
        }
      }
      const handleDelete=(id:number)=>{
        dispatch(removeCategory({ categoryId: id }))
      }

      
      const onChaneHandleCategory=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target
        setCategoryForm({...categoryForm,name:value})
      }

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    
           if (categoryForm.id) {
            
         dispatch(updateCategory(categoryForm)); 
        } else {
          setCategoryForm({...categoryForm,id:categories[categories.length-1].id+1,})
      
          dispatch(addCategory(categoryForm));
          
    
        }
        setCategoryForm(initialValue)
      }



    
  return (
    <div>
        <div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">name of Pruduct</label>
          <input
            type="text"
            name="name"
            id=""
            value={categoryForm.name}
            onChange={onChaneHandleCategory}
          />
          <button type="submit" >{categoryForm.id?"edit":"add"}</button>
          </form>
        </div>
        <div>
            {categories.map(({id,name,ischecked})=>
            <div key={id}>
                <h2>{name}</h2>
                <button onClick={()=>handleEdit(id)}>edit</button>
                <button onClick={()=>handleDelete(id)}>delete</button>
            </div>
            )}
        </div>
    </div>
  )
}

export default ManageCategories