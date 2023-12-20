import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
import { TypeCategories } from './categorySlice';

export type Product = {
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

export type ProductState = {
  items: Product[]
  error: string | undefined
  isLoading: boolean
  searchTirm: string
  sortState: string
  cart: Product[]
  singleProduct: Product
  
}
const cartData =
  localStorage.getItem('cart') != null ? JSON.parse(String(localStorage.getItem('cart'))) : []
const initialState: ProductState = {
  items: [],
  error: '',
  isLoading: false,
  searchTirm: '',
  sortState: '',
  cart: cartData,
  singleProduct: {} as Product
}


export const fetchProductItem = createAsyncThunk('product/fetchProductItem', async () => {
  try {
    const response = await api.get('/api/products')
    console.log(response.data.payload.products)
    
    return response.data.payload.products
  } catch (error) {
    console.log(error)
    throw error
  }
})
export const fetchSingleProduct = createAsyncThunk('product/singleProducts', async (slug:string) => {
  try {
    const response = await api.get(`/api/products/${slug}`)
    console.log(response.data.payload)
    return response.data.payload
  } catch (error) {
    console.log(error)
    throw error
  }
})
export const newProduct = createAsyncThunk('product/newProduct', async (data:Product) => {
  try {
    const response = await api.post('/api/products',data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data

  } catch (error) {
    throw error
  }
})
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id:string) => {
  try {
    const response = await api.delete(`/api/products/${id}`);
    return response.data

  } catch (error) {
    throw error
  }
})
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, data }: { id: string; data: Product }) => {
    try {
      const response = await api.put(`/api/products/update-product-info/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const productVisitorSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTirm = action.payload
    },
    sortProduct: (state, action) => {
      // const sortingInput = action.payload
      // if (sortingInput == 'name') state.items.sort((a, b) => a.name.localeCompare(b.name))
      // else if (sortingInput == 'price') state.items.sort((a, b) => b.price - a.price).reverse()
      // else state.items
    },

    addItemCart: (state, action) => {
      const id = action.payload
      const itemToCart = state.items.find((product) => product._id === id)

      if (itemToCart) {
        const newIdForCartItem = { ...itemToCart, cartId: state.cart.length + 1 }
        state.cart = [...state.cart, newIdForCartItem]
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    deleteItemCart: (state, action) => {
      state.cart = action.payload
      state.cart = state.cart.map((item, index) => ({
        ...item,
        cartId: index + 1
      }))
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },


    // updateProduct: (state, action: PayloadAction<Product>) => {
      // const index = state.items.findIndex((product) => product.id === action.payload.id)

      // if (index !== -1) {
      //   state.items[index] = action.payload
      // }
    // },
    // getSingleProduct: (state, action) => {
    //   // const id = action.payload
    //   // const foundProduct = state.items.find((product) => product.id === id)
    //   // if (foundProduct) {
    //   //   state.singleProduct = foundProduct
    //   // }
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductItem.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
          const product = action.payload
         const foundProduct = state.items.find((product) => product._id === product._id)
         if (foundProduct) {
          state.singleProduct = foundProduct
         }
        state.isLoading = false
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((product) => product._id === action.payload._id)

      if (index !== -1) {
        state.items[index] = action.payload
      }
      state.isLoading = false
    })
      .addCase(newProduct.fulfilled, (state, action: PayloadAction<Product>) => {
       const newProduct = action.payload
        state.isLoading = false
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      const filteredItems = state.items.filter((product) => product._id !== action.payload._id)
      state.items = filteredItems
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
      }
      )
  }
})
export default productVisitorSlice.reducer
export const {
  searchProduct,
  sortProduct,
  addItemCart,
  deleteItemCart,



} = productVisitorSlice.actions
