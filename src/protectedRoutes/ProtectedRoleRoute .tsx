import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

import { RootState } from '../redux/store'

import Home from '../pages/homePage/Home'
import Login from '../pages/registrationPages/Login'

const ProtectedRoleRoute = () => {
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)
  const location = useLocation()

  return userLoginData && userLoginData!.role == 'admin' ? <Outlet /> : <Login pathName={location.pathname} />
}

export default ProtectedRoleRoute
