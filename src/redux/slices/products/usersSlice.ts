import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get('/mock/e-commerce/users.json')
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
})

type UserObject = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

type UsersState = {
  users: UserObject[]
  error: string
  isLoading: boolean
  userLoginData: UserObject | null
  userRole: string
}
const userData =
  localStorage.getItem('userLoginData') !== null
    ? JSON.parse(String(localStorage.getItem('userLoginData')))
    : null

const initialState: UsersState = {
  users: [],
  error: '',
  isLoading: false,
  userLoginData: userData,
  userRole: ''
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userLoginData = action.payload
      state.userRole = action.payload.role
      console.log(state.userRole)
      localStorage.setItem('userLoginData', JSON.stringify(state.userLoginData))
    },
    logoutUser: (state) => {
      state.userLoginData = null
      localStorage.setItem('userLoginData', JSON.stringify(state.userLoginData))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserObject[]>) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || 'error to fetch the data'
        state.isLoading = false
      })
  }
})

export default usersSlice.reducer
export const { loginUser, logoutUser } = usersSlice.actions
