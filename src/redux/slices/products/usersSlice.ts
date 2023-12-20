import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
type UserObject = {
  _id?:string
  image?: string;
  userName: string;
  password: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  isBan?: boolean;
  wishList?: {
  }[];
  orders?: {
  }[];
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
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get('/api/users')
    return response.data.users

  } catch (error) {
    throw error
  }
})
export const reigsterUser = createAsyncThunk('users/reigsterUser', async (data:UserObject) => {
  try {
    const response = await api.post('/api/users',data)
    return response.data

  } catch (error) {
    throw error
  }
})

export const userIsban = createAsyncThunk('users/banUser', async (id:string) => {
  try {
    await api.put(`/api/users/user/ban/${id}`)
    return id

  } catch (error) {
    throw error
  }
})
export const deleteUser = createAsyncThunk('users/deleteUser', async (id:string) => {
  try {
    await api.delete(`/api/users/user/delete/${id}`)
    return id

  } catch (error) {
    throw error
  }
})


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
    // removeUser: (state, action: { payload: { userId: string } }) => {
    //   const filteredUsers = state.users.filter((user) => user._id !== action.payload.userId)
    //   state.users = filteredUsers
    // },
    // updateUserBan: (state, action: PayloadAction<UserObject>) => {
    //   const index = state.users.findIndex((user) => user._id === action.payload._id)

    //   if (index !== -1) {
    //     state.users[index] = { ...action.payload, isBan: !action.payload.isBan }
    //   }
    // },
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
      // const newuser = {
      //   id: state.users[state.users.length - 1]._id+ 1,
      //   ...action.payload,
      //   ban: false,
      //   role: 'visitor'
      // }
      // state.users = [...state.users, newuser]
      // console.log(state.users)
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserObject[]>) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(userIsban.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id == String(action.payload))
        if (index !== -1) {
          state.users[index] = { ...state.users[index], isBan: !state.users[index].isBan }
        }
        state.isLoading = false
      })
      .addCase(reigsterUser.fulfilled, (state, action: PayloadAction<UserObject>) => {

        state.users.push(action.payload)
        state.isLoading = false
      })
      .addCase(deleteUser.fulfilled, (state, action) => {

        const filteredUsers = state.users.filter((user) => user._id !== action.payload)
        state.users = filteredUsers
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

export default usersSlice.reducer
export const { loginUser, logoutUser, editProfile, register } =
  usersSlice.actions
