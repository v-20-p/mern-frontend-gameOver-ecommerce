import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import { toast } from 'react-toastify';
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
  name:string
  _id?: number | undefined
  email?: string | undefined
  isAdmin?: boolean | undefined
  isBan?: boolean | undefined
  userName?:boolean | undefined
}

type UsersState = {
  users: UserObject[]
  error: string
  isLoading: boolean
  userLoginData: TypeUserLoginData | undefined | null
  isAdmin: boolean
}
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get('/api/users')
    return response.data.users

  } catch (error:any) {
    throw error.response.data.message
  }
})
export const reigsterUser = createAsyncThunk('users/reigsterUser', async (data:UserObject) => {
  try {
    const response = await api.post('/api/users',data)
    return response.data

  } catch (error:any) {
    throw error.response.data.message
  }
})

export const userIsban = createAsyncThunk('users/banUser', async (id:string) => {
  try {
    await api.put(`/api/users/user/ban/${id}`)
    return id

  } catch (error:any) {
    throw error.response.data.message
  }
})
export const editUser = createAsyncThunk('users/edituser', async ({id,data}:{id:string,data:object}) => {
  try {
    const response =  await api.put(`/api/users/${id}`,data)
   
    return response.data.user

  } catch (error:any) {
    throw error.response.data.message
  }
})
export const deleteUser = createAsyncThunk('users/deleteUser', async (id:string) => {
  try {
    await api.delete(`/api/users/user/delete/${id}`)
    return id

  } catch (error:any) {
    throw error.response.data.message
  }
})
export const forgetPassword = createAsyncThunk('users/forgetPassword', async (email:string) => {
  try {
    await api.post(`/api/users/user/forget-password`,{email:email})
    return email

  } catch (error:any) {
    throw error.response.data.message
  }
})


export const resetpasswordUser = createAsyncThunk('users/forgetPassword', async (data:object) => {
  try {
    const response = await api.put(`/api/users/user/reset-password`,data)
    return response.data

  } catch (error) {
    throw 'you don\'t have acsess '
  }
})
export const login = createAsyncThunk('users/login', async ({email,password}:{email:string,password:string}) => {
  try {
    const credentials={email,password}
    const response = await api.post('/api/users/login',credentials)

    return response.data.user

  } catch (error) {
    throw 'Email or Password is incorrect'
  }
})
export const logout = createAsyncThunk('users/logout', async () => {
  try {
    
    const response = await api.post('/api/users/logout')
    return response.data.users

  } catch (error) {
    throw 'you not login'
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
  isAdmin: false
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearErrorUser: (state) => {
      state.error=''
    },
    // logoutUser: (state) => {
    //   state.userLoginData = null
    //   localStorage.setItem('userLoginData', JSON.stringify(state.userLoginData))
    // },
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
    // editProfile: (state, action) => {
    //   const user = action.payload
    //   state.userLoginData = {
    //     ...state.userLoginData,
    //     name: user.name,
    //   }
    //   localStorage.setItem('userLoginData', JSON.stringify(state.userLoginData))
    // },
    // register: (state, action) => {
      // const newuser = {
      //   id: state.users[state.users.length - 1]._id+ 1,
      //   ...action.payload,
      //   ban: false,
      //   role: 'visitor'
      // }
      // state.users = [...state.users, newuser]
      // console.log(state.users)
    // }
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
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<UserObject>) => {
        const user = action.payload
        
        state.userLoginData = {
          ...state.userLoginData,
          name: user.name,
        }
        localStorage.setItem('userLoginData', JSON.stringify(state.userLoginData))
        state.isLoading = false
      })
      .addCase(deleteUser.fulfilled, (state, action) => {

        const filteredUsers = state.users.filter((user) => user._id !== action.payload)
        state.users = filteredUsers
        state.isLoading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userLoginData = action.payload
        state.isAdmin = action.payload.isAdmin
        console.log(state.isAdmin)
        localStorage.setItem('userLoginData', JSON.stringify(state.userLoginData))
        setTimeout(() => {
          state.userLoginData = null;
          localStorage.removeItem('userLoginData');
        }, 15 * 60 * 1000);

        state.isLoading = false
      })
      .addCase(logout.fulfilled, (state, action) => {
      state.userLoginData = null
      localStorage.setItem('userLoginData', JSON.stringify(state.userLoginData))
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

export default usersSlice.reducer
export const { clearErrorUser  } =
  usersSlice.actions
