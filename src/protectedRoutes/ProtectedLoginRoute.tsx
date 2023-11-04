import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

import { Outlet, useLocation } from 'react-router-dom'

import Login from '../pages/registrationPages/Login'

const ProtectedLoginRoute = () => {
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)
  const location = useLocation()
  return userLoginData ? <Outlet /> : <Login pathName={location.pathname} />
}

export default ProtectedLoginRoute
