import { PayloadAction, createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit'
import api from '../../../api'
import { Product } from './productsSlice'
import { toast } from 'react-toastify'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const response = await api.get('/api/orders')
    return response.data.orders
  } catch (error:any) {
    throw error.response.data.message
  }
})

export const paymentClientToken = createAsyncThunk('orders/paymentClientToken', async () => {
  try {
    const response = await api.get('/api/orders/payment/token')
    return response.data
  } catch (error:any) {
    throw error.response.data.message
  }
})
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id:string) => {
  try {
    await api.delete(`/api/orders/${id}`)
    return id
  } catch (error:any) {
    throw error.response.data.message
  }
})
export const placeOrder = createAsyncThunk('orders/placeOrder', async (data:{}) => {
  try {
    const response = await api.post('/api/orders',data)
    return response.data.orders
  } catch (error:any) {
    throw error.response.data.message
  }
})

export type Order = {
  _id: string
  products: [{product:Product,quantity:number}]
  user: string
  status:string
  createdAt: string
  totalPriceOfOrder:number
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
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload
    
        state.isLoading = false
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const findOrder=state.orders.find((order)=>order._id==action.payload)
        if(findOrder){
          state.orders=state.orders.filter((order)=>order._id!=findOrder._id)
        }
          toast.success('order is deleted', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          });
  

        
    
        state.isLoading = false
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.isLoading = false
        toast.success('done 👌', {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
          });
      })

      .addMatcher(isPending(placeOrder,fetchOrders),
      (state)=>{
        state.isLoading = true
      }
      )
      .addMatcher(isRejected(deleteOrder,placeOrder,fetchOrders),
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

export default orderSlice.reducer
