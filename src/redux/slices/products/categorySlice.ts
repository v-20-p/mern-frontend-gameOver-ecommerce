import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../api";

export type TypeCategories={
    id:number;
    name:string;
    ischecked:boolean;
  }
type CategoryState = {
    categories:TypeCategories[]
    error: string | undefined
    isLoading: boolean 
    filter:number[]
  }
  
const initialState:CategoryState  = {
    categories:[],
    error: '',
    isLoading: false,
    filter:[]

   
  }

  export const fetchCategories = createAsyncThunk("product/fetchCategories", async () => {
    try {
      const response = await api.get("/mock/e-commerce/categories.json");
      return response.data.map((category:TypeCategories) => ({
        ...category,
        ischecked: false, // Ensure ischecked is set in the initial state
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  const categorySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        changeHandle: (state, action) => {
            state.categories = action.payload
          },
          filterByCategories:  (state) => {
             const filteredCatgories= state.categories.filter((category) => category.ischecked === true).map((category) => category.id);
             state.filter=filteredCatgories
          },
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => {
            state.isLoading = true
          })
          .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<TypeCategories[]>) => {
            state.categories = action.payload
            state.isLoading = false
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.error = action.error.message || 'error to fetch the '
            state.isLoading = false
          })
    
      }

})
export default categorySlice.reducer
export const {changeHandle,filterByCategories} = categorySlice.actions
