import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

import { Outlet } from 'react-router-dom'

import Login from '../pages/registrationPages/Login'

const ProtectedLoginRoute = () => {
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)
  return userLoginData ? <Outlet /> : <Login />
}

export default ProtectedLoginRoute
