import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
  rate: number
  cartId: number
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
    const response = await api.get('/mock/e-commerce/products.json')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

const productVisitorSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTirm = action.payload
    },
    sortProduct: (state, action) => {
      const sortingInput = action.payload
      if (sortingInput == 'name') state.items.sort((a, b) => a.name.localeCompare(b.name))
      else if (sortingInput == 'price') state.items.sort((a, b) => b.price - a.price).reverse()
      else state.items
    },

    addItemCart: (state, action) => {
      const id = action.payload
      const itemToCart = state.items.find((product) => product.id === id)

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
    addProduct: (state, action) => {
      const newProduct = action.payload
      if (newProduct) {
        state.items = [...state.items, newProduct]
      }
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((product) => product.id === action.payload.id)

      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    getSingleProduct: (state, action) => {
      const id = action.payload
      const foundProduct = state.items.find((product) => product.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProductItem.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchProductItem.rejected, (state, action) => {
        state.error = action.error.message || 'error to fetch the data'
        state.isLoading = false
      })
  }
})
export default productVisitorSlice.reducer
export const {
  searchProduct,
  sortProduct,
  addItemCart,
  deleteItemCart,
  addProduct,
  removeProduct,
  updateProduct,
  getSingleProduct
} = productVisitorSlice.actions
