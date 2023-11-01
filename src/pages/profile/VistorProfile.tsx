import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Navbar from '../homePage/Navbar'

import { TypeUserLoginData, editProfile } from '../../redux/slices/products/usersSlice'
import NavAll from '../homePage/NavAll'
import { SiGamejolt } from 'react-icons/si'

const VistorProfile = () => {
  const { userLoginData } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [enableEdit, setEnableEdit] = useState(false)
  const [userForm, setUserForm] = useState({
    firstName: userLoginData?.firstName || '',
    lastName: userLoginData?.lastName || ''
  })

  const handleClick = (e: React.FormEvent) => {
    if (enableEdit) {
      e.preventDefault()
      dispatch(editProfile(userForm))
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

      {enableEdit ? (
        <div className="form">
          <form onSubmit={handleClick}>
            <p className="logo">
              GAME
              <SiGamejolt />
              OVER
            </p>
            <h2>profile</h2>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={userForm.firstName}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" name="lastName" value={userForm.lastName} onChange={handleChange} />
            <p>Email: {userLoginData?.email}</p>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="form">
          <form action="">
            <p className="logo">
              GAME
              <SiGamejolt />
              OVER
            </p>
            <h2>profile</h2>
            <p>First Name: {userLoginData?.firstName}</p>
            <p>Last Name: {userLoginData?.lastName}</p>
            <p>Email: {userLoginData?.email}</p>
            <button onClick={handleClick}>Edit</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default VistorProfile
