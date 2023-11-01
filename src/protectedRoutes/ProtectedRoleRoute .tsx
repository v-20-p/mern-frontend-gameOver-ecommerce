import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { RootState } from '../redux/store'

import Home from '../pages/homePage/Home'

const ProtectedRoleRoute = () => {
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)

  return userLoginData && userLoginData!.role == 'admin' ? <Outlet /> : <Home />
}

export default ProtectedRoleRoute
