import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected
} from '@reduxjs/toolkit'

import api from '../../../api'
import { TypeCategories } from './categorySlice'
import { sort } from 'semver'
import { toast } from 'react-toastify'

export type Product = {
  description: string
  discounts?: never[]
  image?: string
  price: number
  quantity?: number
  shipping?: number
  slug?: string
  sold?: number
  title: string
  categoryId: TypeCategories[] | []
  updatedAt?: string
  _id?: string
  cartId?: number
}

export type ProductState = {
  items: Product[]
  error: string | undefined
  isLoading: boolean
  searchTirm: string
  sortState: string
  cart: Product[]
  singleProduct: Product
  totalPages: number
  currentPage: number
  totalProducts: number
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
  singleProduct: {} as Product,
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0
}
// {limit,page,filter}:{limit:number,page:number,filter:string}

export const fetchProductItem = createAsyncThunk(
  'product/fetchProductItem',
  async (
    data: { page?: number; filter?: string; sortBy?: string; limit?: number; search?: string } = {
      page: 0,
      filter: '',
      sortBy: '',
      limit: 0,
      search: ''
    }
  ) => {
    try {
      let response: any = {}

      if (data.search) {
        response = await api.get(`/api/products?search=${data.search}`)
      } else {
        response = await api.get(
          `/api/products?limit=${data.limit ? data.limit : ''}&page=${
            data.page ? data.page : 1
          }&filter=${data.filter ? data.filter : ''}&sort=${data.sortBy ? data.sortBy : ''}`
        )
      }

      // console.log(response.data.payload.products)

      return response.data.payload
    } catch (error: any) {
      throw error.response.data.message
    }
  }
)
export const searchProduct = createAsyncThunk(
  'product/searchProduct',
  async (search: string = '') => {
    try {
      // const response = await api.get(`/api/products?search${search}`)

      return search
    } catch (error: any) {
      throw error.response.data.message
    }
  }
)
export const fetchSingleProduct = createAsyncThunk(
  'product/singleProducts',
  async (slug: string) => {
    try {
      const response = await api.get(`/api/products/${slug}`)
      console.log(response.data.payload)
      return response.data.payload
    } catch (error: any) {
      throw error.response.data.message
    }
  }
)
export const newProduct = createAsyncThunk('product/newProduct', async (data: object) => {
  try {
    const response = await api.post('/api/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data.payload
  } catch (error: any) {
    throw error.response.data.message
  }
})
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: string) => {
  try {
    const response = await api.delete(`/api/products/${id}`)
    return response.data
  } catch (error: any) {
    throw error.response.data.message
  }
})
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, data }: { id: string; data: Product }) => {
    try {
      const response = await api.put(`/api/products/update-product-info/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data.payload
    } catch (error: any) {
      throw error.response.data.message
    }
  }
)

const productVisitorSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    // searchProduct: (state, action) => {
    //   state.searchTirm = action.payload
    // },
    sortProduct: (state, action) => {
      state.sortState = action.payload
    },
    quantity: (state, action) => {
      const quantityforCart = action.payload

      const findItem = state.items.find((product) => product._id === quantityforCart.id)
      if (findItem) {
        findItem.quantity = quantityforCart.quantity
      }
    },
    quantityForCart: (state, action) => {
      const quantityforCart = action.payload

      const findItem = state.cart.find((product) => product._id === quantityforCart.id)
      if (findItem) {
        findItem.quantity = quantityforCart.quantity
      }
    },

    addItemCart: (state, action) => {
      const id = action.payload
      const itemToCart = state.items.find((product) => product._id === id)

      if (itemToCart) {
        const isInCart = state.cart.find((product) => product._id === itemToCart._id)
        if (isInCart && isInCart.quantity) {
          isInCart.quantity = isInCart.quantity + 1
        } else {
          const newIdForCartItem = { ...itemToCart, cartId: state.cart.length + 1 }
          state.cart = [...state.cart, newIdForCartItem]
          localStorage.setItem('cart', JSON.stringify(state.cart))
        }
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
    clearCart: (state) => {
      state.cart = []
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }

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
      .addCase(fetchProductItem.fulfilled, (state, action) => {
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
        state.totalProducts = action.payload.totalProducts
        state.items = action.payload.products
        state.items.map((item) => (item.quantity = 1))
        console.log(action.payload.products)

        state.isLoading = false
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.searchTirm = action.payload
        state.isLoading = false
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const product = action.payload

        state.singleProduct = product
        state.isLoading = false
      })

      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex((product) => product._id === action.payload._id)

        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.isLoading = false
        toast.success('product is updated', {
          position: 'top-right',
          autoClose: 2000,
          theme: 'dark'
        })
      })
      .addCase(newProduct.fulfilled, (state, action) => {
        const newProduct = action.payload
        if (newProduct) state.items = [...state.items, action.payload]

        state.isLoading = false
        toast.success('product is added', {
          position: 'top-right',
          autoClose: 2000,
          theme: 'dark'
        })
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const filteredItems = state.items.filter((product) => product._id !== action.payload._id)
        state.items = filteredItems
        toast.success('product is deleted', {
          position: 'top-right',
          autoClose: 2000,
          theme: 'dark'
        })
        state.isLoading = false
      })
      .addMatcher(
        isPending(
          deleteProduct,
          newProduct,
          updateProduct,
          fetchSingleProduct,
          searchProduct,
          fetchProductItem
        ),
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        isRejected(
          deleteProduct,
          newProduct,
          updateProduct,
          fetchSingleProduct,
          searchProduct,
          fetchProductItem
        ),
        (state, action) => {
          state.error = action.error.message || 'error to fetch the data'
          state.isLoading = false
          toast.error(state.error, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark'
          })
        }
      )
  }
})
export default productVisitorSlice.reducer
export const { sortProduct, addItemCart, deleteItemCart, quantity, quantityForCart, clearCart } =
  productVisitorSlice.actions
