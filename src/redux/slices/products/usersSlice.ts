import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get('/mock/e-commerce/users.json')
    return response.data.map((user: UserObject) => ({ ...user, ban: false }))
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
  ban: boolean
}
export type TypeUserLoginData = {
  firstName?: string
  lastName?: string
  id?: number | undefined
  email?: string | undefined
  password?: string | undefined
  role?: string | undefined
  ban?: boolean | undefined
}

type UsersState = {
  users: UserObject[]
  error: string
  isLoading: boolean
  userLoginData: TypeUserLoginData | undefined | null
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
    },
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredUsers = state.users.filter((user) => user.id !== action.payload.userId)
      state.users = filteredUsers
    },
    updateUserBan: (state, action: PayloadAction<UserObject>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id)

      if (index !== -1) {
        state.users[index] = { ...action.payload, ban: !action.payload.ban }
      }
    },
    editProfile: (state, action) => {
      const user = action.payload
      state.userLoginData = {
        ...state.userLoginData,
        firstName: user.firstName,
        lastName: user.lastName
      }
      localStorage.setItem('userLoginData', JSON.stringify(state.userLoginData))
    },
    register: (state, action) => {
      const newuser = {
        id: state.users[state.users.length - 1].id + 1,
        ...action.payload,
        ban: false,
        role: 'visitor'
      }
      state.users = [...state.users, newuser]
      console.log(state.users)
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
export const { loginUser, logoutUser, removeUser, updateUserBan, editProfile, register } =
  usersSlice.actions
