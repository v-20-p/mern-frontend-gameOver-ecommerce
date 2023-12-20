import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

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
  } catch (error) {
    console.log(error)
    throw error
  }
})
export const newCategory = createAsyncThunk('product/newCategory', async (data:{title:string}) => {
  try {
    const response = await api.post('/api/categories',data)
    console.log(response.data.payload)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})
export const updateCategory = createAsyncThunk('product/updateCategory', async ({ slug, data }: { slug: string; data:{title:string} }) => {
  try {
    const response = await api.put(`/api/categories/${slug}`,data)
    console.log(response.data.payload)
    return response.data.payload
  } catch (error) {
    console.log(error)
    throw error
  }
})
export const deleteCategory = createAsyncThunk('product/deleteCategory', async (slug:string) => {
  try {
    const response = await api.delete(`/api/categories/${slug}`)
    console.log(response.data)
    return slug
  } catch (error) {
    console.log(error)
    throw error
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
        
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        
        const filteredCatgories = state.categories.filter(
          (category) => category.slug !== action.payload
        )
        state.categories = filteredCatgories
        state.isLoading = false
      })
      .addMatcher((action)=>action.type.endsWith("/pending"),
      (state)=>{
        state.isLoading = true
      }
      )
      .addMatcher((action)=>action.type.endsWith("/rejected"),
      (state,action)=>{
        state.error = action.error.message || 'error to fetch the data'
        state.isLoading = false
        console.log(state.error)
      }
      )
  }
})
export default categorySlice.reducer
export const { changeHandle, filterByCategories } =
  categorySlice.actions
