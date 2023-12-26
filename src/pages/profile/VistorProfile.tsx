import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Navbar from '../homePage/Navbar'

import { TypeUserLoginData, editUser } from '../../redux/slices/products/usersSlice'
import NavAll from '../homePage/NavAll'
import { SiGamejolt } from 'react-icons/si'

const VistorProfile = () => {
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [enableEdit, setEnableEdit] = useState(false)
  const [userForm, setUserForm] = useState({
    name: userLoginData?.name || '',
  })

  const handleClick = (e: React.FormEvent) => {
    if (enableEdit) {
      e.preventDefault()
      dispatch(editUser({id: String(userLoginData?._id),data:{...userLoginData,name:userForm.name}}))
    } else {
    }
    setEnableEdit(!enableEdit)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserForm({ ...userForm, [name]: value })
  }

  return (
    <div>
      <NavAll />
      <div className="form">
      {enableEdit ? (
        
          <form onSubmit={handleClick}>
          <div>
            <p className="logo">
              GAME
              <SiGamejolt />
              OVER
            </p>
            </div>
            <div>
            <h2>profile</h2>
            </div>
            <div>
            <label htmlFor="firstName">Name:</label>
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleChange}
            />
            <br />
            <p>Email: {userLoginData?.email}</p>
            <button type="submit">Submit</button>
            </div>
          </form>
      
      ) : (
        
          <form action="" >
            <p className="logo">
              GAME
              <SiGamejolt />
              OVER
            </p>
            <h2>profile</h2>
            <p>First Name: {userLoginData?.name}</p>
            <p>User Name : @{userLoginData?.userName}</p>
            <p>Email: {userLoginData?.email}</p>
            <button onClick={handleClick}>Edit</button>
          </form>
          
        
      )}
      </div>
    </div>
  )
}

export default VistorProfile
