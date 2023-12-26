import { PayloadAction, createAsyncThunk, createSlice, isRejected , } from '@reduxjs/toolkit'
import api from '../../../api'
import { toast } from 'react-toastify'

export type TypeCategories = {
  _id: string
  title: string
  slug?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
  ischecked?: boolean
  
}
type CategoryState = {
  categories: TypeCategories[] 
  error: string | undefined
  isLoading: boolean
  filter: string[] | null
}

const initialState: CategoryState = {
  categories: [],
  error: '',
  isLoading: false,
  filter: null
}

export const fetchCategories = createAsyncThunk('product/fetchCategories', async () => {
  try {
    const response = await api.get('/api/categories')
    console.log(response.data.payload)
    return response.data.payload.map((category: TypeCategories) => ({
      ...category,
      ischecked: false
    }))
  } catch (error:any) {
    throw error.response.data.message
  }
})
export const newCategory = createAsyncThunk('product/newCategory', async (data:{title:string}) => {
  try {
    const response = await api.post('/api/categories',data)
    console.log(response.data.payload)
    return response.data
  } catch (error:any) {
    throw error.response.data.message
  }
})
export const updateCategory = createAsyncThunk('product/updateCategory', async ({ slug, data }: { slug: string; data:{title:string} }) => {
  try {
    const response = await api.put(`/api/categories/${slug}`,data)
    console.log(response.data.payload)
    return response.data.payload
  } catch (error:any) {
    throw error.response.data.message
  }
})
export const deleteCategory = createAsyncThunk('product/deleteCategory', async (slug:string) => {
  try {
    const response = await api.delete(`/api/categories/${slug}`)
   
    return slug
  } catch (error:any) {
    throw error.response.data.message
  }
})



const categorySlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    changeHandle: (state, action) => {
      state.categories = action.payload
    },
    filterByCategories: (state) => {
      const filteredCatgories = state.categories
        .filter((category) => category.ischecked === true)
        .map((category) => category._id)
      state.filter = filteredCatgories
    },

  },
  extraReducers: (builder) => {
    builder

      .addCase(newCategory.fulfilled, (state) => {
        state.isLoading = true
        toast.success('category is created', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          });
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<TypeCategories[]>) => {
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<TypeCategories>) => {
        state.isLoading = false
      const index = state.categories.findIndex((category) => (category._id) === (action.payload._id))

     if (index !== -1) {
    state.categories[index] = action.payload
     }
     toast.success('category is updated', {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      });
        
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        
        const filteredCatgories = state.categories.filter(
          (category) => category.slug !== action.payload
        )
        state.categories = filteredCatgories
        state.isLoading = false
        toast.success('category is deleted', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          });
      })
      .addMatcher((action)=>action.type.endsWith("/pending"),
      (state)=>{
        state.isLoading = true
      }
      )
      .addMatcher(isRejected(deleteCategory,updateCategory,fetchCategories,fetchCategories,newCategory),
      (state,action)=>{
        state.error = action.error.message || 'error to fetch the data'
        state.isLoading = false
        toast.error(state.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      )
  }
})
export default categorySlice.reducer
export const { changeHandle, filterByCategories } =
  categorySlice.actions
