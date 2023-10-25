import { configureStore } from '@reduxjs/toolkit'

import productVisitorSlice from './slices/products/productVisitorSlice'
import categorySlice from './slices/products/categorySlice'
import usersSlice from './slices/products/usersSlice'

export const store = configureStore({
  reducer: {
    productsVistorReducer: productVisitorSlice,
    categoryReducer: categorySlice,
    userReducer: usersSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
