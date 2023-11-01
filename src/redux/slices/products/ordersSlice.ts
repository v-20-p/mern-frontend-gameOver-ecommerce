import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const response = await api.get('/mock/e-commerce/orders.json')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrdersState = {
  orders: Order[]
  error: string | undefined
  isLoading: boolean
}

const initialState: OrdersState = {
  orders: [],
  error: '',
  isLoading: false
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload
        state.isLoading = false
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message || 'error to fetch the data'
        state.isLoading = false
      })
  }
})

export default orderSlice.reducer
